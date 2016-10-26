---
title: Hadoop/Spark multi-node setup
author: rajthilak
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Hadoop/Spark multi-node setup
---
This is an installation guide for Apache Hadoop and Apache Spark on a multi node setup. We will use  Cloudera v5 as it has the packages for debian. You are free to use Hortonworks ,MapR (or) straight up zips from [Hadoop](hadoop.apache.org), [Spark](spark.apache.org).


Lets clear the terminology of a node. A node means individual servers, Virtual Machines (VMs) (or) Micro services.

In a multinode setup, we will deploy a topology of

* One  Hadoop namenode
* Many Hadoop datanode
* One Spark Master
* Many Spark Workers


The definition of Hadoop namenode, datanode, Spark can be read from the links here.

[Apache Spark](spark.apache.org)
[Hadoop](hadoop.apache.org)

### In all the nodes

We need java, hence do the following in all the nodes.

Install java

    sudo apt-get install openjdk-7-jdk

Install cloudera repo package

    wget http://archive.cloudera.com/cdh5/one-click-install/trusty/amd64/cdh5-repository_1.0_all.deb
    sudo dpkg -i cdh5-repository_1.0_all.deb
    sudo apt-get -y update


For those of you folks from [Ceph](http://www.ceph.com) background, The Hadoop namenode is like Ceph MDS (Metadata server) which just stores pointer to data/additional info about the data.

There is a research project we will look at to see how Ceph can be natively used with Apache Spark. Why do you want do that, well Ceph is native (ugly Java can be gotten rid of)

###### First node

Lets install Hadoop namenode in the first node.

    sudo apt-get -y install hadoop-yarn-resourcemanager hadoop-hdfs-namenode hadoop-yarn-nodemanager hadoop-yarn-proxyserver hadoop-client

Make a directory to store hadoop filesystem and change permission of that directory to `hdfs:hdfs`

	sudo mkdir -p /hadoopstorage/name
	sudo chown -R hdfs:hdfs /hadoopstorage/

Edit /etc/hadoop/conf/core-site.xml with the $FIRST_NODE_IP_ADDR  to `ip address of first node`

	<?xml version="1.0"?>
	<!--
	Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership.
	The ASF licenses this file to You under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance withthe License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.See the License for the specific language governing permissions and limitations under the License.
	-->
	<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
	<configuration>
	<property>
	<name>fs.default.name</name>
	<value>hdfs://$FIRST_NODE_IP_ADDR:8097</value>
	</property>
	</configuration>

Edit /etc/hadoop/conf/hdfs-site.xml

	<?xml version="1.0"?>
	<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
	<!-- Put site-specific property overrides in this file. -->
	<configuration>
    <property>
     <name>dfs.namenode.name.dir</name>
     <value>/hadoopstorage/name/</value>
    </property>
	<property>
		<name>dfs.permissions.enabled</name>
		<value>false</value>
	</property>
	</configuration>


Make symbolic links

	sudo ln -s /usr/lib/hadoop/libexec /usr/lib/hadoop-yarn/libexec
	sudo ln -s /usr/lib/hadoop/libexec /usr/lib/hadoop-hdfs/libexec

Start Hadoop namenode

	sudo -u hdfs hadoop namenode -format -force
	sudo service hadoop-hdfs-namenode start

### Second node

Let us install Spark Master.

    apt-get install spark-core spark-master spark-history-server

Change STANDALONE_SPARK_MASTER_HOST by replacing the $SECONDNODE_IP_ADDR with your second node ip address.

	sed -i "s/^[ \t]*export STANDALONE_SPARK_MASTER_HOST=.*/export STANDALONE_SPARK_MASTER_HOST='$SECONDNODE_IP_ADDR'/" /etc/spark/conf/spark-env.sh


Add below lines in /etc/spark/conf/spark-defaults.conf

	spark.master    spark://$SECONDNODE_IP_ADDR:7077
	spark.eventLog.dir  /usr/spark/applicationHistory
	spark.eventLog.enabled           true

After changing configurations, you need to restart spark-master

	sudo service spark-master restart

### Adding a Hadoop datanode

Let us install Hadoop datanode in another node you have.

Install packages

	sudo apt-get -y install hadoop-hdfs-datanode

Create hadoop storage directory

	sudo mkdir -p /hadoopstorage/data/

Edit /etc/hadoop/conf/core-site.xml

	<?xml version="1.0"?>
	<!--
	Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership.
	The ASF licenses this file to You under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance withthe License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.See the License for the specific language governing permissions and limitations under the License.
	-->
	<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
	<configuration>
	<property>
	<name>fs.default.name</name>
	<value>hdfs://$HADOOP_NAMENODE_IP_ADDR:8097</value>
	</property>
	</configuration>

Edit /etc/hadoop/conf/hdfs-site.xml

	<?xml version="1.0"?>
	<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
	<!-- Put site-specific property overrides in this file. -->
	<configuration>
	<property>
		<name>dfs.permissions.enabled</name>
		<value>false</value>
	</property>
    <property>
  	 <name>dfs.datanode.data.dir</name>
	 <value>/hadoopstorage/data/</value>
	</property>
	</configuration>

Make symbolic links

	sudo ln -s /usr/lib/hadoop/libexec /usr/lib/hadoop-hdfs/libexec

Restart service

	sudo service hadoop-hdfs-datanode restart


### Adding a Spark Worker


Let us install spark worker in another node you have.

    sudo apt-get install libgfortran3
    apt-get install spark-core spark-worker

Change STANDALONE_SPARK_MASTER_HOST by replacing the $SPARK_MASTER_IP_ADDR with your spark master's ip address. In this case the second node is our Spark Master

	sed -i "s/^[ \t]*export STANDALONE_SPARK_MASTER_HOST=.*/export STANDALONE_SPARK_MASTER_HOST='$SPARK_MASTER_IP_ADDR'/" /etc/spark/conf/spark-env.sh

Add the below in /etc/spark/conf/spark-defaults.conf

	spark.master    spark://$SPARK_MASTER_IP_ADDR:7077

Restart Service

	sudo service spark-worker restart

After this we will launch the [retail analytics app](https://github.com/megamsys/retail_analytics.git) to predict a product buying behaviour. We will cover it in the next part.

    NOTE :
If you want to store the history of spark, create spark history storage space into HDFS.

At this point, hadoop-hdfs-namenode and hadoop-hdfs-datanode services should be running.

Execute the below in master server to create history storage

	sudo -u hdfs hadoop fs -mkdir /user
	sudo -u hdfs hadoop fs -mkdir /user/spark
	sudo -u hdfs hadoop fs -mkdir /user/spark/applicationHistory
	sudo -u hdfs hadoop fs -chown -R spark:spark /user/spark
	sudo -u hdfs hadoop fs -chmod 1777 /user/spark/applicationHistory

Now restart the service

	sudo service spark-history-server restart
