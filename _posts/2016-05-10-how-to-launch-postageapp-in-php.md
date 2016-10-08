---
title: How to launch PHP - PostageApp in MegamAfrica
slug: how-to-launch-postageapp-in-php
date_published: 2016-05-10T09:51:33.815Z
date_updated:   2016-05-27T12:39:33.982Z
---

####Introduction

   The PostageApp is used in quick way to deliver the email. This application supports PHP.It optionally attachs it to the mail server.
   
This tutorial will guide you in launching a php web application (PostageApp) in MegamAfrica.
   
   <a href="https://console.megamafrica.com"target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/megamafrica/DEPLOY-TO-MEGAM-AFRICA-BIG1.png " alt="wordpres button" /></a>

####Prerequisites
 
* You are running Ubuntu 14.04 or Linux workstation.

* Git installed on your workstation, which you can do by following the [How To Install Git with Apt.](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-14-04)

* You have an account on GitHub, which is a Git repository host.

* You have to create a valid credential for accessing https://console.megamafrica.com. [How to create an account with MegamAfrica](http://devcenter.megam.io/2016/05/27/how-to-launch-ubuntu/)

 * You have to install openssh-server for ssh access in your local system.

     
         sudo apt-get install openssh-server
   
 check SSH installed on your system
 
        ps aux | grep sshd
   
###Step-1 Fork PostageApp
* Fork PostageApp
from https://github.com/verticeapps/php_postage.git

* You will be see the fork option in the top right corner of the git hub page.click the fork option.

* The php_postage repository is forked into your git repository

####Step - 2 Launch PostageApp
1. Go to MegamAfrica Dashboard

2. Click Marketplace on the top bar.Marketplace contains all the linux distros, applications, services and microservices which megamafrica supports.

4. Click PHP Icon.A window will pop up for your repository selection. 

3. Pick a repository by choosing your repository.

  Let us use Github: < mygithub >/php_postage.git

5. You can create new sshkey, use an existing sshkey or upload your own sshkeys too.

6. Launch PHP App.Click Create.

* Voila ! Your App is up to date.

* Now that you have launched your app, you might want to launch a service (database) and bind it
####Step - 2 Buildpack for php

We use a default PHP build pack using our super cool chef-repo. 

      #!/bin/bash
      #Php builder
      #megam_php 
      local_repo=/var/www/html/current 
      remote_repo=https://github.com/verticeapps/php_postage.git
      megam_home=/var/lib/megam/gulp
      filename=$(basename "$remote_repo")
      extension="${filename##*.}"
      project="${filename%.*}"
      cd $megam_home
      rm -r $project
      git clone $remote_repo
      rm -r $local_repo/*
      mv ./$project/* $local_repo
      cd $project
      if [  -f "./$project/start" ]; then
      chmod 755 ./$project/start
      ./$project/start
      fi
      service apache2 restart


####Step - 3 Open Your Web Browser

You can access your web page using http://IP_ADDRESS/current

![](/content/images/2016/05/postage4.png)


Voila ! Your App is up to date.
####Conclusion
These are the very simple steps to launch a php web app (PostageApp) using github repository.

####Deploy PHP app now

<a href="https://console.megamafrica.com"target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/megamafrica/DEPLOY-TO-MEGAM-AFRICA-BIG1.png " alt="wordpres button" /></a>
