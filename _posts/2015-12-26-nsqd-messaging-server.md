---
title: NSQ messaging
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: NSQ messaging
---

[NSQd](https://nsdq.io) A reatime distributed light weight messaging platform.

We have used [RabbitMQ](https://www.rabbitmq.com) heavily in clustered mode. Lately we have found issues with file description(fd) limit getting reached even after bumping the `ulimit` or closing sockets after publishing in the queue.

We have tried single publisher to reuse socket connection but [RabbitMQ](https://www.rabbitmq.com) hangs periodically.

We set out to cleanup our code and hunt for a new pub sub guy.

No wonder several players in the cloud market invent their own queue system, choices like [nats](http://nats.io/) pioneered by [apcera](https://www.apcera.com), [zeromq](http://zeromq.org/), [nsq.io](https://nsqio) by [bit.ly](https://bit.ly)

We choose [nsq](nsq.io) for it distributed realtime platform with no single point of failure (SPOF), it has its own service discovery mechanism and its written in [golang](https://golang.org), has drivers for every language.

We wrote our own wrappers for [NSQ - scala](https://github.com/megamsys/megam_common.git) and [NSQ - golang by crackcom](https://github.com/crackcomm/nsqueue)

## Installation

This is pretty quick for your local setup

    $ wget https://s3.amazonaws.com/bitly-downloads/nsq/nsq-0.3.6.linux-amd64.go1.5.1.tar.gz


**Untar the tarball into ~/bin folder**
Upon untarring ensure that the ~/bin folder has all the files named *nsq_*

**Start the following daemons**

	$ nsqlookupd &

    $ nsqd --lookupd-tcp-address=127.0.0.1:4160

    $ nsqadmin --lookupd-http-address=127.0.0.1:4161

    $ curl -d 'hello world 1' 'http://127.0.0.1:4151/put?topic=test'

**Watch topic 'test'**

    $ nsq_to_tail --topic=test --lookupd-http-address=127.0.0.1:4161

**Dump topic 'test' in a file**

    $ nsq_to_file --topic=test --output-dir=/tmp --lookupd-http-address=127.0.0.1:4161

## Running nsq in production

Definitely clustering and adding more `nsqds` becomes a need using a service discovery mechanism.

We have built packages to handle them `megamnsqd`.

The topology we will use is a service discovery daemon `nsqlookupd` clustered using mutiple `nsqd`

## Machine 1
Do the due deligence by adding [get.megam.io](http://get.megam.io) repo.

     $ apt-get install megamnsqd

There are two services  `nsqd` and `nslookupd` we will use.  

At the end of the install the **services are not running**.

**A private ip shall be present in /var/lib/megam/env.sh named MEGAM_NSQLOOKUP_IP**

As you noticed from the above `nsqd` needs the `nsqlookupd's` ip addresss during clustering.

Start the daemons

	$ service start nslookupd

    $ service start nsqd

As a webui is optional, there is not upstart or systemd file for it.  

You can even run `nsqadmin` poiting to the `lookupd` address from  your local laptop.


    $ nsqadmin --lookupd-http-address=<MACHINE1_IP:4161>

Type [http://MACHINE1_IP:4171](http://MACHINE1_IP:4171) for the web ui.


## Machine 2
Do the due deligence by adding [get.megam.io](http://get.megam.io) repo.

     $ apt-get install megamnsqd

We will use only `nsqd` here

At the end of the install the **service isn't running** and needs manual start.

**A private ip shall be present in /var/lib/megam/env.sh named MEGAM_NSQLOOKUP_IP**

As you noticed from the above `nsqd` needs the `nsqlookupd's` ip addresses during clustering.

**Change the MEGAM_NSQLOOKUP_IP=MACHINE1_IP in /var/lib/megam/env.sh**

Start the daemon

    $ service start nsqd

As a webui is optional, there is not upstart or systemd file for it.


Type [http://MACHINE1_IP:4171](http://MACHINE1_IP:4171) for the web ui in your local machine.

You will see two machines in the UI.

You might see a line `ERR <number> IO Error EOF` in our  daemons `megamd` or `gulpd` then indicate that the readLoop in `go-nsq` detected an end of file, which can be safely ignored.

## Redudant nslookupd
This is something the `infra team` can investigate to scale and avoid SPOF for the service discovery mechanism.

The performance is sweet and pretty good.

The moral of the story is language virtual machines are a legacy (Erlang, Java ...) and nimble native daemons can be a bold/better choice for performance and scalability.
