---
title: "Setting up OpenVPN Clients"
layout: post
author: "saravanan"
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: "How to launch OpenVPN Client "
---


### Introduction

A Virtual Private Network (VPN) allows you to traverse untrusted networks privately and securely as if you were on a private network. The traffic emerges from the VPN server and continues its journey to the destination.

When combined with HTTPS connections, this setup allows you to secure your wireless logins and transactions.
OpenVPN is a full-featured open source Secure Socket Layer (SSL) VPN solution that accommodates a wide range of configurations.

 This tutorial will keep the installation and configuration steps as simple as possible.

[![img](https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png)](https://docs.megam.io/installation/prequisites/)

### Prerequisites

To follow this tutorial :

* you will Ubuntu 16.04 in your computer.


 ### Step 1: Install the Client Configuration

* The OpenVPN connection will be called whatever you named the .ovpn file. In our example, this means that the connection will be called client1.ovpn for the first client file we generated.

* On Ubuntu or Debian, you can install it just as you did on the server by typing.

      client$ sudo apt-get update
      client$ sudo apt-get install openvpn

* On CentOS you can enable the EPEL repositories and then install it by typing.

      client$  sudo yum install epel-release
      client$  sudo yum install openvpn

* Configuring

* Check to see if your distribution includes a /etc/openvpn/update-resolv-conf script.

      client$ ls /etc/openvpn

      Output
      update-resolve-conf

* Next, edit the OpenVPN client configuration file you transfered.

      client$ nano client1.ovpn

Uncomment the three lines we placed in to adjust the DNS settings if you were able to find an update-resolv-conf file

      script-security 2
      up /etc/openvpn/update-resolv-conf
      down /etc/openvpn/update-resolv-conf

* Save and close the file.

* Now, you can connect to the VPN by just pointing the openvpn command to the client configuration file:

      client$ sudo openvpn --config client1.ovpn

* This should connect you to your server.

### Step 2: Test Your VPN Connection

* Once everything is installed, a simple check confirms everything is working properly. Without having a VPN connection enabled, open a browser and go to DNSLeakTest.

* The site will return the IP address assigned by your internet service provider and as you appear to the rest of the world. To check your DNS settings through the same website, click on Extended Test and it will tell you which DNS servers you are using.

* Now connect the OpenVPN client to your Droplet's VPN and refresh the browser. The completely different IP address of your VPN server should now appear. That is now how you appear to the world. Again, DNSLeakTest's Extended Test will check your DNS settings and confirm you are now using the DNS resolvers pushed by your VPN.

### Conclusion

These are the steps to configure the OpenVPN in a client. Now you access the Internet safely and securely from your computer or laptop when connected to an untrusted network.
