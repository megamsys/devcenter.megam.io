---
title: Getting more native, welcome scyllaDB
layout: post
author: rajthilak
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Getting more native, welcome scyllaDB
---
Is it not an uncommon fact that cassandra is the defacto NoSQL database that is being used in the bigdata world at the moment. It is known for its ease and performance, and the constant push that is being given by DataStax in building the community. But there is this new kid in town, a very powerful kid, he is like one of those kids from spykids. Yes, scyllaDB

Scylla is an open source NoSQL database which is apache cassandra compatible with performance 10x more than cassandra. scylla has been giving out promising results so far with very low latency.

Currently in the 0.16 version, and the GA coming out very soon, this is going to be really interesting to see how this works for a lot of bigdata usecases.

In this blog post we will focus on how to setup scylla and how the data modelling works. If you are already a cassandra expert, just head over to the google forums which is very active and ask your queries. But the documentation does not cover for a non-cassandra folks  and I am hoping this will be helpful for those people in particular.

#### 1. Setting it up:

This article [here](http://www.scylladb.com/doc/getting-started-ubuntu/) gives the steps in downloading and setting it up.

Few things to note is, all the configuration setups and changes should be done in the yaml file which is in `/var/lib/conf/scylla.yml'

**Note: make sure you add `SCYLLA_ARGS="--developer-mode true"` in your `scylla-server` file, it will by default look for XFS file system and we need ext**

Once you install scylla-server and scylla-jmx,

    nodetool status

 And it will display,

     Datacenter: datacenter1
     =======================
    Status=Up/Down
    |/ State=Normal/Leaving/Joining/Moving
    --  Address       Load       Tokens  Owns    Host ID                               Rack
    UN  103.56.92.54  211.48 KB  256     ?       6c78937a-2d1f-4dfa-ad47-98405fbd2eff  rack1

    Note: Non-system keyspaces don't have the same replication settings, effective ownership information is meaningless


* Change `listen_address` to public IP like the above example

* Make sure you change the `rpc_address` if you want to communicate through the CQL native protocol remotely. Other wise you will get the `NoHostAvailableException`.

* Change the `api_address` to the public ip to access the REST API server.(This is really cool and one of the reasons I really like riak)

You have the db all set, it is up and running.

####2. Cassandra compatibility - cqlsh

Scylla has got good cassandra compatibility and there is a healthy set of driver support as well. ([Driver status](https://github.com/scylladb/scylla/wiki/Driver-Status))

To get the CQL shell, type `cqlsh` 	in your shell.


######1. Creating a keyspace

    CREATE KEYSPACE musiclibrary WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1 };

This creates a keyspace(database in RDBMS world) .

**Note: Use RDBMS to compare only upto a point until you understand the data modelling concepts. For designing complex data models, it is good to grasp the cassandra-scylla way of thinking.**

    USE "musiclibrary";
    CREATE TABLE rockmusic(
                band text,
                genre text,
                era int,
                PRIMARY KEY (era)
                );


   This creates a table called rockmusic.Let us now insert data

      INSERT INTO rockmusic(band, genre, era) values ('rolling stones', 'rocknroll', 1960);

      INSERT INTO rockmusic(band, genre, era) values ('beatles', 'britpop', 1960);

      INSERT INTO TABLE rockmusic(band, genre, era) values ('thewho', 'rock', 1960);

Thats it. Just do a `select * from rockmusic` and it will print it out. You can also set multiple primary key and do a Key -> Key -> Value search.

In the next article we will briefly look at data modelling in scyllaDB, we will look at

* ColumnFamily & SuperColumnFamily
* How to use [phantom](https://github.com/websudos/phantom) the scala-java driver.
* Using apache spark with scyllaDB

Thats it for now.
