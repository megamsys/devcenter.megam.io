---
title: Spark-Notebook For Developer
author: ranjitha
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Spark-Notebook For Developer
---

# Introduction
 Spark-notebook allows performing reproducible with scala,Apache Spark and more.
      This is achieved through an interactive web-based editor that can combine Scala code, SQL queries, Markup or even JavaScript in a collaborative manner.

The Spark is available out of the box, and is simply accessed by the variable sparkContext.Spark Notebook offers these capabilities to anybody who needs to play with data, leveraging not only Spark for all data manipulation, but also the Typesafe Reactive Platform, to offer unique power to the user.

# Installation
   To get debian package install spark-notebook

    wget https://s3.eu-central-1.amazonaws.com/spark-notebook/zip/spark-notebook-0.6.0-scala-2.10.4-spark-1.4.1-hadoop-1.0.4.zip

  Unzip the package in spark-notebook

    unzip spark-notebook-0.6.0-scala-2.10.4-spark-1.4.1-hadoop-1.0.4.zip

 To rename directory  spark-notebook-0.6.0-scala-2.10.4-spark-1.4.1-hadoop-1.0.4 into spark-notebook

    mv spark-notebook-0.6.0-scala-2.10.4-spark-1.4.1-hadoop-1.0.4 spark-notebook


#### Running Spark-notebook

  To run the spark-notebook cd into spark-notebook

    ./bin/spark-notebook

  When the server has been started, fire up your browser and point it to localhost:9000 and you'll see something similar to: Notebook list

  From there you can either:
  create a new notebook or
  launch an existing notebook.

  In UI, You can see the following menu **files**, **Running**, **clusters** and **New**. To create a new notebook click New option.

  Click cluster tab, to create spark cluster open in another window. To write a program in the cell and click Run button.
  For example in the cell

    In[]: import org.apache.spark._
          import org.apache.spark.SparkContext._
          import org.apache.spark.rdd._

 Click run button.You will see the output in the cell.

###### Advantages

  The construction of models on a full dataset, not just subsets

The generation of deployable products to Mesos clusters
The creation of Avro and Play/Akka HTTP powered web services that use the resulting dataset

The creation of repositories and indexes of the analyses and services
