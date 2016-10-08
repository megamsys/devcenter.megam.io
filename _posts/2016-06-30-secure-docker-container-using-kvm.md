---
title: Hyperizing Docker Containers with rock solid security
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Hyperizing Docker Containers with rock solid security
---

#### Introduction

   One of the questions we have been asked is what is the secret sauce in our enterprise edition as all our stuff is opensource.

 Hence this is one of our secret sauce. Yes if you want to run secure docker containers by using a hypervisor like KVM, contact us @info@megam.io. If you are from the hosting industry we will put you in touch with our partner DET.io (jonathan@det.io).

In this article we will provide the opensource way of doing stuff on your own.

Lets get started too launch the docker container in
secure isolated with a very fast launch using hypercontainers.

#### Introducing HyperContainer
   HyperContainer is a Hypervisor-agnostic Docker Runtime that allows you to run Docker images on any hypervisor (KVM, Xen, etc.).


     HyperContainer = Hypervisor + Kernel + Docker Image

By containing applications within **separate VM instances** and kernel spaces, HyperContainer is able to offer an excellent **Hardware-enforced Isolation**, which is much needed in multi-tenant environments.

HyperContainer also promises  **Immutable** Infrastructure by eliminating the middle layer of Guest OS, along with the hassle to configure and manage them.

#### Setup HyperContainer

 This initial section contains everything you need to setup the hypercontainer on one of your baremental server.

Now if your have a several servers, you can contact us, the enterprise edition is a lifesaver.

##### Step - 1 Install HyperContainer

The Prerequisites are,

Hypervisor: at least one of

[Linux] **QEMU KVM** 2.0 or later
[Linux] **Xen** 4.5 or later (for Xen support)

We will use KVM here. Supose your server doesn't have the any hypervisor you need to install the following

      sudo apt-get install qemu-system

Now the install hypercontainer on your server,

     wget http://hyper-install.s3.amazonaws.com/hyper-latest.tgz
     tar -xvzf hyper-latest.tgz


  Then cd into the hyper-pkg directory

    ./bootstrap.sh
    ./install.sh


   Next we start the hyperd service

    sudo service hyperd start

##### Step - 2 Pull  Docker Images

To pull the docker images from docker registry by using these command

    hyper pull tutum/hello-world

Now the container pulled in sub-millseconds.

To list the docker images


    hyper images

    REPOSITORY            TAG   IMAGE ID     CREATED        VIRTUAL SIZE
    tutum/hello-world   latest  4b95f40f2f4d   2015-12-14 16:16:44   17.0 MB

##### Step -3 Network  setup

By default the hypercontainer uses `hyper0` bridge but we wil have to use our own subnet (own bridge)

Lets setup a bridge named `one` in your server.

    brctl addbr one


Once you have created a bridge  you need to change the configuration file under in /etc/hyper/config

    Kernel=/var/lib/hyper/kernel
    Initrd=/var/lib/hyper/hyper-initrd.img
    Bios=/var/lib/hyper/bios-qboot.bin
    Cbfs=/var/lib/hyper/cbfs-qboot.rom
    Bridge=one
    BridgeIP=xxx.xxx.x.x/24

 Then restart the hyperd service

    service hyperd restart

##### Step - 4 Run the HyperContainer

    hyper run --name test -d tutum/hello-world

 The hypercontainer runs in an isolated space in an independent kernal.

To list the running hypercontainers

    hyper list
    POD ID            POD Name           VM name                 Status
    pod-IlLsHBTYGQ      tutum1       vm-FXBRjvEgJY              running


#### Conclusion

These are the very simple steps to successfully launch a docker container in a secure isolated space.

Again if you have a lot os server rack, we have the solution. Contact us @info@megam.io
