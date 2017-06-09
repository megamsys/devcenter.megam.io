---
title: "Setting up OpenVPN Server"
layout: post
author: "saravanan"
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: "How to launch OpenVPN in vm "
---


### Introduction

Want to access the Internet safely and securely from your smartphone or laptop when connected to an untrusted network. A Virtual Private Network (VPN) allows you to traverse untrusted networks privately and securely as if you were on a private network. The traffic emerges from the VPN server and continues its journey to the destination.
When combined with HTTPS connections, this setup allows you to secure your wireless logins and transactions.
OpenVPN is a full-featured open source Secure Socket Layer (SSL) VPN solution that accommodates a wide range of configurations. This tutorial will keep the installation and configuration steps as simple as possible.
[![img](https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png)](https://docs.megam.io/installation/prequisites/)

### Prerequisites

To follow this tutorial :

* you will need access to an Ubuntu 16.04 server.

### Step 1 - Install OpenVPN

* To start off we need to install OpenVPN on our server

$ sudo apt-get update
$ sudo apt-get install openvpn easy-rsa

### Step 2: Set Up the CA Directory

* OpenVPN is an TLS/SSL VPN. So it utilizes certificates in order to encrypt traffic between the server and clients. In order to issue trusted certificates, we will need to set up our own simple certificate authority (CA).

 $ make-cadir ~/openvpn-ca

* Move into the newly created directory to begin configuring the CA.

 $ cd ~/openvpn-ca

### Step 3: Configure the CA Variables
* To configure the values our CA will use, we need to edit the vars file within the directory. Open that file now in your text editor.

 $ nano vars

* You will find some variables that can be adjusted to determine how your certificates will be created. Towards the bottom of the file, find the settings that set field defaults for new certificates.

. . .

export KEY_COUNTRY="US"
export KEY_PROVINCE="CA"
export KEY_CITY="SanFrancisco"
export KEY_ORG="Fort-Funston"
export KEY_EMAIL="me@myhost.mydomain"
export KEY_OU="MyOrganizationalUnit"

. . .

* Edit the variables do not left them blank.

* we should also edit the KEY_NAME value just below this section, which populates the subject field. To keep this simple, we'll call it server in this guide:

 export KEY_NAME="server"

 * When you are finished, save and close the file.

### Step 4: Build the Certificate Authority

* We can use the variables we set and the easy-rsa utilities to build our certificate authority. Ensure you are in your CA directory, and then source the vars file you just edited.

 $ cd ~/openvpn-ca
 $ source vars

* You should see the following if it was sourced correctly.

Output
NOTE: If you run ./clean-all, I will be doing a rm -rf on /openvpn-ca/keys

* Make sure we're operating in a clean environment by typing.

 $ ./clean-all

 * Now, we can build our root CA by typing.

  $ ./build-ca

* It will initiate the process of creating the root certificate authority key and certificate. Since we filled out the vars file, all of the values should be populated automatically. Just press ENTER through the prompts to confirm the selections.

Output
Generating a 2048 bit RSA private key
..........................................................................................+++
...............................+++
writing new private key to 'ca.key'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [IN]:
State or Province Name (full name) [TN]:
Locality Name (eg, city) [Chennai]:
Organization Name (eg, company) [Megam systems]:
Organizational Unit Name (eg, section) [Community]:
Common Name (eg, your name or your server's hostname) [Megam]:
Name [server]:
Email Address [admin@email.com]:

* We now have a CA that can be used to create the rest of the files we need.

### Step 5: Create the Server Certificate, Key, and Encryption Files

* Next, we will generate our server certificate and key pair, as well as some additional files used during the encryption process.

* Note: If you choose a name other than server here, you will have to adjust some of the instructions below. For instance, when copying the generated files to the /etc/openvpn directroy, you will have to substitute the correct names. You will also have to modify the /etc/openvpn/server.conf file later to point to the correct .crt and .key files.

* To start generating the OpenVPN server certificate and key pair. We can do this by typing.

  $ ./build-key-server server

* Once again, it prompts for default values based on the argument we just passed in (server) and the contents of our vars file we sourced. Accept the default values by pressing ENTER. Do not enter a challenge password for this setup. At the end, you will have to enter y to two questions to sign and commit the certificate:

Output
. . .

Certificate is to be certified until May  1 17:51:16 2026 GMT (3650 days)
Sign the certificate? [y/n]:y


1 out of 1 certificate requests certified, commit? [y/n]y
Write out database with 1 new entries
Data Base Updated

* Next, we'll generate a few other items. We can generate a strong Diffie-Hellman keys to use during key exchange by typing.

$ ./build-dh

* we can generate an HMAC signature to strengthen the server's TLS integrity verification capabilities.

$ openvpn --genkey --secret keys/ta.key

### Step 6: Generate a Client Certificate and Key Pair

* Next, we can generate a client certificate and key pair. Although this can be done on the client machine and then signed by the server/CA for security purposes, for this guide we will generate the signed key on the server for the sake of simplicity.

* We will generate a single client key/certificate for this guide, but if you have more than one client, you can repeat this process as many times as you'd like. Pass in a unique value to the script for each client.

* To produce credentials without a password, to aid in automated connections, use the build-key command.

$ cd ~/openvpn-ca
$ source vars
$ ./build-key client1

* If you wish to create a password-protected set of credentials, use the build-key-pass command.

$ cd ~/openvpn-ca
$ source vars
$ ./build-key-pass client1

* Again, the defaults should be populated, so you can just hit ENTER to continue. Leave the challenge password blank and make sure to enter y for the prompts that ask whether to sign and commit the certificate.

### Conclusion

These are the steps to configure the OpenVPN in a server. Now you access the Internet safely and securely from your computer or laptop when connected to an untrusted network.
