---
title: Ceph Object Gateway
slug: ceph-gateway
date_published: 2015-10-13T14:42:40.417Z
date_updated:   2016-06-02T13:10:33.920Z
---

**Ceph Object Gateway** is an object storage interface built on top of librados to provide applications with a RESTful gateway to Ceph Storage Clusters. Ceph Object Storage supports two interfaces:

***S3-compatible:*** Provides object storage functionality with an interface that is compatible with a large subset of the Amazon S3 RESTful API.

**Swift-compatible:** Provides object storage functionality with an interface that is compatible with a large subset of the OpenStack Swift API.

**My ceph cluster setup**
	
    mon and gateway	- mon-server(192.168.1.10)
    osd1 and osd2 	 - osd1(192.168.1.11)
    osd3 			  - osd2(192.168.1.12)
    OS				 - Ubuntu Trusty(14.04.2 LTS)

To run the Ceph object gateway service on Ubuntu 14.04 (Trusty), you should have a running Ceph cluster and the gateway host should have access to storage and public networks.


	In my case, I've done the follwing in mon-server(192.168.1.10)
    
**INSTALL APACHE/FASTCGI**

On Ubuntu Ubuntu 14.04, multiverse needs to be enabled in the package resource list file 

uncomment the following lines in /etc/apt/sources.list:

	# deb http://archive.ubuntu.com/ubuntu trusty multiverse
	# deb-src http://archive.ubuntu.com/ubuntu trusty multiverse
	# deb http://archive.ubuntu.com/ubuntu trusty-updates multiverse
	# deb-src http://archive.ubuntu.com/ubuntu trusty-updates multiverse

Update the package resource list:

	$ sudo apt-get update
    
Install Apache and FastCGI:

	$ sudo apt-get install apache2 libapache2-mod-fastcgi
    
**Configure APACHE**

Add a line for the ServerName in the /etc/apache2/apache2.conf. Provide the fully qualified domain name of the server machine (e.g., hostname -f):

	ServerName mon-server

Enable the URL rewrite modules for Apache and FastCGI
Execute the following:

	$ sudo a2enmod rewrite
	$ sudo a2enmod fastcgi

Restart Apache service

	$sudo service apache2 start
    
**INSTALL CEPH OBJECT GATEWAY DAEMON**

Ceph Object Storage services use the Ceph Object Gateway daemon (radosgw) to enable the gateway.

To install the Ceph Object Gateway daemon on the gateway host, execute the following:

	$ sudo apt-get install radosgw
    
Once you have installed the Ceph Object Gateway packages, the next step is to configure your Ceph Object Gateway. There are two approaches: `simple` and `FEDERATED`. I used `simple` in my system

Simple: A simple Ceph Object Gateway configuration implies that you are running a Ceph Object Storage service in a single data center. So you can configure the Ceph Object Gateway without regard to regions and zones.

The Ceph Object Gateway is a client of the Ceph Storage Cluster. As a Ceph Storage Cluster client, it requires:

	1. A name for the gateway instance. We use 'admin' in this guide.
	2. A storage cluster user name with appropriate permissions in a keyring.
	3. Pools to store its data.
	4. A data directory for the gateway instance.
	5. An instance entry in the Ceph Configuration file.
	6. A configuration file for the web server to interact with FastCGI.
    
The configuration steps are as follows:

**Execute the following steps on the admin node of your cluster:**

Create a keyring for the gateway:

	$ sudo ceph-authtool --create-keyring /etc/ceph/ceph.client.radosgw.keyring
	sudo chmod +r /etc/ceph/ceph.client.radosgw.keyring
    
Generate a Ceph Object Gateway user name and key for each instance. For exemplary purposes, we will use the name 'admin' after client.radosgw:

	$ sudo ceph-authtool /etc/ceph/ceph.client.radosgw.keyring -n client.radosgw.admin --gen-key
    
Add capabilities to the key:

	$ sudo ceph-authtool -n client.radosgw.admin --cap osd 'allow rwx' --cap mon 'allow rwx' /etc/ceph/ceph.client.radosgw.keyring
    
