---
title: How to launch SDK for C/C++/Python in MegamVertice
author: ranjitha
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: How to launch SDK for C/C++/Python in MegamVertice
---

#### Introduction
  A software development kit (SDK or "devkit") is typically a set of software development tools that allows the creation of applications for a certain software package, software framework, hardware platform, computer system, operating system, or similar development platform.
  To create applications, you have to download a specific software development kit.

 This tutorial will set up launching sdk using c/c++, python.

 <a href="https://docs.megam.io/installation/prequisites/" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png" alt="wordpres button" /></a>

#### Prerequisites

* You are running Ubuntu 14.04 or Linux workstation.

* Git is installed on your server, which you can do by following the [How To Install Git with Apt.](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-14-04)

* You have an account on GitHub, which is a Git repository host.

* You have to create a valid credential for accessing [docs.megam.io](https://docs.megam.io/overview/tour/). [How to create an account with MegamVertice](https://devcenter.megam.io/getting-started-in-megamvertice-open-source-cloud-hosting)


You have to install openssh-server for ssh access.

     sudo apt-get install openssh-server

To check the ssh is properly installed in our system

     ps aux | grep sshd

#### Launch SDK using c/c++

This initial section contains everything you need to get c/c++ running on your server.

* First, ensure the user can login to [docs.megam.io](https://docs.megam.io/overview/tour/).

* Go to the Market Places, click the C/C++.

* Select the SDK option

* You can create new sshkey or use an existing sshkey or upload your own sshkeys too.

* Click the Create button. it will launch the C/C++ SDK.

#### Step - 1  C/C++ SDK
Next, Go to your  Dashboard. Click the domain name of C/C++ SDK which opens a new window.

* It contains the CPU, RAM and NETWORK tab.

* It shows the Metrics, VM Logs, IP address and SSH URL.

* Metrics shows the CPU,RAM and NETWORK usage.

* You need to access the Virtual Machine from a terminal.

* You can download the SSH Keys from SSH Keys tab or Overview page. Use this key to login to your virtual machine using the following command,


         ssh -i path to/example@email.com_os_key root@<ipaddress>

#### Step - 2 Running C program

 In the VM gcc 4.9 version in installed. To test it, create a file in **hello.c**

 open a file to write a hello world program in c,

      #include <stdio.h>
      main()
      {
      printf("hello World");
      }

Compile the program

    gcc-4.9 hello.c -o hello
 Run the program

    ./hello


#### Step - 3 Running C++ program  

  In the VM g++ 4.9 version is installed. To test it, create a file in **hello.cc**.

  open a file to write a hello world program in c++,

    #include<iostream>
    using namespace std;
    main()
    {
    cout<<"hello world";
    }

 Compile the program

    g++-4.9 hello.cc -o hello
 Run the program

    ./hello




#### Launch SDK for Python

This initial section contains everything you need to get Python and running on your server.

* First, ensure the user to login our websites.

* Go to the Market Places to click the Python apps.

* Select the SDK option

* You can create a new sshkey, use an existing sshkey or import your own sshkeys too.

* Click the create button. it will launch the Python app.

#### Step - 1  Access the Python SDK
Next, Go to the Dashboard.click the domain name of python app and open a new window.

* It contains the CPU, RAM and NETWORK tab.

* It shows the Metrics, VM Logs, IP address and SSH URL.

* Metrics shows the CPU,RAM and NETWORK usage.

* VM Logs shows all the running process in VM.

* You need to access the Virtual Machine from a terminal.

* You can download the SSH Keys from SSH Keys tab or Overview page. Use this key to login to your virtual machine using the following command,


         ssh -i path to/example@email.com_os_key root@<ipaddress>

#### Step - 2 Running a python program

 After ssh into vm, check python version

      python --version

 Create a file in hello.py.

 open a file to Write a hello world program

      #! /usr/bin/python
      print 'hello world!'

Change the file permission into a file

    chmod 755 hello.py

 Run the program

    ./hello.py


#### Conclusion

These are the very simple steps to launch SDK  using C/C++/Python.

#### Deploy your C/C++/Python SDK now

<a href="https://docs.megam.io/installation/prequisites/"target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png " alt="wordpres button" />
