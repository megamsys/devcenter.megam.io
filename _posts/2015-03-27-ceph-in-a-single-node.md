---
title: Ceph in a single node cluster
slug: ceph-in-a-single-node
date_published: 2015-03-27T14:29:26.544Z
date_updated:   2015-03-27T14:29:26.535Z
tags: ceph
---

[Ceph](http://ceph.com) is one of the most interesting distributed storage systems available, with a very active development and a complete set of features that make it a valuable candidate for cloud storage services

######Assumptions

    Ceph version: 0.87
    Installation with ceph-deploy
    Operating system for the Ceph nodes: Ubuntu 14.04

     
######Preparing the storage

`WARNING`: preparing the storage for Ceph means to delete a disk’s partition table and lose all its data. Proceed only if you know exactly what you are doing!

Ceph will need some physical storage to be used as Object Storage Devices (OSD) and Journal. Ceph supports ext4, btrfs and xfs. I tried setting up clusters with ext4.

I have three storage partitions as

	$ df -h
	/dev/sdb1       115G   /storage1
	/dev/sdb2       115G   /storage2
	/dev/sda3       115G   /storage3


######Install Ceph 

The ceph-deploy tool must only be installed on the admin node. Access to the other nodes for configuration purposes will be handled by ceph-deploy over SSH (with keys).

Add Ceph repository to your apt configuration

	echo deb http://ceph.com/debian-giant/ $(lsb_release -sc) main | sudo tee /etc/apt/sources.list.d/ceph.list
    
Install the trusted key with

	wget -q -O- 'https://ceph.com/git/?p=ceph.git;a=blob_plain;f=keys/release.asc' | sudo apt-key add -
    
Install ceph-deploy 

	sudo apt-get -y update
	sudo apt-get -y install ceph-deploy ceph-common ceph-mds

######Setup the admin node

Each Ceph node will be setup with an user having passwordless sudo permissions and each node will store the public key of the admin node to allow for passwordless SSH access. With this configuration, ceph-deploy will be able to install and configure every node of the cluster.

`NOTE`: the hostnames (i.e., the output of hostname -s) must match the Ceph node names!

Add a ceph user on each Ceph cluster node (even if a cluster node is also an admin node) and give it passwordless sudo permissions

	$ sudo useradd -d /home/ceph -m ceph -s /bin/bash
	$ sudo passwd ceph
	<Enter password>
	$ echo "ceph ALL = (root) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/ceph
	$ sudo chmod 0440 /etc/sudoers.d/ceph
    
Edit the /etc/hosts file to add mappings to the cluster nodes. Example:

	$ cat /etc/hosts
	127.0.0.1       localhost
    192.168.1.100 cephserver

to enable dns resolution with the hosts file, install dnsmasq

	$ sudo apt-get install dnsmasq

Generate a public key for the admin user and install it on every ceph nodes

	$ ssh-keygen
    

Setup an SSH access configuration by editing the .ssh/config file. Example:

	Host cephserver
	  Hostname cephserver
      User ceph


######Setup the cluster

Administration of the cluster is done entirely from the admin node.

step1: Move to a dedicated directory to collect the files that ceph-deploy will generate. This will be the working directory for any further use of ceph-deploy

    $ mkdir ceph-cluster
    $ cd ceph-cluster

step2: Deploy the monitor node(s) – replace mon0 with the list of hostnames of the initial monitor nodes

    $ ceph-deploy new cephmaster
    [ceph_deploy.cli][INFO  ] Invoked (1.4.0): /usr/bin/ceph-deploy new cephmaster
    [ceph_deploy.new][DEBUG ] Creating new cluster named ceph
    [ceph_deploy.new][DEBUG ] Resolving host cephmaster
    [ceph_deploy.new][DEBUG ] Monitor cephmaster at 192.168.1.100
    [ceph_deploy.new][INFO  ] making sure passwordless SSH succeeds
    [ceph_deploy.new][DEBUG ] Monitor initial members are ['cephmaster']
    [ceph_deploy.new][DEBUG ] Monitor addrs are ['192.168.1.100']
    [ceph_deploy.new][DEBUG ] Creating a random mon key...
    [ceph_deploy.new][DEBUG ] Writing initial config to ceph.conf...
    [ceph_deploy.new][DEBUG ] Writing monitor keyring to ceph.mon.keyring...



`Tip` Assuming only one node for your Ceph Storage Cluster, you will need to modify the default osd crush chooseleaf type setting (it defaults to 1 for node) to 0 for device so that it will peer with OSDs on the local node. Add the following line to your Ceph configuration file:

	osd crush chooseleaf type = 0

`Tip`	If you deploy without executing foregoing step on a single node cluster, your Ceph Storage Cluster will not achieve an active + clean state. To remedy this situation, you must modify your CRUSH Map.


step3: Install ceph in the node

	$ ceph-deploy install  cephmaster

atep4: Create monitor and gather keys

	$ ceph-deploy mon create-initial

`Note` The content of the working directory after this step should look like

	cadm@mon0:~/my-cluster$ ls
	ceph.bootstrap-mds.keyring  ceph.bootstrap-osd.keyring  ceph.client.admin.keyring  ceph.conf  ceph.log  ceph.mon.keyring  release.asc
    

step4: Prepare and activate the disks (ceph-deploy also has a create command that should combine this two operations together, but for some reason it was not working for me)

	ceph-deploy osd prepare cephmaster:/storage1 cephmaster:/storage2 cephmaster:/storage3
	ceph-deploy osd activate cephmaster:/storage1 cephmaster:/storage2 cephmaster:/storage3

step5: Copy keys and configuration files

	$ ceph-deploy admin cephmaster
    
step6: Ensure proper permissions for admin keyring

	$ sudo chmod +r /etc/ceph/ceph.client.admin.keyring

Check the Ceph status and health

	$ ceph health
	$ ceph status
    $ ceph osd tree

Ceph setup is ok when the health is `HEALTH_OK`. We the software engineers generally don't care about the `WARNINGS`, but in ceph `HEALTH_WARN` is like error.

######Revert installation

There are useful commands to purge the Ceph installation and configuration from every node so that one can start over again from a clean state.

This will remove Ceph configuration and keys

	ceph-deploy purgedata cephmaster
	ceph-deploy forgetkeys

This will also remove Ceph packages

	ceph-deploy purge cephmaster

Before getting a healthy Ceph cluster I had to purge and reinstall many times, cycling between the “Setup the cluster”, “Prepare OSDs and OSD Daemons” and “Final steps” parts multiple times, while removing every warning that ceph-deploy was reporting.

