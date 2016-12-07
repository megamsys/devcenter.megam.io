---
title: Package Upgrading in Trusty
author: vijayakanth
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Package Upgrading in Trusty
---
 Upgrading is new versioning of an existing model that add or modify the modules of an already defined package. Here we upgrading the Ubuntu Trusty to a newer version.


**Upgrading**

"fpm" is used for package management that build backage.

the fpm command is resides in a file

Syntax for fpm

 fpm -s <source type> -t <target type> [options]

the option will deciede our package configuration

Options:

     -t OUTPUT_TYPE
     the type of package you want to create (deb, rpm, solaris, etc)
    -s INPUT_TYPE
    the package type to use as input (gem, rpm,python, etc)


 Check the Dependencies of upgrading version is it compactable with newer version.

  	-d, --depends DEPENDENCY
    A dependency. This flag can be specified multiple times. Value is usually in the form of: -d 'name' or -d 'name > version'

for example Ubuntu Trusty supports with ruby version 2.0, but the Ubuntu Jessie supports with ruby version 2.1. so we have to change of all dependencies.

then add the  beforeupgrade and afterupdgrade process script file.

 	--after-upgrade FILE  -->

    A script to be run after package upgrade. If not specified, --before-install, --after-install, --before-remove, and --after-remove wil behave in a backwards-compatible manner(they will not be upgrade-case aware).

    --before-upgrade FILE  -->

    A script to be run before package upgrade. If not specified, --before-install, --after-install, --before-remove, and --after-remove wil behave in a backwards-compatible manner (they will not be upgrade-case aware).


      Currently only supports deb and rpm packages.

the FILE contains the script for the pre upgrade and post upgrade configuration.

before upgrade script does what are the processes to be perform before upgrading the package.

before upgrading we have to ask to the user whether he/she continue with the existing configuration settings or change the new configuration settings.

If he allows to new configuration settings we have to copy the new configuration setting file to appropriate location.

for example the pre upgrade file has the blow scripts


	#!/bin/sh
	count="0";
	t="3";
	while [ "$count" -ne "$t" ];
	 do
	  count=`expr $count + 1`
	  echo -n "Do u want to continue the set new configuration file  [Y/N] :"
  	read x
  		if [ $x = y ]; then
   	cp /your conf file path/conf-file  /var/lib//conf-file
	   echo "new configureation file copied...."
	   break
	  fi
  	if [ "$count" -eq "3" ]; then
     	echo "more than three attempt,so it keep the old configuration file"
     	break
  	else
    	 echo "enter valid input "
  	fi
	done

after upgrade script does what are the processes to be perform after upgrading the package.

 after upgrading start your service .

 	systemctl enable servicefile.service
	systemctl start servicefile.service
