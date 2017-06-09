---
title: "Part 2- Setting up OpenVPN Clients"
layout: post
author: "saravanan"
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: "How to setup OpenVPN Client "
---

### Introduction

OpenVPN is based on a client/server architecture. It must be installed on both VPN extremities, one is designated as server the other one as client.

 This tutorial will help to install and configuration steps done in the client.

[![img](https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png)](https://docs.megam.io/installation/prequisites/)

### Prerequisites

To follow this tutorial :

* You will Ubuntu 16.04 in your computer.

* For the server credentials contact our administration team(https://drive.google.com/drive/folders/0Bw_s_Yta3cY8OGtObDNJNmpJbHM).

### Step 1: Install the Client Configuration

* The OpenVPN connection will be called whatever you named the .ovpn file. In our example, this means that the connection will be called client1.ovpn for the first client file we generated.

* On Ubuntu or Debian, you can install it just as you did on the server by typing.

      $ sudo apt-get update
      $ sudo apt-get install openvpn

* Check to see if your distribution includes a /etc/openvpn/update-resolv-conf script.

      client$ ls /etc/openvpn
      Output:
      update-resolve-conf

### Step 2: Send client configuration files from OpenVPN server into client

      local $ sftp user@openvpn_server_ip:client-configs/files/client1.ovpn ~/
      local $ sftp user@openvpn_server_ip:openvpn-ca/keys/ca.crt ~/
      local $ sftp user@openvpn_server_ip:openvpn-ca/keys/client.key ~/
      local $ sftp user@openvpn_server_ip:openvpn-ca/keys/client.crt ~/

* Now, you can connect to the VPN by just pointing the openvpn command to the client configuration file:

      client$ sudo openvpn --config client1.ovpn

* This should connect you to your OpenVPN server.

### Step 3: Test Your VPN Connection

* Check your local machine connected into server. Open a terminal and type `ifconfig tun0 `. It will shows OpenVPN bridge details. Now our local machine and server was connected via private ipaddress. You can `SSH` using your credentials.

      4: tun0: <POINTOPOINT,MULTICAST,NOARP,UP,LOWER_UP> mtu 1500 qdisc noqueue state UNKNOWN group default qlen 100
      link/none
      inet 10.8.0.1 peer 10.8.0.2/32 scope global tun0
      valid_lft forever preferred_lft forever

### Conclusion

These are the steps to configure the OpenVPN in a client. Now you access the Internet safely and securely from your computer or laptop when connected to an untrusted network.
