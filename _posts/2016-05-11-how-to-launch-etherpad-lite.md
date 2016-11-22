---
title: How to launch Nodejs - etherpad-lite in MegamVertice
layout: post
author: "vinothini"
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: How to launch Nodejs - etherpad-lite in MegamVertice
---
### Introduction

Etherpad is a really-real time collaborative editor maintained by the Etherpad Community.Etherpad is designed to be easily embeddable and provides a HTTP API that allows your web application to manage pads, users and groups. It is recommended to use the available client implementations in order to interact with this API.

This tutorial will guide you in launching a Nodejs web application (etherpad-lite) in MegamVertice.

<a href="https://docs.megam.io/installation/prequisites/" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png " alt="wordpres button" /></a>


### Prerequisites

* You are running Ubuntu 14.04 or Linux workstation.

* Git installed on your workstation, which you can do by following the [How To Install Git with Apt.](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-14-04)

* You have an account on GitHub, which is a Git repository host.

* You have to create a valid credential for accessing [docs.megam.io](https://docs.megam.io/overview/tour/). [How to create an account with MegamVertice](https://devcenter.megam.io/getting-started-in-megamvertice-open-source-cloud-hosting)

* You have to install openssh-server for ssh access in your worstation.

		sudo apt-get install openssh-server

* Check SSH working properly

		ps aux | grep sshd

This initial section contains everything you need to get etherpad-lite running on your server.

### Step-1 Fork etherpad-lite
* Fork etherpad-lite
from [here](https://github.com/verticeapps/node_etherpad.git)

* You will be see the fork option in the top right corner of the git hub page.click the fork option.

* The node_etherpad is forked into your git repository

### Step-2 Launch the app
* Go to MegamVertice Dashboard

* To know how to launch App [click here](http://docs.megam.io/customapps/deploying/)

### Start Script
MegamVertice will look for a start script named `start`,  
ensure that your git repository have the start script file as follows.

	!/bin/sh
	./bin/run.sh --root

### Step-3 Access Web browser
* You can access your web page by clicking the URL link in App Management Page
![](/res/url.png)

* Now you can see the below page
![](/res/nodejs.png)

### Conclusion

These are the very simple steps to launch a Nodejs web app (etherpad-lite) using github repository.

### Deploy Nodejs app now

<a href="https://docs.megam.io/installation/prequisites/" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png " alt="wordpres button" /></a>
