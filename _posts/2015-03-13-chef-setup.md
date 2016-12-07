---
title: Chef-Setup
layout: post
author: thomas
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Chef-Setup
---
Chef is a configuration management and automation platform from [Opscode](https://www.chef.io/). Chef helps you describe your infrastructure with code. Because your infrastructure is managed with code, it can be automated, tested and reproduced with ease.

Assumption: Ruby installed

# Server Installation
The Chef server acts as a hub for configuration data. The Chef server stores cookbooks, the policies that are applied to nodes, and metadata that describes each registered node that is being managed by the chef-client. Nodes use the chef-client to ask the Chef server for configuration details, such as recipes, templates, and file distributions. The chef-client then does as much of the configuration work as possible on the nodes themselves (and not on the Chef server). This scalable approach distributes the configuration effort throughout the organization.

Download chef-server package from here [http://downloads.chef.io/chef-server/](http://downloads.chef.io/chef-server/)

	$ wget https://web-dl.packagecloud.io/chef/stable/packages/ubuntu/trusty/chef-server-core_12.0.1-1_amd64.deb

This will download the installation package that you can then install like this:

	$ sudo apt-get update
    $ dpkg -i chef-server-core_12.0.1-1_amd64.deb

This will install the server component on the machine.
It prints to the screen afterwards that you should run this next command to actually configure the service around your specific machine. This will configure everything automatically:

	$ sudo chef-server-ctl reconfigure

Verify chef-server installation by entering this command

	$ sudo chef-server-ctl test

Once this step is complete, the server should be up and running. You can access the web interface immediately by typing https:// followed by your server's domain name or IP address.

	https://server_domain_or_IP


Because the SSL certificates were signed by an authority that your browser does not recognize by default, you will see a warning message appear.
Click the "Proceed anyway" button to bypass this screen and access the login screen.

The default login credentials are as follows:

	Default Username: admin
	Default Password: p@ssw0rd1


## Workstation Installation

Install chef using rubygems

	$ gem install chef

We should setup a file structure that will help us organise our various Chef files. Opscode, the makers of Chef provide one. They call it simply the Chef Repository.

	$ wget http://github.com/opscode/chef-repo/tarball/master
	$ tar -zxf master
	$ mv opscode-chef-repo* chef-repo
	$ rm master
If we look inside the chef-repo directory we can see the following:

	$ cd chef-repo/
	$ ls
    config  cookbooks  data_bags  environments  nodes  Rakefile  README.md  roles


We can use the command [knife](https://docs.chef.io/knife.html) to help us manage our cookbooks. First we should tell knife where to find our cookbooks directory.

	$ mkdir chef-repo/.chef

download /etc/chef-server/chef-validator.pem and  /etc/chef-server/admin.pem from chef-server to this chef-repo/.chef

Edit chef-repo/.chef/knife.rb

    log_level                :info
    log_location             STDOUT
    node_name                admin
    client_key               'chef-repo/.chef/admin.pem'
    validation_client_name   'chef-validator'
    validation_key           'chef-repo/.chef/chef-    validator.pem'
    chef_server_url            'https://server_domain_or_IP'
    cache_type               'BasicFile'
    cookbook_path [ 'chef-repo/cookbooks' ]


Thats all :-)
chef-setup is over.

Now you can check it from workstation with the below commands

    knife client list
    knife node list
