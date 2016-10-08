---
title: Building your own VM Image (Dockerfile for VMs)
slug: creating-customized-images
date_published: 1970-01-01T00:00:00.000Z
date_updated:   2016-07-01T05:13:42.859Z
draft: true
---

##Introduction
  
   Lets the system have installed centos operating system.In my purpose, when preparing an OpenNebula installation is the creation of Virtual Machine images for base Operating Systems or appliances.
   
   Some of these images can be downloaded from the marketplace but you may need an OS that is not in the marketplace or the images must be customized in some other way. 
   
   Now i am going to describe an automated way to customize the base images.It provided by linux distribution using software tool libguestfs.

####Libguestfs
  This tool can be used to create and modify the virtual machine images in number of format that qemu understands.Some of these utilities let us add or delete files inside the images or execute scripts using the image filesystem as root.
    
  To install libguestfs,
  
       
       yum install libguestfs-tools
   
#####Base image

 Next step download the base Isoimage like ubuntu 
 
   wget http://cloud-images.ubuntu.com/releases/14.04/release/ubuntu-14.04-server-cloudimg-amd64-disk1.img


####Install Onecontext
  One of the customizations we have to do to this image is uninstall the cloud-init package that comes by default with that image and install OpenNebula context package. 
  
    wget https://github.com/OpenNebula/addon-context-linux/releases/download/v4.14.4/one-context_4.14.4.rpm
    
    
  To create the CDROM image we can use genisoimage. Remember to add a label so it’s easier to mount. Here we are going to use the label PACKAGES:

i) Copy the onecontext packages to a directory, for example packages 

ii) Execute genisoimage to create the iso that contains those files:

    $ genisoimage -o packages.iso -R -J -V PACKAGES packages/
    
    
  Now we need to prepare a script with the customizations to be done in the image. For example:
  
    
    
    
    mount LABEL=PACKAGES /mnt

    # Install opennebula context package
     apt-get install -y unzip
     unzip /mnt/v4.14.4*zip
     
    # Install growpart and upgrade util-linux, used for filesystem resizing
    apt-get install -y epel-release --nogpgcheck
    apt-get install -y cloud-utils-growpart --nogpgcheck
    apt-get upgrade -y util-linux --nogpgcheck
    
    #nginx install
     apt-get -y update
    apt-get install -y nginx
    ceph_user="megam"
    ceph_password="1234pass"
    ceph_group="megam"
    user_home="/home/megam"
    if ! getent group $ceph_group > /dev/null 2>&1;  then
    groupadd --system $ceph_group
    fi
    if ! getent passwd $ceph_user > /dev/null 2>&1; then
    useradd -d $user_home -m -g $ceph_group $ceph_user -s /bin/bash
        #Set passwordsudo echo -e "$ceph_password\n$ceph_password\n" | sudo passwd $ceph_user
    else
       user_home=`getent passwd $ceph_user | cut -f6 -d:`

    # Renable user (give him a shell)
    usermod --shell /bin/bash $ceph_user
    # Make sure MEGAMHOME exists, might have been removed on previous purge
    mkdir -p $user_home
    fi


Instead of modifying the original image downloaded we can use a feature of qcow2 image that is creating a new image that is based on another one.
 
 To copy the image from original image
 
    $ qemu-img create -f qcow2 -b ubuntu-14.04-server-cloudimg-amd64-disk1.img ubuntu.qcow2
    
  Now all is prepared to customize the image. The command we are going to use is virt-customize.
  
  It can do a lot of modifications to the image but we are only going to do two. The command is this one:  
  
    virt-customize -v -x --attach packages.iso --format qcow2 -a ubuntu.qcow2 --run script.sh --root-password password:centos
    
   It attaches two images, the iso image with the packages and the OS hard disk, executes script.sh
   
   After the command is run the image centos.qcow2 contains the modifications we did to the original image. 
   
   Now we can convert it to any other format we need (for example vmdk) or to a full qcow2 image, that it, does not depend on any other one. 
   
     qemu-img convert -f qcow2 -O qcow2 -o compat=0.10 ubuntu.qcow2 ubuntu-final.qcow2
     
    qemu-img convert -f qcow2 -O vmdk ubuntu.qcow2 ubuntu-final.vmdk
    
 