Once you have created a keyring and key to enable the Ceph Object Gateway with access to the Ceph Storage Cluster, add the key to your Ceph Storage Cluster. For example:

	$ sudo ceph -k /etc/ceph/ceph.client.admin.keyring auth add client.radosgw.admin -i /etc/ceph/ceph.client.radosgw.keyring
    
Distribute the keyring to the gateway host:

	$ sudo scp /etc/ceph/ceph.client.radosgw.keyring  USERNAME@GATEWAY_IP:/home/ceph
    $ ssh USERNAME@GATEWAY_IP 'sudo mv ceph.client.radosgw.keyring /etc/ceph/ceph.client.radosgw.keyring'

NOTE
The last step is optional if admin node is the gateway host.

**CREATE POOLS**

If pools already exist, no problem. If not, create all the pools listed below

	$ ceph osd pool create .rgw.buckets 16 16
    
	.rgw
	.rgw.root
	.rgw.control
	.rgw.gc
	.rgw.buckets
	.rgw.buckets.index
	.log
	.intent-log
	.usage
	.users
	.users.email
	.users.swift
	.users.uid

`NOTE`
if write permission is given, Ceph Object Gateway will create pools automatically.

`NOTE` When adding a large number of pools, it may take some time for your cluster to return to a active + clean state.

When you have completed this step, execute the following to ensure that you have created all of the foregoing pools:

	$ rados lspools


**ADD A GATEWAY CONFIGURATION TO CEPH** 

Add the Ceph Object Gateway configuration to your Ceph Configuration file in admin node. The Ceph Object Gateway configuration requires you to identify the Ceph Object Gateway instance. Then, you must specify the host name where you installed the Ceph Object Gateway daemon, a keyring (for use with cephx), the socket path for FastCGI and a log file.

Append the following configuration to `/etc/ceph/ceph.conf` in your admin node:

	[client.radosgw.admin]
	host = {hostname}
	keyring = /etc/ceph/ceph.client.radosgw.keyring
	rgw socket path = 	/var/run/ceph/ceph.radosgw.admin.fastcgi.sock
	log file = /var/log/radosgw/client.radosgw.admin.log
    
`NOTE`
Here, {hostname} is the short hostname (output of command hostname -s) of the node that is going to provide the gateway service i.e, the gateway host.

`NOTE` The [client.radosgw.admin] portion of the gateway instance identifies this portion of the Ceph configuration file as configuring a Ceph Storage Cluster client where the client type is a Ceph Object Gateway (i.e., radosgw).

**DISTRIBUTE UPDATED CEPH CONFIGURATION FILE**

	$ ceph-deploy --overwrite-conf config pull {gateway_hostname}
    $ ceph-deploy --overwrite-conf config push osd1 osd2 
    
    
**COPY CEPH.CLIENT.ADMIN.KEYRING FROM ADMIN NODE TO GATEWAY HOST**

	$ sudo scp /etc/ceph/ceph.client.admin.keyring  USERNAME@GATEWAY_IP:/home/USERNAME
    $ ssh USERNAME@GATEWAY_IP 'sudo mv ceph.client.admin.keyring /etc/ceph/ceph.client.admin.keyring'
    
`NOTE` The above step need not be executed if admin node is the gateway host

**CREATE A CGI WRAPPER SCRIPT**

The wrapper script provides the interface between the webserver and the radosgw process. This script needs to be in a web accessible location and should be executable.

Execute the following steps on the gateway host:

Create the script:

	$ sudo vi /var/www/html/s3gw.fcgi
Add the following content to the script:

	#!/bin/sh
	exec /usr/bin/radosgw -c /etc/ceph/ceph.conf -n client.radosgw.admin
	
Provide execute permissions to the script:

Change file permission

	$ sudo chmod +x /var/www/html/s3gw.fcgi

Create Data Directory
	
    $ sudo mkdir -p /var/lib/ceph/radosgw/ceph-radosgw.admin
    
Start rados gateway service

	$ sudo /etc/init.d/radosgw start
    

