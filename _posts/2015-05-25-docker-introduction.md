---
title: 'Dockers!  are you ready?'
slug: docker-introduction
date_published: 2015-05-25T08:57:49.424Z
date_updated:   2015-05-25T09:51:48.577Z
tags: docker, containers, containerization, LXCs, linux
---


### Docker Docker Docker! what the heck..?

Let us consider a scenario where you are planning to deploy an application or service. Now, to deploy an application, the most sensible thing to do is to fire up an instance(VM) and deploy it.

Here, an hypervisor sitting on top of the host os launches a virtual operating system by sharing the hardware resources. 

<b>So, option 1:</b>

<b>(V)App/services -> (V)bins, libs -> (V)Guest OS -> HYPERVISOR(KVM, Xen) -> Host OS -> Server


<b>Option 2:</b>

(V)App/services -> bins, libs -> Docker engine -> Host OS -> Server</b>

(V) - Virtualized component

Containers, instead of virtualizing hardwares, they sit on one single linux operating system instance, hence for a usecase where VMs are too much of an over head, containers are the right solution.

*Megam's strategy is to deploy with both VMs and dockers to max out resources usage efficiency. We support baremetal docker deployments too.*

In short, imagine containers as small capsules that contains your application in a well bundled manner, with defined resource usages, that can be read by the docker engine on any linux operating systems. Not to forget, it is highly portable - *Containers gives you instant application portability*

Now you can run multiple applications independantly on a single operating system which runs on your server instead of creating multiple OSes for each application/services. 

**The key difference between containers and VMs is that while the hypervisor abstracts an entire device, containers just abstract the operating system kernel. smart right?** 


#####So docker figured out the whole containerization technology? 

Nope! containers are in existence for almost  15 years now, Google's open source container technology [lmctfy](https://github.com/google/lmctfy) (let me contain that for you) effecively uses containers for most their infrastructure needs, you search, use gmail, read news, you spin up a container. LXCs, solaris's Zones are all container technology that are there more than a decade ba

Docker, on the other hand made containers easier and safer to depoy. Developers can use docker to pack, ship and run any application as a lightweight, portable  LXC container that can run virtually anywhere. 

####Trying docker out (Ubuntu Trusty 14.04)

Docker community is huge and it supports almost all platforms, so nothing to worry. 

**First things first,**

     $sudo apt-get update

**now, let us install docker**

     $wget -qO- https://get.docker.com/ | sh


####Containerize your application:

Once you have installed docker we are good to go. First, we will use basic docker commands, 

**docker ps - shows running containers <br>
docker build - builds a container
docker pull/push - pulls/pushes an image from docker hub
docker run - runs it** 



**Image? docker hub? what?** 

It is simple, you can build your containers and push it on docker hub and later can just use `docker run` anywhere to deploy it. easy right? 
An image is your packaged container that is pushed on docker hub. `docker run` automatically pulls if the image is not found locally. Shown below.


**Let us run postgres container**

    $sudo docker run postgres

it first searches for local docker images and then pulls it from docker hub and runs it automatically. 

Now, see if the container is running..

    $sudo docker ps

this should list the containers currently running and in our case, it should list postgres. 


It is a breeze to simply build, and run docker containers on any linux environment. Thats it for now, I will write about docker clustering using kubernetes, using docker api and geard and also about the deeper understanding of docker containers and how it works internally. 

Stay tuned!


