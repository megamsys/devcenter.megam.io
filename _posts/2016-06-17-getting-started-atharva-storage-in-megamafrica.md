---
title: Getting started Atharva storage in MegamVertice
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Getting started Atharva storage in MegamVertice
---

### Introduction
**Atharva Storage** - MegamVertice is a "Cloud object storage, low latency and (S3 - AWS Signature v2) compatible API  built on top of ceph - jewel.".

This tutorial will guide you creating atharva storage  in MegamVertice.
<a href="https://docs.megam.io/installation/prequisites/" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png" alt="wordpres button" /></a>

### Prerequisites

* You have to create a valid credential for accessing https://console.megamafrica.com. [How to create an account with MegamVertice](http://devcenter.megam.io/2016/05/27/how-to-launch-ubuntu/).

### Create Atharva storage in MegamVertice

* First, ensure the user can login to https://console.megamafrica.com.

* Upon successful signin, look for the icon
![](/content/images/2016/06/storage-1.jpg)
 at the top right hand corner named `Storage`
![](/content/images/2016/06/atharva-1.jpg)

* Click the `create storage` box. A window will pop up and ask for Bucket Name. You can type a name for the bucket.

* Bucket is successfully created and also its created the `access-key` and `secret-key` for your account.

* You can see your Access-key and Secret-key from your profile page in MegamVertice (https://console.megamafrica.com).
![](/content/images/2016/06/storage-keys.jpg)

* Now, You can upload a files in `Atharva Storage` using your Access-key and Secret-key.

* Upload a files using windows and ubuntu using following guide.

[How to upload a files from windows to MegamVertice](http://devcenter.megam.io/2016/06/16/atharva-ceph-windows/).

[How to deploy private docker registry in MegamVertice](http://devcenter.megam.io/2016/06/10/private-registry-along-with-ceph/).

* Let us verify if the files is uploaded

Logon https://console.megamafrica.com goto `storage` place. You can see your bucket, and the uploaded files are displayed.

### Conclusion

These are the very simple steps to create an atharva storage in MegamVertice. MegamVertice website contain lot of feature - very easy to launch Virtual Machines, Apps, Services,and providing atharva storage in MegamVertice.

###### Deploy a Atharva storage now

<a href="https://docs.megam.io/installation/prequisites/" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png" alt="wordpres button" /></a>
