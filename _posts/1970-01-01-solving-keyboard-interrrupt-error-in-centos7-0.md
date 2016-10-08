---

title: Solving keyboard interrupt error in CentOS7.0
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Solving keyboard interrupt error in CentOS7.0
---

# Introduction

  when we launched the vm by using image centos7.0. In vm , I tried to install the git  **yum install git** that keyboard interrupt error is raised on the screen.To solve this error, first we install deltarpm package.

   Delta RPM packages contain the difference between an old and a new version of an RPM package. This means the whole new RPM does not have to be downloaded saving bandwidth.

To use delta RPMs install the deltarpm package

            yum install deltarpm
            yum provides ‘*/applydeltarpm’

 next we go to update this package

            yum update

 Finally install git ,

            yum install git

  Now the git installed successfully.The keyboard interrupt error is solved.
