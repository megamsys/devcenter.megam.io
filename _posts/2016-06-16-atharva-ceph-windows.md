---
title: Use Windows client  S3 Browser to connect with MegamVertice Storage (ceph)
layout: post
author: "rajesh"
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Use Windows client  S3 Browser to connect with MegamVertice Storage (ceph)
---

### Introduction

S3 Browser is a freeware Windows client for Amazon S3. Amazon S3 provides a simple web services interface that can be used to store and retrieve any amount of data, at any time, from anywhere on the web.


#### Introducing Atharva Storage - MegamVertice

**Atharva Storage** - MegamVertice is a "Cloud object storage, low latency and (S3 - AWS Signature v2) compatible API  built on top of ceph - jewel.".

Upon successful signin to [docs.megam.io](https://docs.megam.io/overview/tour/), look for the icon
![](/content/images/2016/06/storage-1.jpg)
 at the top right hand corner named `Storage`
![](/content/images/2016/06/atharva-1.jpg)


This tutorial will guide you in setting up a **S3 Browser windows client on your windows 7+/10 workstation** and connecting it to manage your atharva storage account in MegamVertice.
<a href="https://docs.megam.io/installation/prequisites/" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png" alt="wordpres button" /></a>

### Prerequisites

* You are running Windows 7 or later version. This was tested on Windows 10.

* You have to create a valid credential for accessing [docs.megam.io](https://docs.megam.io/overview/tour/). [How to create an account with MegamVertice](http://devcenter.megam.io/2016/05/27/how-to-launch-ubuntu/).

* You have to create an atharva storage account with MegamVertice. [How to create an atharva account with MegamVertice](http://devcenter.megam.io/2016/06/17/getting-started-atharva-storage-in-megamvertice/).


### Connecting  S3 Browser  with Atharva (Ceph object storage) MegamVertice

This initial section contains everything you need to setup S3 Browser windows native client on your server.

##### Step-1 Download S3 Browser for windows

* Go to this link. <a href="http://s3browser.com/" target="_blank">S3 browser</a>.

* Click `Download S3 Browser` in <a href="http://s3browser.com/" target="_blank">www.s3browser.com</a> to start your download.

* Right-click the download file and install it in your windows system.

###### Step-2 Create the storage setting with MegamVertice

* Open the S3 Browser.

* Click the `Accounts -> Create New Account` button in S3 browser. it will open the pop-up window.

* Choose `S3 Compatible Storage` as a storage type and specify REST endpoint as `88.198.139.81`.

* Enter the other details.

    	Account Name : Type a name for the account
		Access key
		Secret key

You can see your `Access-key` and `Secret-key` from your `profile page` in MegamVertice([docs.megam.io](https://docs.megam.io/overview/tour/))

* Click the Add new account button the account is created and  it display the bucket already created in megamvertice.

##### Step-3 Create new bucket

* Click the `Bucket -> Create New Bucket` button it will open the pop-up window.

* Ask for the bucket name, you can assign your bucket name.

* Click the  `Create new bucket` button the bucket it created.

##### Upload a file from S3 Browser to MegamVertice

* Click the Upload button.

* Choose the one or multiple files to upload/choose an upload folder if you want to upload a whole folder or whole drive.

![](/content/images/2016/06/upload-folder-button.png)

*  Select the files you want to upload or select the folder to upload. The upload process will begin. You can track the progress on the Tasks tab.

* Let us verify if the files is uploaded

Logon [docs.megam.io](https://docs.megam.io/overview/tour/) goto `storage` place. You can see your bucket, and the uploaded files are displayed.

### Conclusion

These are the very simple steps to create bucket and upload files using Windows native client using S3 Browser to Atharva - MegamVertice.

This is a good head-start for using S3 Browser & our Athava ceph based object storage in MegamVertice.

### Start uploading to our storage - MegamVertice

<a href="https://docs.megam.io/installation/prequisites/" target="_blank">
<img src="https://s3-ap-southeast-1.amazonaws.com/megampub/images/vertice/DEPLOY-TO-MEGAM-VERTICE-BIG.png" alt="wordpres button" /></a>
