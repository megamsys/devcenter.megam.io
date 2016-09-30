---
title: How to Launch Ubuntu 14.04 in MegamAfrica
slug: launch-ubuntu
date_published: 2016-05-09T10:43:06.342Z
date_updated:   2016-05-27T11:34:25.986Z
---

###Introduction

Ubuntu is a Debian-based Linux operating system and distribution for personal computers, smartphones and network servers. It uses Unity as its default user interface. It is based on free software and named after the Southern African philosophy of ubuntu. 

This tutorial will guide you in setting up a Ubuntu 14.04 VM in MegamAfrica.

<a href="https://console.megamafrica.com" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/megamafrica/DEPLOY-TO-MEGAM-AFRICA-BIG1.png" alt="wordpres button" /></a>

###Prerequisites

* You are running Ubuntu 14.04 or Linux workstation.

* Git installed on your server, which you can do by following the [How To Install Git with Apt.](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-14-04)

* An account on GitHub, which is a Git repository host.
To follow this tutorial :

* You have to create a valid credential for accessing https://console.megamafrica.com. [How to create an account with MegamAfrica](http://devcenter.megam.io/2016/05/27/how-to-launch-ubuntu/)

You have to install openssh-server for ssh access.

	$ sudo apt-get install openssh-server

To check the ssh is properly installed in our system

	$ ps aux | grep sshd
    
###Step - 1 Creating Ubuntu VM

This initial section contains everything you need to get Ubuntu and running on your server.

First, ensure the user can login to https://console.megamafrica.com.  

* Go to the Market Places.

* Select the Ubuntu, A window will pop up with for CPU, storage, RAM and SSHkey options.

* You can choose the storage size, RAM capacity.

* You can Create a new sshkey, use an existing sshkey or import your own sshkeys too.

* click the Create button. it will create the virtual machine.

###Step - 2 Access the Ubuntu VM

Next, Go to the Dashboard and click the domain name a new window will open.

* It contains the CPU, RAM and Network tab.

* It shows the Metrics, VM Logs, IP address and SSH URL.

* Metrics shows the CPU,RAM and Network usage.

* VM Logs shows all the running process in VM.

* You need to access the Virtual Machine from a terminal. 

* You can download the SSH Keys from SSH Keys tab or Overview page. Use this key to login to your virtual machine using the following command,

		$ ssh -i path to/<private_key filename> root@<ipaddress>

###Conclusion

These are the very simple steps to launch Ubuntu virtual machine. This is a good head-start for launching a Ubuntu in MegamAfrica.

###Deploy your Ubuntu VM now

<a href="https://console.megamafrica.com" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/megamafrica/DEPLOY-TO-MEGAM-AFRICA-BIG1.png" alt="wordpres button" /></a>
