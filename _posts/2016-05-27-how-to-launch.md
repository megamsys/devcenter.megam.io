---
title: How to launch CouchDB in megamafrica.com
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: How to launch CouchDB in megamafrica.com
---
### Introduction

Apache CouchDB, commonly referred to as CouchDB, is open source database software that focuses on ease of use and having an architecture that "completely embraces the Web". It has a document-oriented NoSQL database architecture and is implemented in the concurrency-oriented language Erlang; it uses JSON to store data, JavaScript as its query language using MapReduce, and HTTP for an API.

This tutorial will set up launching CouchDB.

[![img](https://s3-ap-southeast-1.amazonaws.com/megampub/images/megamafrica/DEPLOY-TO-MEGAM-AFRICA-BIG1.png)](https://docs.megam.io/installation/prequisites)

### Prerequisites

To follow this tutorial :

You have to create a valid credential for access https://docs.megam.io/installation/prequisites.

You have to install openssh-server in your linux machine for ssh access.

	$ sudo apt-get install openssh-server

To check the ssh is properly installed in our system

	$ ps aux | grep sshd

### Step - 1 Creating CouchDB

This initial section contains everything you need to get CouchDB and running on your server.

* First, ensure the user can login to our console.megamafrica.com

* Go to the Market Places.

* Select the CouchDB, A window will pop up with for CPU, storage, RAM and SSHkey options.

* You can choose the storage size and RAM capacity.

* You can create a new sshkey, or  use an existing sshkey or import your own sshkeys too.

* Click the create button. it will create the virtual machine.

### Step - 2 Accessing CouchDB

Next, Go to the Dashboard and click the domain name a new window is open.

* It contains the CPU, RAM and Storage tab.

* It shows the Metrics, VM Logs, IP address and SSH URL.

* Metrics shows the CPU,RAM and storage usage.

* VM Logs shows all the running process in VM.

* You need to access the virtual machine in terminal, you can download the SSH Keys from SSH Keys tab or Overview page. Use this keys to login the terminal in following command,

 		$ ssh -i path to/<private_key filename> root@<ipaddress>

successfully launched the vm.

### Step-3 Open Your Web browser

You can access your web page using http://localhost:5984/

![](/content/images/2016/05/s2-2.jpg)

### Conclusion

These are the very simple steps to launch CouchDB in virtual machine. Creating vm is faster, so it takes only less time. This is a good head-start for launching CouchDB in MegamVertice.

### To Deploy your app


[![img](https://s3-ap-southeast-1.amazonaws.com/megampub/images/megamafrica/DEPLOY-TO-MEGAM-AFRICA-BIG1.png)](https://docs.megam.io/installation/prequisites)
