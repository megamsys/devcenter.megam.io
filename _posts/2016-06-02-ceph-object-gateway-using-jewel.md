---
title: Ceph Object Gateway using Ceph-deploy
layout: post
author: thomasalrin
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Ceph Object Gateway using Ceph-deploy
---

**Ceph Object Gateway** is an object storage interface built on top of librados to provide applications with a RESTful gateway to Ceph Storage Clusters. Ceph Object Storage supports two interfaces:

***S3-compatible:*** Provides object storage functionality with an interface that is compatible with a large subset of the Amazon S3 RESTful API.

**Swift-compatible:** Provides object storage functionality with an interface that is compatible with a large subset of the OpenStack Swift API.

**My ceph cluster setup**

    ceph version  : (10.2.1) Jewel

    mon, osd1 and osd2 - mon-server(192.168.1.10)
    osd3 and osd4 	 - node2(192.168.1.11)
    gateway node       - gateway(192.168.1.12)
    OS				 - Ubuntu Trusty(14.04.2 LTS)
    User 			  - megamsys (with sudoer permission)

To run the Ceph object gateway service on Ubuntu 14.04 (Trusty), you should have a running Ceph cluster and the gateway host should have access to storage and public networks.


	In my case, I've done the follwing in mon-server(192.168.1.10)


**INSTALL CEPH OBJECT GATEWAY DAEMON USING CEPH-DEPLOY**

Ceph-deploy tool is reduced the effort to setup gateway.

And make sure you have password less access for ceph cluster mon and gateway for the apropriate user.

Run the below commands on `admin node`


	$ su megamsys

    $ cd /home/megamsys/ceph-cluster

	$ ceph-deploy install --rgw gateway

	$ ceph-deploy admin gateway

	$ ceph-deploy rgw create gateway

Civetweb runs on port 7480 by default.

To change the default port (e.g., to port 80), modify your Ceph configuration file in the working directory of your `admin node`. Add a section entitled `[client.rgw.< gateway-node >]`, replacing < gateway-node > with the short node name of your Ceph Object Gateway node (i.e., hostname -s).

append the following after the [global] section:

	[client.rgw.gateway]
	rgw_frontends = "civetweb port=80"

Push the updated configuration file to your Ceph Object Gateway node (and other Ceph nodes):


	$ ceph-deploy --overwrite-conf config push mon-server gatway node2

Run the below command on `gateway-node`

	$ sudo service radosgw restart id=rgw.gateway

**CREATE POOLS**

If pools already exist, no problem. If not, create all the pools listed below

	$ ceph osd pool create .rgw.buckets 128 128

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

calculate you pg_num using

max(128, Nearest power of 2 (No. of OSDs * 100 / No. of Replications / 10))

for example

	max(128 ,Nearest Power of 2 (4 * 100 / 2 /10))


`NOTE`
if write permission is given, Ceph Object Gateway will create pools automatically.

To increase your pg_num

	ceph osd pool set < pool name > pg_num 128
    ceph osd pool set < pool name > pgp_num 128


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

	$ python s3.py

The output will be something like the following:

	my-new-bucket 2016-05-21T17:09:10.000Z


**Test in ruby language**

To test ceph-gateway, we have use rubygem `s3`. Source code is in https://github.com/megamsys/radosgw-s3


###### Revert installation

There are useful commands to purge the Ceph gateway nstallation and configuration from every node so that one can start over again from a clean state.

This will remove Ceph configuration and keys

	ceph-deploy purgedata gateway

This will also remove Ceph packages

	ceph-deploy purge gateway

IF you received the below error when you attempt to install radosgw again
	client.rgw.gateway exists but key does not match

Execute this to fix the error
    ceph auth del client.rgw.gateway
