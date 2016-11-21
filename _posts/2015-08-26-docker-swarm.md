---
title: Docker swarm
layout: post
author: "ranjitha"
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Docker swarm
---

This summer [@megamsys](https://www.megam.io) we started implementing micro services (containers) in baremetal for our customer and our public service in [beta](https://console.megam.io)

The market largely is about 4 kinds + emerging **unikernel** owing to some of the issues posed on security by the famous [docker](https://docker.com)  

* **Containers in a Virtual machine (VM)**. Everybody uses a fancy terminology, and [we](https://www.megam.io) call it a `DockerBox`. The is by far the easiest to do, since you have isolation handled already inside a  VM.

* **Improvements to containers** like [Rocket](https://coreos.com/blog/rocket/), [Flockport](https://flockport.com),[RancherOS](https://github.com/rancherio/os), [Kurma](https://github.com/apcera/kurma), [Jetpack FreeBSD](https://github.com/3ofcoins/jetpack), [systemd-nspawn](http://www.freedesktop.org/software/systemd/man/systemd-nspawn.html) using **LXC** or **systemd-nspawn** or custom build.

* **Container OS** like [Project atomic](http://www.projectatomic.io/), [CoreOS](https://coreos.com), [Snappy](https://developer.ubuntu.com/en/snappy/), [Nano server - Guess who?](https://channel9.msdn.com/Events/Ignite/2015/BRK2461), [photon ? VWware uggh!](https://github.com/vmware/photon) which helps to run containers inside it.


* **Containers in baremetal** Install and run containers on bare metal as this provides profound performance.

The container market is consolidating with *Big brother* docker  taking the lead in coming up [opencontainers.org](https://opencontainers.org). But we believe docker has the undue advantage as their standard will be superimposed as noted in the [CoreOS](https://coreos.com/blog/app-container-and-the-open-container-project/).

The emerging one are the **Unikernel or library kernel** which run just one app on top of a hypervisor. This is secure and is still nascent. [we](https://www.megam.io) would eventually like to suppor the above.

### Containers in a VM cluster or CoreOS like

<table border="1">
    <tr>
         <td bgcolor="#ffc107">Who</td>
         <td bgcolor="#ffc107">Link</td>
         <td bgcolor="#ffc107">Where</td>
    </tr>
    <tr>
        <td>Google container engine</td>
        <td><a href="https://cloud.google.com/container-engine/" target="_blank">Google</a></td>
        </td>
        <td>VM</td>
    </tr>
    <tr>
        <td>Elasticbox</td>
        <td><a href="https://elasticbox.com/" target="_blank">Elasticbox</a></td>
        <td>VM</td>
    </tr>
    <tr>
        <td>Panamax by centurylink</td>
        <td><a href="http://panamax.io/" target="_blank">Panamax</a></td>
        <td>CoreOS</td>
    </tr>
    <tr>
        <td>Apcera by Ericsson</td>
        <td><a href="https://www.apcera.com/" target="_blank">Apcera</a></td>
        <td>Kurma</td>
    </tr>
    <tr>
        <td>Engineyard (DEIS)</td>
        <td><a href="https://deis.com/" target="_blank">Deis</a></td>
        <td>CoreOS</td>
    </tr>
    <tr>
        <td>Profitbricks</td>
        <td><a href="https://blog.profitbricks.com/profitbricks-docker-hosting-free-early-access/" target="_blank">Profitbricks</a></td>
        <td>Bare metal *maybe</td>
    </tr>
    <tr>
        <td>Krane</td>
        <td><a href="https://github.com/krane-io/krane" target="_blank">Krane</a></td>
        <td>VM</td>
    </tr>
    <tr>
        <td>Joyent Triton</td>
        <td><a href="https://www.joyent.com/developers/triton-faq#what" target="_blank">Triton</a></td>
        <td>Don't know</td>
    </tr>
    <tr>
        <td>Shipyard</td>
        <td><a href="http://shipyard-project.com/" target="_blank">Shipyard</a></td>
        <td>Onpremise bare metal</td>
    </tr>
    <tr>
        <td>Docker machine</td>
        <td><a href="https://github.com/docker/machine" target="_blank">Docker</a></td>
        <td>VM</td>
    </tr>
    <tr>
        <td>Openshift</td>
        <td><a href="http://www.openshift.org/" target="_blank">Atomic</a></td>
        <td>VM</td>
    </tr>
     <tr>
        <td>Rancher</td>
        <td><a href="https://rancher.io" target="_blank">Rancher</a></td>
        <td>Onpremise bare metal</td>
    </tr>
     <tr>
        <td>Cloudfoundry</td>
        <td><a href="https://github.com/cloudfoundry-incubator/garden" target="_blank">Garden</a></td>
        <td>Don't know</td>
    </tr>
    <tr>
        <td>IBM Bluemix</td>
        <td><a href="https://console.ng.bluemix.net/" target="_blank">Bluemix</a></td>
        <td>Don't know</td>
    </tr>
    <tr>
        <td>Openstack</td>
        <td><a href="https://wiki.openstack.org/wiki/Docker" target="_blank">Openstack - Docker</a></td>
        <td>Don't know *confusing</td>
    </tr>
    <tr>
        <td>Cloudify</td>
        <td><a href="https://getcloudify.org" target="_blank">Cloudify</a></td>
        <td>Don't know</td>
    </tr>
    <tr>
        <td>Photon VMWare</td>
        <td><a href="https://vmware.github.io/photon/" target="_blank">Photon</a></td>
        <td>CoreOS like - propretitory</td>
    </tr>
    <tr>
        <td>runC (new kid)</td>
        <td><a href="https://github.com/opencontainers/runc" target="_blank">Opencontainers</a></td>
        <td>Opencontainer - baremetal</td>
    </tr>
</table>

> The funny thing in the above take is how everybody royally screws [Openstack](https://wiki.openstack.org/wiki/Docker) in getting into containers when it doesn't need to.

Anyway last year [we](https://github.com/megamsys) had docker running inside a virtual machine. In our [hackathon](https://blog.docker.com/2014/11/announcing-docker-global-hack-day-2-winners/) we demonstrated running containers inside managed VMs.

But **containers are best utilized on baremetal**.

We needed a way to run it inside bare metal.

Stay with me, Yes we are warming up with the problem now

> **We need a reliable way to run containers in a datacenter with various clustered hosts**

### What do you mean ?

A picture is worth a 1000 words.

![Megam docker](/content/images/2015/08/megam_baremetal_docker.png)


To do that we need schedulers that can orchestarte and compose containers. We use the term micro service and containers in an interchangeable way, they both mean the same.

### Containers orchestrated by schedulers

Lets look at the orchestration for *on premise* baremetal cloud.

In a unanimous way most companies choose

<table border="1">
    <tr>
         <td bgcolor="#ffc107">Who</td>
         <td bgcolor="#ffc107">Link</td>
         <td bgcolor="#ffc107">Orchestrator</td>
    </tr>
    <tr>
        <td>Openshift</td>
        <td><a href="https://wiki.openstack.org/wiki/Docker" target="_blank">Origin</a></td>
        <td>Kubernetes</td>
    </tr>
    <tr>
        <td>Techtonic</td>
        <td><a href="https://tectonic.com/blog/announcing-tectonic/" target="_blank">Techtonic - CoreOS</a></td>
        <td>Kubernetes</td>
    </tr>
    <tr>
        <td>Cloudify</td>
        <td><a href="https://getcloudify.org" target="_blank">Cloudify</a></td>
        <td>Don't know</td>
    </tr>
    <tr>
        <td>Docker</td>
        <td><a href="https://docs.docker.com/compose/" target="_blank">Docker compose</a></td>
        <td>Fig (Docker compose)</td>
    </tr>
     <tr>
        <td>Rancher</td>
        <td><a href="https://rancher.io" target="_blank">Rancher</a></td>
        <td>Don't know</td>
    </tr>
    <tr>
        <td>Panamax by centurylink</td>
        <td><a href="https://panamax.io" target="_blank">Panamax</a></td>
        <td>Kubernetes</td>
    </tr>
    <tr>
        <td>Cloudfoundry</td>
        <td><a href="https://github.com/cloudfoundry-incubator/garden" target="_blank">Garden</a></td>
        <td>Don't know</td>
    </tr>
</table>

Most vendor use the containter orchestration using **Docker compose [fig]** or **Kubernetes**.

Well at [Megam](https://github.com/megamsy) as seen from the picture we have own omni scheduler built using [golang](http://golang.org)

<table border="1">
    <tr>
         <td bgcolor="#ffc107">Who</td>
         <td bgcolor="#ffc107">Link</td>
         <td bgcolor="#ffc107">Orchestrator</td>
    </tr>
    <tr>
        <td>Megam</td>
        <td><a href="https://github.com/megamsys/megamd.git" target="_blank">megamd</a></td>
        <td>Megam</td>
    </tr>
</table>

----

## Diving into the problem

> **We need a reliable way to run containers in a datacenter with various clustered hosts**

### [Docker swarm](https://docs.docker.com/swarm/)

We started looking at [docker swarm](https://docs.docker.com/swarm/), it sounded so sweat that you can have run *swarm* and just join new docker engine into our "dockercluster" on the go as your datacenter nodes expand.

###No we were plain WRONG.


Why ? Since if you visit our architecture, we had **docker engines** running in bunch of servers, and a swarm cluster being formed. The **swarm master** will talk to all the **docker engines** and provision containers on bare metal in a load balanced way in all the hosts.

`Eg:`

* As a developer0 lets say i submitted the first container from [our public beta developer edition - console.megam.io](https://console.megam.io] - Oh yeah you have an [onpremise edition](http://docs.megam.io/docs/what-is-megam-cloud-platform-do)  from a marketplace
* Similarly developer1 - developer2 submit concurrently to the swarm cluster
* swarm needs to spread and schedule/load balance the containers on all the hosts equally.

Whereas the current swarm is broken by having a mutex lock to a variable that just waits until the first container that you  submitted is complete.

In the essence it becomes like a serial operation to submit containers.

We poked the code high, and found this in the code as fixed here [megamsys/swarm](https://github.com/megamsys/swarm). This may be left intentionally as docker intends to support [Apache mesos](mesos.apache.org)

    // CreateContainer aka schedule a brand new container  into the cluster.
    func (c *Cluster) CreateContainer(config *cluster.ContainerConfig, name string) (*cluster.Container, error) {
	    //*MEGAM* https://www.megam.io remove the mutex scheduler lock
        //c.scheduler.Lock()
	    //defer c.scheduler.Unlock()


{<2>}![Code fix](/content/images/2015/07/megam_baremetal_docker-1.png)

Once we fixed the above code and packaged swarm, it worked like a charm.

We believe Docker doesn't want to open up its default scheduler but force people to use Mesos. We at Megam are allegic to Java (JVM) as it bloats too much memory and we use judicially.

[Setup and give it a try](http://docs.megam.io).
