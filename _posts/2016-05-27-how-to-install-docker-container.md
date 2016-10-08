---
title: How to setup docker container using vertice
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: How to setup docker container using vertice
---

#### Introduction

  Docker containers wrap up a piece of software in a complete filesystem that contains everything it needs to run: code, runtime, system tools, system libraries – anything you can install on a server. This guarantees that it will always run the same, regardless of the environment it is running in.

This tutorial we will need to setup the docker container.  

#### Prerequisites


* You require atleast one swarm master and lots of node(s).

* The nodes must have our package verticedocker installed with linux configured.

* The linux bridge needs to configured in each of the hosts

#### Swarm Install

   Now, on your master which is soon going to be swarm master, install megamswarm


    apt-add-repository "deb [arch=amd64  http://get.megam.io/1.0/ubuntu/14.04/ trusty testing"

    apt-key adv --keyserver keyserver.ubuntu.com --recv B3E0C1B7

    apt-get update

    apt-get install megamswarm

    start megamswarm


#### Install dockercontainer in node

     echo 'deb https://apt.dockerproject.org/repo ubuntu-trusty main' >/etc/apt/sources.list.d/docker.list

      apt-get install apt-transport-https ca-certificates

      apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

      apt-get install linux-image-generic-lts-trusty

      apt-get update

      apt-get install docker-engine

      apt-get install verticecommon verticegulpd verticedocker

edit your /usr/share/megam/verticegulpd/conf/gulpd.conf

     ### Welcome to the Gulpd configuration file.
     ###
     ### [meta]
     ###
     ### Controls the parameters for the Raft consensus group that stores metadata
     ### about the gulp.
     ###
     [meta]
     user = "root"
    nsqd = ["xxx.xxx.xxx.xxx:4150"]
    scylla = ["xxx.xxx.xxx.xxx"]
    scylla_keyspace = "vertice"
    ###
    ### [gulpd]
    ###
    ### Controls which assembly to be deployed into machine
    ###
    [gulpd]
    enabled = false
    name = "disliked.megambox.com"
    assembly_id = "ASM2593607080"
    assemblies_id = "AMS253064546"
    provider = "chefsolo"
  	cookbook = "apt"
  	chefrepo = "https://github.com/megamsys/chef-repo.git"
    chefrepo_tarball = "https://github.com/megamsys/chef-repo/archive/0.94.tar.gz"
    ###
    ### [http]
    ###
    ### Controls how the HTTP endpoints are configured. This a frill
    ### mechanism for pinging gulpd (ping)
    ###
    [http]
    enabled = true
    bind_address = "nodeip:6666"

  start your node verticegulpd

      start verticegulpd

#### Create Bridge  

  To install bridge on your node

       apt-get install bridge-utils

   Edit your /etc/network/interface file

       auto megdock
       iface megdock inet static
       address   xxx.xxx.xxx.xxx
       netmask   yyy.yyy.yyy.yyy
       bridge_ports none
       bridge_stp off
       bridge_fd 1
       bridge_hello 2
       bridge_maxage 12
       up ip route add zzz.zzz.zzz.zzz/27 dev megdock



  Then create megdock bridge  

     brctl add-br megdock


  check if a linux bridge by name megdock exists

    brctl show


 start your docker daemon

    docker daemon -D -H tcp://nodeip:2375
#### To join the nodes to the swarm master

 We need a token to join the nodes to the swarm master.
 You should find this line following the command

     ps -ef | grep swarm

     root     129993 129353  0 11:07 pts/0    00:00:01 swarm join --addr=xxx.xxx.xxx.xxx:2375 token://54c729c18d379721c9483c07e071b7e9

Copy the token to join nodes to swarm master and paste the token. Then execute the below command on the master to join node to master

    swarm join --addr=<node_ip>:2375 token://54c729c18d379721c9483c07e071b7e9

Hopefully you have configured our engine vertice engine, if not this is needed for the launch

    nano /usr/share/megam/megamd/megamd.conf
    swarm:
       host: http://<swarm_master_ip>:2375

 Voila! Go ahead and launch multiple docker containers through  vertice.

#### Conclusion

  Finally  swarm and dockernode installed setup on your host by docker container using vertice and successfully launched the docker container