CREATE A GATEWAY CONFIGURATION FILE

	$ sudo vi /etc/apache2/sites-available/rgw.conf
    
Add the following contents to the file:

	FastCgiExternalServer /var/www/html/s3gw.fcgi -socket /var/run/ceph/ceph.radosgw.admin.fastcgi.sock

	<VirtualHost *:80>
	ServerName localhost
	DocumentRoot /var/www/html

	ErrorLog /var/log/apache2/rgw_error.log
	CustomLog /var/log/apache2/rgw_access.log combined

	# LogLevel debug

	RewriteEngine On

	RewriteRule ^/([a-zA-Z0-9-_.]*)([/]?.*) /s3gw.fcgi?page=$1&params=$2&%{QUERY_STRING} [E=HTTP_AUTHORIZATION:%{HTTP:Authorization},L]

	<IfModule mod_fastcgi.c>
		<Directory /var/www/html>
		Options +ExecCGI
		AllowOverride All
		SetHandler fastcgi-script
		Order allow,deny
		Allow from all
		AuthBasicAuthoritative Off
		</Directory>
	</IfModule>

	AllowEncodedSlashes On
	ServerSignature Off

	</VirtualHost>

Disable the default site:

	$ sudo a2dissite 000-default


Enable the configuration file

	$ sudo a2ensite rgw.conf

Restart apache2 service

	$ sudo service apache2 restart
    

**USING THE GATEWAY**

CREATE A RADOSGW USER FOR S3 ACCESS

	$ sudo radosgw-admin user create --uid="testuser" --display-name="First User"

The output of the command will be something like the following:

	{"user_id": "testuser",
	"display_name": "First User",
	"email": "",
	"suspended": 0,
	"max_buckets": 1000,
	"auid": 0,
	"subusers": [],
	"keys": [
	{ "user": "testuser",
	"access_key": "I0PJDPCIYZ665MW88W9R",
	"secret_key": 	"dxaXZ8U90SXydYzyS5ivamEP20hkLSUViiaR+ZDA"}],
	"swift_keys": [],
	"caps": [],
	"op_mask": "read, write, delete",
	"default_placement": "",
	"placement_tags": [],
	"bucket_quota": { "enabled": false,
	"max_size_kb": -1,
	"max_objects": -1},
	"user_quota": { "enabled": false,
	"max_size_kb": -1,
	"max_objects": -1},
	"temp_url_keys": []}

`NOTE` The values of keys->access_key and keys->secret_key are needed for access validation.

**ACCESS VERIFICATION**

install the python-boto package

	$ sudo apt-get install python-boto

Create the Python script:

	$ nano s3.py
   
	import boto
	import boto.s3.connection
	access_key = 'YOUR_ACCESS_KEY'
	secret_key = 'YOUR_SECRET_KEY'
	conn = boto.connect_s3(
	aws_access_key_id = access_key,
	aws_secret_access_key = secret_key,
	host = '{FQDN}',
	is_secure=False,
	calling_format = boto.s3.connection.OrdinaryCallingFormat(),)
    bucket = conn.create_bucket('my-new-bucket')
	for bucket in conn.get_all_buckets():
		print "{name}\t{created}".format(
			name = bucket.name,
			created = bucket.creation_date,
	)
	
Run the script:

	$ python s3test.py   
    
The output will be something like the following:

	my-new-bucket 2015-02-16T17:09:10.000Z
    

**Test in ruby language**

To test ceph-gateway, we have use rubygem `s3`. Source code is in https://github.com/thomasalrin/s3

Edit https://github.com/thomasalrin/s3/blob/master/lib/s3.rb to point to your gateway_host

######Revert installation

There are useful commands to purge the Ceph gateway nstallation and configuration from every node so that one can start over again from a clean state.

This will remove Ceph configuration and keys

	ceph-deploy purgedata mon-server

This will also remove Ceph packages

	ceph-deploy purge mon-server

IF you received the below error when you attempt to install radosgw again
	client.radosgw.admin exists but key does not match
 
Execute this to fix the error 
    ceph auth del client.radosgw.gateway


 
