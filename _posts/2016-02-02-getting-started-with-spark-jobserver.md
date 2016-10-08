---
title: Getting started with spark-jobserver
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Getting started with spark-jobserver
---

[Spark-jobserver](https://github.com/spark-jobserver/spark-jobserver) is a really cool RESTful interface for submitting and managing Apache Spark jobs, jars, and job contexts. At [megam](http://www.megam.io) our analytics platform [Meglytics](http://www.meglytics.com) is powered by apache spark and we leverage spark-jobserver to execute spark jobs. This blog post we will see how to get started with apache spark jobserver. Before we go ahead, a big thanks to the Ooyala folks for making the spark-jobserver opensource.
Lets get started.

***Note: Make sure you have spark installed locally***

### 1. Running spark-jobserver
For sanity check...

     $sudo apt-get update


 Now clone the [spark-jobserver] project

      $git clone https://github.com/spark-jobserver/spark-jobserver

 To run it,

      $export VER=`sbt version | tail -1 | cut -f2`
      >reStart

 Your dev setup is done, fire up your browser and point it to `localhost:8090` and you can see a not-so-quagmire kinda UI.

*Note: For proper deployment you can find the conf and scripts [here](https://github.com/spark-jobserver/spark-jobserver/tree/master/job-server/config)*

### 2. Building and deploying a jar:

The fundamental steps in setting up and working in SJS is that,

* First build jar(like duh!) with your sparkContext(s) and you push it to SJS where your spark Master is also running(in our case, it is local).

* Then run the jar by providing the **classPath** and the **name** of the jar.

Let us look at the simple wordCount example for now to get all the missing pieces together.

cd into spark-jobserver and run this,

    sbt job-server-tests/package

 They are examples that you can find [here](https://github.com/spark-jobserver/spark-jobserver/tree/master/job-server-tests/src/spark.jobserver). Now your wordcount example is built. Lets push the jar to SJS `/jar` API

     curl --data-binary @job-server-tests/target/scala-2.10/job-server-tests.jar localhost:8090/jars/firsttest

### 3. Submitting a job:

Lets run it and get the output,

    curl -d "input.string = a b c a b see" 'localhost:8090/jobs?appName=test&classPath=spark.jobserver.WordCountExample'

We send a request to `/jobs` api with the `appName` and `classPath`. Upon every job submission SJS gives you an jobID `    "jobId": "5453779a-f004-45fc-a11d-a39dae0f9bf4"`

### 4. Getting the status of the job:

Call the `/jobs` api with the key to get the status/result and also the duration of your job.
Also, fire up the spark master UI to see the job getting exectuted.

    curl localhost:8090/jobs/5453779a-f004-45fc-a11d-a39dae0f9bf4

SJS is a really nice project which makes a ton easy to work with apache spark and the production cases looks promising aswell. There is also a gitter chat room where all the SJS folks hang out and solve any kind of queries.


Thats it for now. If I find time I will write about spark-jobserver in production and using sqlContext and dataframes with spark-jobserver.  Any questions regarding spark-jobserver comment below or shoot me an email.
