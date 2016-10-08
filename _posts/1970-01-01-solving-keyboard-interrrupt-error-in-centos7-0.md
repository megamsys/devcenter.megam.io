---
title: Solving keyboard interrupt error in CentOS7.0
slug: solving-keyboard-interrrupt-error-in-centos7-0
date_published: 1970-01-01T00:00:00.000Z
date_updated:   2016-07-01T05:12:21.691Z
draft: true
---

#Introduction
     
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
  
           
           
          
