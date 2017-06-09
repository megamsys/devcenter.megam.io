---
title: "Part 2- Setting up OpenVPN Clients"
layout: post
author: "saravanan"
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: "How to setup OpenVPN Client "
---

### Introduction

OpenVPN is based on a client/server architecture. It must be installed on both VPN extremities, one is designated as server the other one as client.

 This tutorial will help to install and configure a **OpenVPN client**.

[![img](https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png)](https://docs.megam.io/installation/prequisites/)

### Prerequisites

To follow this tutorial :

* You will need Ubuntu 16.04 in your server that is designated as `OpenVPN client` in the below discussion.

* You have successfully finished [Part 1: Setting up OpenVPN Server](https://devcenter.megam.io/setting-up-openvpn-server) and have the credentials to be shared with the client machine.

* In our case we will use the credentials stored [here](https://drive.google.com/drive/folders/0Bw_s_Yta3cY8OGtObDNJNmpJbHM).

### Step 1: Install the OpenVPN

* On Ubuntu or Debian, you can install it by typing.

      $ sudo apt-get update
      $ sudo apt-get install openvpn

* Check to see if your distribution includes a `/etc/openvpn/update-resolv-conf` script.

      $ ls /etc/openvpn           
      update-resolve-conf

### Step 2: Send configuration files from your local into OpenVPN client

If you have the copy of `client.tar.xz` received via email, then untar it in your local machine.

Let us send those files into your `OpenVPN client`. These instruction are valid for a linux environment.

      local $ sftp user@openvpn_client_ip:client-configs/files/client1.ovpn ~/
      local $ sftp user@openvpn_client_ip:openvpn-ca/keys/ca.crt ~/
      local $ sftp user@openvpn_client_ip:openvpn-ca/keys/client.key ~/
      local $ sftp user@openvpn_client_ip:openvpn-ca/keys/client.crt ~/

### Step 3: SSH  from your local into OpenVPN client

* Now, let us establish a private tunnel between `OpenVPN client` and your server.

Run the command in `OpenVPN client`:

      client$ sudo openvpn --config /etc/openvpn/client1.ovpn

* This should connect you to your OpenVPN server. Please don't exit out of this window.

### Step 4: Test Your VPN Connection

* Now connect your local laptop as `OpenVPN client` by doing Step 2, 3. We now have the following.

![](/res/images/openvpn_client.png)

* Check your local laptop connected which is connected into `OpenVPM server`. Open a terminal and type `ifconfig tun0 `. It will show the OpenVPN bridge details.

      4: tun0: <POINTOPOINT,MULTICAST,NOARP,UP,LOWER_UP> mtu 1500 qdisc noqueue state UNKNOWN group default qlen 100
      link/none
      inet 10.8.0.1 peer 10.8.0.2/32 scope global tun0
      valid_lft forever preferred_lft forever

Now our local laptop and `OpenVPN server` are connected via private ipaddress. You can `SSH` using the private ip and your credentials of the `OpenVPN server`.

### Conclusion

These are the steps to configure the OpenVPN as a client. Now you access the Internet safely and securely from your computer or laptop when connected to an untrusted network.
