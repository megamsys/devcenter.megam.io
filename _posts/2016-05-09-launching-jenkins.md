---
title: How to launch Java - continious integration jenkins in MegamVertice
layout: post
author: "vinothini"
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: How to launch Java - continious integration jenkins in MegamVertice
---

### **Introduction**

Jenkins is the leading open-source automation server. Built with Java, it provides over 1000 plugins to support automating virtually anything, so that humans can actually spend their time doing things machines cannot.

This tutorial will guide you in launching a J2EE web application () in MegamVertice.

<a href="[docs.megam.io](https://docs.megam.io/overview/tour/)" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png " alt="wordpres button" /></a>


### **Prerequisites**

* You are running Ubuntu 14.04 or Linux workstation.

* Git installed on your server, which you can do by following the [How To Install Git with Apt.](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-14-04)

* You have an account on GitHub, which is a Git repository host.

* You have to create a valid credential for accessing [docs.megam.io](https://docs.megam.io/overview/tour/). [How to create an account with MegamVertice](https://devcenter.megam.io/getting-started-in-megamvertice-open-source-cloud-hosting)

You have to install openssh-server for ssh access.

	sudo apt-get install openssh-server

Check SSH working properly

	ps aux | grep sshd

In this tutorial you will see the steps to launch the J2EE using jenkins

### Step-1 Fork jenkins

* Fork jenkins from https://github.com/verticeapps/java_jenkins.git

* You will be see the fork option in the top right corner of the git hub page.click the fork option.

* The jenkins repository is forked into your git repository


### Step-2 Launch the app
1. Go to MegamVertice Dashboard

2. Click Marketplace on the top bar.Marketplace contains all the linux distros, applications, services and microservices which megamvertice supports.

3. Click Java Icon.A window will pop up for your repository selection.

4. Pick a repository by choosing your repository.

  Let us use Github: < mygithub >/java_jenkins.git

5. You can create new sshkey, use an existing sshkey or upload your own sshkeys too.

6. Launch Java App.Click Create.

* Voila ! Your App is up to date.

* Now that you have launched your app, you might want to launch a service (database) and bind it

*Rember that when you select memory its upto `2GB`


#### Buildpack for java
Java's default build pack get's going by kicking of maven. We plan to support `ant`, `gradle` in the future

	#!/bin/bash
	megam_home="/var/lib/megam/gulp"
	local_repo="/home/megam/tomcat/webapps"
	remote_repo="https://github.com/vinomca-megam/jenkins.git"
	filename=$(basename "$remote_repo")
	extension="${filename##*.}"
	filename="${filename%.*}"

      rm $local_repo/*.war
      cd $megam_home
      rm -r $filename
      git clone $remote_repo
      cd $filename
      mvn clean
      mvn install -Dmaven.test.skip=true -U
    stop java
    start java



### **Step-3 Open Your Web browser**
  You can access your web page using `http://IP_ADDRESS:8080`

Then the below UI will be open

![](/content/images/2016/05/1-2.png)

Select the Manager App.It asks User Name and Password
`Username and password is "megam"`

![](/content/images/2016/05/j2.png)

Here you will click the `jenkins` link.
* (or) the url to launch jenkins
`http://IP_ADDRESS:8080/jenkins`

![](/content/images/2016/05/j3.png)


### Conclusion

These are the very simple steps to launch a J2EE web app (jenkins) using github repository.


### Deploy Java app now

<a href="[docs.megam.io](https://docs.megam.io/overview/tour/)" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png " alt="wordpres button" /></a>
