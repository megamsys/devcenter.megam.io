---
title: Hetzner networking in ubuntu opennebula host
layout: post
# Author.
author: vijaykanth
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Hetzner networking in ubuntu opennebula host
---
Our need is to setup `opennebula` in `hetzner`, so we have two servers, one is for opennebula-frontend and another one is for opennebula-host. We don't face any problem in opennebula front-end.

But in opennebula-host server, we face some `networking problems`.

We have a local working server for opennbula-host with `openvswitch`. But in hetzner openvswitch makes some problem.

After trying many configuration, we succeed with the following configurations,

OS : Ubuntu-14.04(trusty)

`NOTE`
Actually we have public ips, but for security issues i documented local ips

    Host ip : 192.168.1.100

For vms, i got subnet ips

	Subnet: 192.168.2.96/27
    Useable ips : 192.168.2.97 to 192.168.2.126

`NOTE` Create bridge (one) after adding the below configuration in the interface file

My Host server network configuration

	# cat /etc/network/interfaces
	### Hetzner Online GmbH - installimage
	# Loopback device:
	auto lo
	iface lo inet loopback

	# device: eth0
	auto  eth0
	iface eth0 inet static
	  address   192.168.1.100
	  netmask   255.255.255.224
	  gateway   192.168.1.1
	  up route add -net 192.168.1.0 netmask 255.255.255.224 gw 192.168.1.1 eth0

	iface eth0 inet6 static
	  address 2xxx:xx:xxx:xxxx::x
	  netmask 64
	  gateway fe80::1

	auto one
	iface one inet static
	  address   192.168.1.100
	  netmask   255.255.255.224
	  bridge_ports none
	  bridge_stp off
	  bridge_fd 1
	  bridge_hello 2
	  bridge_maxage 12

	  #subnet
	  up ip route add 192.168.2.96/27 dev one
	  up ip route add 192.168.2.97/27 dev one
	  up ip route add 192.168.2.98/27 dev one
	  up ip route add 192.168.2.99/27 dev one
	  up ip route add 192.168.2.100/27 dev one
	  up ip route add 192.168.2.101/27 dev one
	  up ip route add 192.168.2.102/27 dev one
	  up ip route add 192.168.2.103/27 dev one
	  up ip route add 192.168.2.104/27 dev one

Routing table for host server

	root@ec2 ~ # route
	Kernel IP routing table
	Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
	default         static.1.1.168. 0.0.0.0         UG    0      0        0 eth0
	192.168.1.0     static.1.1.168. 255.255.255.224 UG    0      0        0 eth0
	192.168.1.0     *               255.255.255.224 U     0      0        0 eth0
	192.168.1.0     *               255.255.255.224 U     0      0        0 one
	192.168.2.96  *               255.255.255.224 U     0      0        0 one

IP routes

	root@ec2 ~ # ip route show
	default via 192.168.1.1 dev eth0
	192.168.1.0/27 via 144.xx.xx.1 dev eth0
	192.168.1.0/27 dev eth0  proto kernel  scope link  src 192.168.1.100
	192.168.1.0/27 dev one  proto kernel  scope link  src 192.168.1.100
	192.168.2.96/27 dev one  scope link


open /etc/sysctl.conf and uncomment these lines

	net.ipv4.conf.all.rp_filter=1
    net.ipv4.ip_forward=1
    net.ipv6.conf.all.forwarding=1


Delete default bridge virbr0

	$ virsh net-destroy default
	$ virsh net-undefine default
	$ service libvirtd restart

