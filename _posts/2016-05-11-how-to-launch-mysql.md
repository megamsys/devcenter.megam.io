---
title: How to launch MySQL in MegamAfrica
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: How to launch MySQL in MegamAfrica
---

### Introduction

MySQL is the world's most popular open source database. It runs on virtually all platforms, including Linux, UNIX, and Windows. Although it can be used in a wide range of applications, MySQL is most often associated with web-based applications and online publishing and is an important component of an open source enterprise stack called LAMP. It works very quickly and works well even with large data sets. MySQL uses a standard form of the well-known SQL data language.

This tutorial will guide you in launching MySQL.

<a href="https://console.megamafrica.com" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/megamafrica/DEPLOY-TO-MEGAM-AFRICA-BIG1.png" alt="wordpres button" /></a>

## Prerequisites

* You are running Ubuntu 14.04 or Linux workstation.

* Git installed on your server, which you can do by following the [How To Install Git with Apt.](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-14-04)

* An account on GitHub, which is a Git repository host.

You have to create a valid credential access for https://console.megamafrica.com.

You have to install openssh-server for ssh access.

	$ sudo apt-get install openssh-server

To check the ssh is properly installed in our system

	$ ps aux | grep sshd

### Step - 1 Creating MySQL Virtual Machine

This initial section contains everything you need to get MySQL and running on your server.

* First, ensure the user can login to https://console.megamafrica.com.

* Go to the Market Places.

* Select the MySQL, A window will pop up with for CPU, storage, RAM and SSHkey options.

* You can choose the storage size and RAM capacity.

* You can create a new sshkey, use an existing sshkey or import your own sshkeys too.

* Click the create button. it will create the virtual machine.

### Step - 2 Access the MySQL in the Virtual Machine

Next, Go to the Dashboard and click the domain name a new window will open.

* It contains the CPU, RAM and NETWORK tab.

* It shows the Metrics, VM Logs, IP address and SSH URL.

* Metrics shows the CPU,RAM and NETWORK  usage.

* VM Logs shows all the running process in VM.

* You need to access the virtual machine in terminal, you can download the SSH Keys from SSH Keys tab or Overview page. Use this keys to login the terminal in following command,

 		$ ssh -i path to/<private_key filename> root@<ipaddress>

* Now, you are login into vm then you need to access MySQL use the following command:

		$ mysql -h 127.0.0.1 --password=megam

successfully launched the vm and login into MySQL.

### Conclusion

This is a good head-start for launching MySQL in MegamAfrica.

### Deploy MySQL now

<a href="https://console.megamafrica.com" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/megamafrica/DEPLOY-TO-MEGAM-AFRICA-BIG1.png" alt="wordpres button" /></a>
