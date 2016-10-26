---
title: Data Center using OpenNebula Federation
layout: post
author: "vijayakanth"
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Data Center using OpenNebula Federation
---

The federation is performed by OpenNebula platform. The OpenNebula is an Open-source software for manage virtualized data centers.The data centers are oversees private clouds, public clouds and hybrid clouds. It provides the service as High availability.

Here we are federating two already replicated Master Slave servers. to know how to replicate two servers refer the following article

    http://devcenter.megam.io/2015/09/08/mysql-master-slave-replication/


###### Installing OpenNebula

before start to install OpenNebula verify the ruby installed with appropreate version for the Operating System

**My System Configuration :**

	OS 				: 	Ubuntu 14.04
    OpenNebula 	 :	 Version 4.12

    My Servers

    		Server 1: 192.168.1.12  (Master)
            Server 2: 192.168.1.13  (Slave)

the below Steps for Install OpenNebula occurding to my system configuration.

for Ubuntu 14.04 we need to install some packages before and after install opennebula that are

	ruby2.0,ruby2.0-dev and ruby-dev

 packages to be install.

Before install

	apt-get -y install build-essential autoconf libtool make

	apt-get -y install lvm2 ssh iproute iputils-arping


Install Opennebula

	wget -q -O- http://downloads.opennebula.org/repo/Ubuntu/repo.key | apt-key add -

	echo "deb http://downloads.opennebula.org/repo/4.12/Ubuntu/14.04 stable opennebula" > /etc/apt/sources.list.d/opennebula.list

	apt-get -y update

	apt-get -y install opennebula opennebula-sunstone


After install

	echo "oneadmin ALL = (root) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/oneadmin

	apt-get -y install ntp

	apt-get -y install ruby-dev

	chmod 0440 /etc/sudoers.d/oneadmin

	chmod 755 /usr/share/one/install_gems

    sudo /usr/share/one/install_gems sunstone

Add ip and port of sunstone-server in conf

    sed -i "s/^[ \t]*:host:.*/:host: $ipaddr/" /etc/one/sunstone-server.conf

start the Opennebula services

	sunstone-server start  

	econe-server start

	occi-server restart

	onegate-server restart

	sudo -H -u oneadmin bash -c "one restart"

	service opennebula restart

restart the Opennebula services

	sunstone-server restart
	econe-server restart
	occi-server restart
	onegate-server restart
	sudo -H -u oneadmin bash -c "one restart"
	sudo service opennebula restart

the above are installation process of OpenNebula


###### Configuration of OpenNebula Federation Master

OpenNebula uses the database sqllite by default but I use MySQL So I have to configure the OpenNebula database to MySQL Database.

First Install MySQL Server in your both server hosts

then create an user for OpenNebula federation

	$ mysql -u root -p pswd

       mysql> create user 'oneadmin'@'%' IDENTIFIED BY 'oneadmin';

   	mysql> GRANT ALL PRIVILEGES ON opennebula.* TO 'oneadmin' IDENTIFIED BY 'oneadmin';

Configure OpenNebula to MySQL Database and set Federation Master and Zone id

	$ nano  /etc/one/oned.conf

		#DB = [ backend = "sqlite" ]  >> Change as follow

		# Sample configuration for MySQL
		 DB = [ backend = "mysql",
   		     server  = "192.168.1.12",
    		    port    = 0,
        		user    = "oneadmin",
        		passwd  = "oneadmin",
        		db_name = "opennebula" ]

		FEDERATION = [
    			MODE = "MASTER",
    			ZONE_ID = 123,
    			MASTER_ONED = ""
			]

Save the conf file, after configuration

Remove the all auth files except one_auth, Before that you have to backup all the auth file.

	Back up the all auth files form /var/lib/one/.one/ and remove all auth files except one_auth file.


Restart the service to get the new keys generated again:

 After remove the file restart the services

    sunstone-server restart
	econe-server restart
	occi-server restart
	onegate-server restart
	sudo -H -u oneadmin bash -c "one restart"
	sudo service opennebula restart

Edit the local (master) Zone Endpoint by using the onezone command. You can also done this via your Sunstone UI.


	$ onezone update 0

    ENDPOINT = http://<192.168.1.12>:2633/RPC2

Create a Zone for each one of the slaves, and note down the new Zone ID.

$ nano /tmp/zone.tmpl

        NAME          = slave-one13
		ENDPOINT 	  = http://<192.168.1.13>:2633/RPC2

create your slave zone id by zone template file using blow command

    $ onezone create /tmp/zone.tmpl  
   		ID: 100

To list your Zones


   	$ onezone list
    ID 	 NAME  		    ENDPOINT
    123	 OpenNebula  
    100     slave-one13

###### Configure the OpenNebula Federation Slave

For each slave, follow these steps.

If it is a new installation, install OpenNebula as menstioned in above the installing OpenNebula guide.

To Configure OpenNebula Slave Server Use below steps:

	$mysql -u root -p
	mysql> GRANT ALL PRIVILEGES ON opennebula.* TO 'oneadmin' IDENTIFIED BY 'oneadmin';

and update oned.conf to use these values:

    $ nano /etc/one/oned.conf
		# DB = [ backend = "sqlite" ] change as

		# Sample configuration for MySQL
 		DB = [ backend = "mysql",
        	server  = "192.168.1.13",
        	port    = 0,
        	user    = "oneadmin",
        	passwd  = "oneadmin",
        	db_name = "opennebula" ]

Configure OpenNebula to act as a federation slave. Don't forget to use the Zone ID as you obtained when the zone was created.

	FEDERATION = [
    	MODE = "SLAVE",
    	ZONE_ID = 100,
    MASTER_ONED = "http://<192.168.1.12>:2633/RPC2"
		]

Copy the directory /var/lib/one/.one from the master host server to the slave host server. This directory and its contents must have oneadmin as owner. The directory should contain these files:

    $ ls -1 /var/lib/one/.one
	ec2_auth
    occi_auth
	one_auth
	oneflow_auth
	onegate_auth
    one_key
	sunstone_auth

Make sure one_auth (the oneadmin credentials) is present. If it’s not, copy it from master oneadmin’s /var/lib/one/.one/ to the slave oneadmin’s /var/lib/one/.one/.

	Start the slave OpenNebula services.