First we tried openvswitch, then we remove all ports & bridges from openvswitch

	root@ec2 ~ # ovs-vsctl show
	835b086b-286b-448c-83f4-1d7526a9954e
	    ovs_version: "2.0.2"

 Then we tried normal linux-bridge. After launching vm, our linux bridge status

 	root@ec2 ~ # brctl show
	bridge name	bridge id		STP enabled	interfaces
	one		8000.fe0094fbd663	no		vnet0

    root@ec2 ~ # ifconfig
	eth0      Link encap:Ethernet  HWaddr 8c:89:a5:15:6f:e4  
          inet addr:192.168.1.100  Bcast:192.168.1.31  Mask:255.255.255.224
          inet6 addr: 2xxx:xx:xxx:xxxx::x/64 Scope:Global
          inet6 addr: xxxx::xxxx:xxxx:xxxx:xxxx/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:10285 errors:0 dropped:0 overruns:0 frame:0
          TX packets:11418 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:2408774 (2.4 MB)  TX bytes:3191410 (3.1 MB)

	lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:588417 errors:0 dropped:0 overruns:0 frame:0
          TX packets:588417 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:1387023327 (1.3 GB)  TX bytes:1387023327 (1.3 GB)

	one      Link encap:Ethernet  HWaddr 8c:89:a5:15:6f:e4  
          inet addr:192.168.1.100  Bcast:192.168.1.31  Mask:255.255.255.224
          inet6 addr: 2xxx:xx:xxx:xxxx::x/64 Scope:Global
          inet6 addr: xxxx::xxxx:xxxx:xxxx:xxxx/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:2098 errors:0 dropped:0 overruns:0 frame:0
          TX packets:983 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:167718 (167.7 KB)  TX bytes:44679 (44.6 KB)

	vnet0     Link encap:Ethernet  HWaddr fe:00:94:fb:d6:63  
          inet6 addr: xxxx::xxxx:xxxx:xxxx:xxx/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:2098 errors:0 dropped:0 overruns:0 frame:0
          TX packets:749 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:500
          RX bytes:197090 (197.0 KB)  TX bytes:34851 (34.8 KB)



Thats it for opennebula host server's network configuration.

Now launch a vm from opennebula

###### VM's network configuration for Ubuntu

	root@vm1:~# cat /etc/network/interfaces
	auto lo
	iface lo inet loopback

	auto eth0
	iface eth0 inet static
	  address 192.168.2.97
	  network 192.168.2.0
	  netmask 255.255.255.224
	  gateway 192.168.1.100
	  pointopoint 192.168.1.100


Vm's routing table

	root@vm1:~# route
	Kernel IP routing table
	Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
	default         100.1.168.192.in 0.0.0.0         UG    0      0        0 eth0
	100.1.168.192.in *               255.255.255.255 UH    0      0        0 eth0


ip route

	root@vm1:~# ip route show
	default via 192.168.1.100 dev eth0
	192.168.1.100 dev eth0  proto kernel  scope link  src 192.168.2.97

Now i can connect with my vm from anywhere.


###### VM's network configuration for CoreOS

Virutal Machine OS : CoreOS-835.13.0

VM's network configuration

	root@vm1:~# cat  /etc/systemd/network/static.network
	[Match]
	Name=ens3

	[Network]
	Address=192.168.3.99/27
	Gateway=192.168.1.100
	DNS=8.8.8.8
	DNS=8.8.4.4

	[Address]
	Address=192.168.2.99/27
	Peer=192.168.1.100

Vm's routing table

	root@vm1:~# route
	Kernel IP routing table
	Destination     Gateway         Genmask         Flags 	Metric Ref    Use Iface
	default         192.168.1.100  0.0.0.0         UG    0      0        0 ens3
	192.168.1.100  *        255.255.255.255 UH    0      0        0 ens3
	192.168.2.0    *         255.255.255.224 U     0      0        0 ens3
	172.17.0.0     *         255.255.0.0     U     0      0        0 docker0

	root@vm1:~# ip route show
	default via 192.168.1.100 dev ens3
	192.168.1.100 dev ens3  scope link
	192.168.2.0/27 dev ens3  proto kernel  scope link  src 192.168.2.99
	172.17.0.0/16 dev docker0  proto kernel  scope link  src 172.17.0.1
