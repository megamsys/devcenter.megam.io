---
title: How to launch Nodejs - etherpad-lite in MegamAfrica
slug: how-to-launch-etherpad-lite
date_published: 2016-05-11T04:57:43.140Z
date_updated:   2016-05-27T13:24:30.004Z
---

###Introduction

Etherpad is a really-real time collaborative editor maintained by the Etherpad Community.Etherpad is designed to be easily embeddable and provides a HTTP API that allows your web application to manage pads, users and groups. It is recommended to use the available client implementations in order to interact with this API.

This tutorial will guide you in launching a Nodejs web application (etherpad-lite) in MegamAfrica.

<a href="https://console.megamafrica.com" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/megamafrica/DEPLOY-TO-MEGAM-AFRICA-BIG1.png" alt="wordpres button" /></a>

###Prerequisites


* You are running Ubuntu 14.04 or Linux workstation.

* Git installed on your workstation, which you can do by following the [How To Install Git with Apt.](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-14-04)

* You have an account on GitHub, which is a Git repository host.

* You have to create a valid credential for accessing https://console.megamafrica.com. [How to create an account with MegamAfrica](http://devcenter.megam.io/2016/05/27/how-to-launch-ubuntu/)

* You have to install openssh-server for ssh access in your worstation.

		sudo apt-get install openssh-server
    
* Check SSH working properly 

		ps aux | grep sshd

This initial section contains everything you need to get etherpad-lite running on your server.

###Step-1 Fork etherpad-lite
* Fork etherpad-lite
from https://github.com/verticeapps/node_etherpad.git

* You will be see the fork option in the top right corner of the git hub page.click the fork option.

* The node_etherpad is forked into your git repository

###Step-2 Launch the app
1. Go to MegamAfrica Dashboard

2. Click Marketplace on the top bar.Marketplace contains all the linux distros, applications, services and microservices which megamafrica supports.

3. Click Nodejs Icon.A window will pop up for your repository selection. 

4. Pick a repository by choosing your git repository.

  Let us use Github: < mygithub >/node_etherpad

5. You can create new sshkey or use an existing sshkey or upload your own sshkeys too.

6. To Launch Nodejs App.Click Create.

* Voila ! Your App is up to date.

* Now that you have launched your app, you might want to launch a service (database) and bind it

###Start Script
MegamAfrica will look for a start script named `start`,  
ensure that your git repository have the start script file as follows.

 	#!/bin/sh
 	./bin/run.sh --root

   
###**Step-3 Open Your Web browser**
You can access your web page using http://IP_ADDRESS/9001


![](/content/images/2016/05/node.png)

###Conclusion

These are the very simple steps to launch a Nodejs web app (etherpad-lite) using github repository.

###Deploy Nodejs app now 
<a href="https://console.megamafrica.com" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/megamafrica/DEPLOY-TO-MEGAM-AFRICA-BIG1.png" alt="wordpres button" /></a>



