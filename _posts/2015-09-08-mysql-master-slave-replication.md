---
title: MySQL Master-Slave Replication
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: MySQL Master-Slave Replication
---

MySQL is the world's most popular open source database.  MySQL can cost-effectively help you deliver high performance, scalable database applications.

###### REPLICATION

  Master-slave data replication allows for replicated data to be copied to multiple computers for backup and analysis by multiple parties. Needed changes identified by a group member must to be submitted to the designated "master" of the node. This differs from Master-Master replication, in which data can be updated by any authorized contributor of the group.

This article provides information to setting up MySQL master-slave database replication between two cloud servers.


SYSTEM SETUP

        OS	 : Ubuntu 14.04.2
        MySQL  : MySQL 5.5

SERVERS

MySQL replication needs atleast two servers, one act as master and others act as slaves. Master performs both write and read it replicates in all slaves. Slave also can write but it modified only in it's database.It does not replicate in any slaves.

My Servers are

        server1 : 192.168.1.12
        server2 : 192.168.1.13


  here we use server1 as master and server2 as slave.


###### Install and Configure MySQL in Master Server

        $ sudo apt-get install mysql-server


 After installing MYSQL, have to configure it

		$ nano /etc/mysql/my.cnf

Change bind-address to point to the Server1 IP address.

        bind-address   = 192.168.1.12

Just remove the comment for server-id and log_bin and save the file.

		log_bin        = /var/log/mysql/mysql-bin.log

Change the Server id as an unique positive Integer.

        server-id      = 1234

   note: use different id for server2.
Restart the mysql service.

		$ sudo service mysql restart


**Grant Replication to Slave**

Create a mysql user with password identification.

    $ mysql -u root -p pswd

    mysql> create user 'DBUSERNAME'@'%' IDENTIFIED BY 'slavepass';

Grant Slave replication Permission to that user.

		mysql> grant replication slave on *.* to 'DBUSERNAME'@'%'

**Create your own database**

Create database

    mysql> create database dbnew1
Create table

    mysql> create table dbnew1.student(s_name varchar(20),s_id int);

Insert data whatever you want

		mysql> insert into dbnew1.student('Devid',1001);

After insertion exit mysql

        mysql> exit

**Backup the MySql Database and Send to Slave**


 "mysqldump" is an effective tool to backup MySQL database. It creates a *.sql file with DROP table, CREATE table and INSERT into sql-statements of the source database. To restore the database,  execute the *.sql file on destination database.

     Syntax:  mysqldump -u root -p[root_password] [database_name] > dumpfilename.sql

     $ mysqldump -u root -p pswd --all-databases --master-data >masterdump.sql

 to verify the databases backup

     $grep CHANGE *sql  | head -1

    CHANGE MASTER TO MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=919;

send the dumpfile.sql to slave server.

       $ scp masterdump.sql 192.168.1.13:
                   or
       $ sftp server2@192.168.1.13

######Install and Configure MySQL in Slave Server

   	 $ sudo apt-get install mysql-server


 After install MYSQL, have to configure it,

		$ nano /etc/mysql/my.cnf

Change bind-address to point to slave-ipaddress.

        bind-address   = 192.168.1.13

Change the Server id to an unique positive Integer.

        server-id      = 4321


Just remove the comment for server-id and log_bin and save the file.

		log_bin        = /var/log/mysql/mysql-bin.log

Restart the mysql service.

		$ sudo service mysql restart


**Inform Slave about the master**

	$ mysql -u root -p pswd

    mysql> CHANGE MASTER TO MASTER_HOST='192.168.1.12', MASTER_USER='DBUSERNAME', MASTER_PASSWORD='slavepass';

	mysql> exit

verify whether you have received the dupmfile.sql before use the following command.

 	$ mysql -u root < masterdump.sql

now open MySQL and start the Slave.

	mysql> start slave

    mysql> show slave status\G;

It show the following attribute's value like  

	Slave_IO_State: Waiting for master to send event
                  Master_Host: 192.168.1.12
                  Master_User: DBUSERNAME
              Master_Log_File: mysql-bin.000001
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
             Master_Server_Id: 1234
		       MASTER_LOG_POS: 919

now your slave started check the master replication  

**insert a new row in master server**

	mysql> use dbnew1

   	mysql> insert into stu values('John',1004);
    mysql> select * from stu;
	+-----------+-------+
	| s_name 	| s_id 	|
	+----------+--------+
	| Devid   	| 1001 	|
	| mathi		| 1002 	|
	| thomas 	| 1003 	|
	| john     	| 1004 	|
	+------- ---+-------+
	4 rows in set (0.00 sec)

**show table in Slave Server**

    mysql> use dbnew1
	mysql> select * from stu;
	+-----------+-------+
	| s_name 	| s_id 	|
	+----------+--------+
	| Devid   	| 1001 	|
	| mathi		| 1002 	|
	| thomas 	| 1003 	|
	| john     	| 1004 	|
	+------- ---+-------+
	4 rows in set (0.00 sec)

MySQL Master-slave replication tested.

Thank you.
