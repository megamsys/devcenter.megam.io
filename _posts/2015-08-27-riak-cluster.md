---
title: Clustering Riak
layout: post
author: "vijayakanth"
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Clustering Riak
---


 Riak is a distributed NoSQL key-value data store that offers extremely high availability, fault tolerance, operational simplicity and scalability.[2] In addition to the open-source version, it comes in a supported enterprise version and a cloud storage version that is ideal for cloud computing environments.

 Written in Erlang, Riak has fault tolerance data replication and automatic data distribution across the cluster for performance and resilience

 Riak has a pluggable backend for its core storage, with the default storage backend being Bitcask.[7] LevelDB is also supported.

 **System Setup**

    	OS : Ubuntu 14.04.2 LTS
        Riak : Riak 2.1.1  
Riak cluster needs atleast two servers. My servers are

	riak1's ip address is 192.168.1.11
    riak2's ip address is 192.168.1.12

`Do the installation(install riak step) in all the servers`

###### Install Riak :
Riak installation in pretty easy. Just wget the debian package from site and dpkg it.

    $ wget http://s3.amazonaws.com/downloads.basho.com/riak/2.1/2.1.1/ubuntu/trusty/riak_2.1.1-1_amd64.deb
    $ sudo dpkg -i riak_2.1.1-1_amd64.deb

After installing riak, we need to start it manually. Before starting riak, let's change the riak configuration.

riak's configuraton file is at `/etc/riak/riak.conf`

change the nodename of riak first,
	default

    	nodename = riak@LOCALHOST_IP

  Change it as

  		nodename = riak@SYSTEM_IP_ADDRESS

  Command to do this change

    	$ sudo sed -i 's/^[ \t]*nodename = riak.*/nodename = riak@SYSTEM_IP_ADDRESS/' /etc/riak/riak.conf

  Where $SYSTEM_IP_ADDRESS is YOUR_LOCAL_SYSTEM_IP

  In the same way change the http.listner and protobuf.listner ip

  	$ sudo sed -i 's/^[ \t]*listener.http.internal =.*/listener.http.internal = SYSTEM_IP_ADDRESS:8098/' /etc/riak/riak.conf
  	$ sudo sed -i 's/^[ \t]*listener.protobuf.internal =.*/listener.protobuf.internal = SYSTEM_IP_ADDRESS:8087/' /etc/riak/riak.conf


Start riak in all the servers

    $ sudo riak start

Now you have running riak in all the servers. In my case,

	riak@RIAK1_IP_ADDRESS
    riak@RIAK2_IP_ADDRESS
Both are running without any problem

###### Make Cluster

Now it is time to make cluster

From riak@RIAK1_IP_ADDRESS server, run this commands

	$ sudo riak-admin cluster join riak@RIAK2_IP_ADDRESS
    $ sudo riak-admin cluster plan
	$ sudo riak-admin cluster commit

That's it. Servers are clustered. You can check cluster status

	$ sudo riak-admin cluster status


  The result should be like

	  ---- Cluster Status ----
	Ring ready: true

	+------------------------+------+-------+-----+-------+
	|          node          |status| avail |ring |pending|
	+------------------------+------+-------+-----+-------+
	|     riak@RIAK1_IP_ADDRESS |valid |  up   | 50.0|  --   |
	| (C) riak@RIAK2_IP_ADDRESS |valid |  up   | 50.0|  --   |
	+------------------------+------+-------+-----+-------+

	Key: (C) = Claimant; availability marked with '!' is unexpected
