---
title: Packet.net networking for opennebula host
layout: post
author: "thomas"
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Packet.net networking for opennebula host
---

Our need is to setup `opennebula in packet.net`, so we have a server for both opennebula-frontend and opennebula-host.

<a href="https://docs.megam.io/installation/prequisites/" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png" alt="wordpres button" /></a>

We have a local working server for opennbula-host with openvswitch. But in packet.net we tried normal linux bridge(brctl) and we face some problem in creating virtual machines, because of networking.

	OS 			       : Ubuntu-14.04(trusty)
	Host IP 	     : 192.168.1.100
	Additional IPs : 192.168.2.96/29

NOTE: Actually we have public ips, but for security issues i documented with local ips.
Usually, when we create a server in packet.net, they will give you a single IP, then we need to request them for additional IPs.

After trying many configuration, we succeed with the following configurations,

NOTE: Use `chattr -i /etc/network/interfaces` to make the file writable.

My Host server network configuration

	#cat /etc/network/interfaces
	auto lo
	iface lo inet loopback

	auto bond0
	iface bond0 inet static
	   address 192.168.1.100
	   netmask 255.255.255.254
	   bond-slaves eth1 eth0
	   gateway 192.168.1.99
	   bond-lacp-rate 1
	   bond-xmit_hash_policy layer3+4
	   bond-downdelay 200
	   bond-updelay 200
	   bond-miimon 100
	   bond-mode 4
	iface bond0 inet6 static
	   address 2604:xxxx:x:xxxx::x
	   netmask 127
	   gateway 2604:xxxx:x:xxxx::
	auto bond0:0
	iface bond0:0 inet static
	   address 10.99.18.1
	   netmask 255.255.255.254
	auto eth1
	iface eth1 inet manual
	   pre-up sleep 4
	   bond-master bond0
		auto eth0
	iface eth0 inet manual
	   bond-master bond0
	   post-up route add -net 10.0.0.0/8 gw 10.99.18.0
	   post-down route del -net 10.0.0.0/8 gw 10.99.18.0

	auto br0
	iface br0 inet static
	  address 192.168.2.97
	  netmask 255.255.255.248
	  bridge_ports none
	  bridge_stp off
	  bridge_fd 1
	  bridge_hello 2
	  bridge_maxage 12

Routing table for host server

	root@5:~# route
	Kernel IP routing table
	Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
	default         192.168.1.99    0.0.0.0         UG    0      0        0 bond0
	10.0.0.0        10.99.18.0      255.0.0.0       UG    0      0        0 bond0
	10.99.18.0      *               255.255.255.254 U     0      0        0 bond0
	192.168.1.99    *               255.255.255.254 U     0      0        0 bond0
	192.168.2.96    *               255.255.255.248 U     0      0        0 br0


IP routes

	root@5:~# ip route show
	default via 192.168.1.99 dev bond0
	10.0.0.0/8 via 10.99.18.0 dev bond0
	10.99.18.0/31 dev bond0  proto kernel  scope link  src 10.99.18.1
	192.168.1.99/31 dev bond0  proto kernel  scope link  src 192.168.1.100
	192.168.2.96/29 dev br0  proto kernel  scope link  src 192.168.2.97


open /etc/sysctl.conf and uncomment these lines

	net.ipv4.conf.all.rp_filter=1
	net.ipv4.ip_forward=1
	net.ipv6.conf.all.forwarding=1

Delete default bridge virbr0

	$ virsh net-destroy default
	$ virsh net-undefine default
	$ service libvirtd restart

After launching vm, our linux bridge status

	root@5:~# brctl show
	bridge name	bridge id		STP enabled	interfaces
	br0		8000.fe00934bc462	no		vnet0

