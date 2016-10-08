---
title: Install Ruby 2.2.2
slug: megam_install_ruby
date_published: 2015-03-03T11:30:18.267Z
date_updated:   2016-02-15T10:44:20.856Z
tags: ruby
---

We recommend you install *git*, *curl* before you get started.

In Ubuntu

	sudo apt-get install git curl
    
#Pre-reqs

Make your current non-root user as a sudoer. To do so, write a file /etc/sudoers.d/USERNAME
	
    USERNAME  ALL = (root) NOPASSWD:ALL
    
Make it as only readable
	
    $ chmod 0440 /etc/sudoers.d/USERNAME
    
`NOTE` Please avoid using superuser(root) from here. Run all the below commands as `USERNAME`

#Install RVM

RVM is a command-line tool which allows you to easily install, manage, and work with multiple ruby environments from interpreters to sets of gems. 

If your current `.gnupg/` folder is in root permission, then change the permission to `USERNAME` with the command `sudo chown -R USERNAME:USERNAME ~/.gnupg/`

	$ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3

	$ \curl -sSL -ip4 https://get.rvm.io | bash -s stable

to run rvm from anywhere

	$ source ~/.rvm/scripts/rvm

Once you have rvm installed, go ahead and  install ruby 2.2.2


	$ rvm install ruby-2.2.2


This will download and install and setup ruby for ya. !

set the installed ruby as default

	$ rvm use ruby-2.2.2 --default

## Using Ruby

	$ rvm list
    
	rvm rubies

	=\* ruby-2.2.2 [ x86_64 ]

	=> - current
	=* - current && default
	 * - default  ``

##Ruby on Rails
If you wish to work on a ruby on rails project like [Nilavu](https://github.com/megamsys/nilavu.git)

its quite simple.

	$ git clone https://github.com/megamsys/nilavu.git

	$ cd nilavu

	$ bundle update

	$ bundle install

	$ rails s


Voila! we covered installing ruby and using it to run a RoR application. 

You can use **[Megam - Cloud Management](https://www.megam.io)** to launch a Ruby on Rails App in minutes.. 