Host network

	root@5:~# ifconfig
	bond0     Link encap:Ethernet  HWaddr e4:1d:2d:54:24:78  
	          inet addr:192.168.1.100  Bcast:255.255.255.255  Mask:255.255.255.254
	          inet6 addr: xxxx:xxxx:x:xxxx::x/127 Scope:Global
	          inet6 addr: fe80::e61d:2dff:fe54:2478/64 Scope:Link
	          UP BROADCAST RUNNING MASTER MULTICAST  MTU:1500  Metric:1
	          RX packets:844156 errors:0 dropped:2 overruns:0 frame:0
	          TX packets:798032 errors:0 dropped:7 overruns:0 carrier:0
	          collisions:0 txqueuelen:0
	          RX bytes:106510529 (106.5 MB)  TX bytes:105652129 (105.6 MB)

	bond0:0   Link encap:Ethernet  HWaddr e4:1d:2d:54:24:78  
	          inet addr:10.99.18.1  Bcast:255.255.255.255  Mask:255.255.255.254
        	  UP BROADCAST RUNNING MASTER MULTICAST  MTU:1500  Metric:1

	br0       Link encap:Ethernet  HWaddr fe:00:93:4b:c4:62  
	          inet addr:192.168.2.97  Bcast:192.168.2.103  Mask:255.255.255.248
	          inet6 addr: xxxx::xxxx:xxxx:xxxx:xxxx/64 Scope:Link
	          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
	          RX packets:18701 errors:0 dropped:0 overruns:0 frame:0
	          TX packets:23053 errors:0 dropped:0 overruns:0 carrier:0
	          collisions:0 txqueuelen:0
	          RX bytes:2995153 (2.9 MB)  TX bytes:7377649 (7.3 MB)

	eth0      Link encap:Ethernet  HWaddr e4:1d:2d:54:24:78  
	          UP BROADCAST RUNNING SLAVE MULTICAST  MTU:1500  Metric:1
	          RX packets:395599 errors:0 dropped:1 overruns:0 frame:0
	          TX packets:393086 errors:0 dropped:0 overruns:0 carrier:0
	          collisions:0 txqueuelen:1000
	          RX bytes:50710378 (50.7 MB)  TX bytes:52152210 (52.1 MB)

	eth1      Link encap:Ethernet  HWaddr e4:1d:2d:54:24:78  
	          inet6 addr: xxxx::xxxx:xxxx:xxxx:xxxx/64 Scope:Link
	          UP BROADCAST RUNNING SLAVE MULTICAST  MTU:1500  Metric:1
	          RX packets:448557 errors:0 dropped:1 overruns:0 frame:0
	          TX packets:404946 errors:0 dropped:0 overruns:0 carrier:0
	          collisions:0 txqueuelen:1000
	          RX bytes:55800151 (55.8 MB)  TX bytes:53499919 (53.4 MB)

	lo        Link encap:Local Loopback  
	          inet addr:127.0.0.1  Mask:255.0.0.0
	          inet6 addr: ::1/128 Scope:Host
	          UP LOOPBACK RUNNING  MTU:65536  Metric:1
	          RX packets:7881551 errors:0 dropped:0 overruns:0 frame:0
	          TX packets:7881551 errors:0 dropped:0 overruns:0 carrier:0
	          collisions:0 txqueuelen:0
	          RX bytes:8125571309 (8.1 GB)  TX bytes:8125571309 (8.1 GB)

	vnet0     Link encap:Ethernet  HWaddr fe:00:93:4b:c4:62  
	          inet6 addr: xxxx::xxxx:xxxx:xxxx:xxxx/64 Scope:Link
	          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          	  RX packets:18428 errors:0 dropped:0 overruns:0 frame:0
	          TX packets:21459 errors:0 dropped:0 overruns:0 carrier:0
          	  collisions:0 txqueuelen:500
	          RX bytes:3225260 (3.2 MB)  TX bytes:7307291 (7.3 MB)

Thats it for opennebula host server's network configuration.

Now launch a vm from opennebula

VM's network configuration

	root@t2:~# cat /etc/network/interfaces
	auto lo
	iface lo inet loopback

	auto eth0
	iface eth0 inet static
	  address 192.168.2.98
	  network 192.168.2.96
	  netmask 255.255.255.248
	  gateway 192.168.2.97

VM's routing table

	root@t2:~# route
	Kernel IP routing table
	Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
	default         192.168.2.97   0.0.0.0         UG    0      0        0 eth0
	192.168.2.96   *               255.255.255.248 U     0      0        0 eth0

ip route

	root@t2:~# ip route show
	default via 192.168.2.97 dev eth0
	192.168.2.96/29 dev eth0  proto kernel  scope link  src 192.168.2.98

Now i can connect with my vm from anywhere.
