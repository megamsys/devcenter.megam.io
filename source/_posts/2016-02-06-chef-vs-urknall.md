---
title: Chef vs Urknall
slug: chef-vs-urknall
date_published: 2016-02-06T15:10:34.662Z
date_updated:   2016-02-06T15:10:35.993Z
---

####An Introduction to Urknall 

Urknall is Go based automation provising tools for the administration of complex infrastructure developed in Golang. Agentless tool that only relies on common UNIX tools and provides decent caching.

It provides template machanisms that helps us to reuseablity and Urknall provides some basic templates, but lets users modify those or add new ones to solve the specific problem at hand.


It provides the benefits of a compiler, helping to catch bugs early and making refactoring easy and single binary infrastructure management tools, having no dependencies.

Urknall library part of urknall provides the core mechanisms to execute commands on a remote host.

 It provides four kind of interfaces to handle the commands. Commands in the sense of shell commands.

#####About Urknall machanisms 

  	Commands Interface  -  to run shell commands on target  
    
 	Logger Interface    - to simplify the logging outputs, to track commands which is executed.
    
	Renderer Interface   - to use it’s properties in the command strings using go’s templating. 
    
	Validator Interface  - to do more complex validations 

 	Packages - Packages are an strictly internal data-structure.
    
	Tasks - Tasks are ordered collections of commands.
    
	Templates -  to define the list of tasks that should be performed during provisioning.
    
	Targets - where the commands are executed on remote host or local
    
		Remote Target - uses SSH to connect to the remote machine 
		Local Target - to provision the local host.
		Sudo Without Password - it is required that the user is allowed sudo without password. this done by 
        
	echo "username ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/90-nopassword


#####Urknall binary


   Urknall binary helps managing projects that use the library. While the urknall library provides the handling of targets, tasks and caching.
   
   Its fully integrated with libraries i.e. the implementations of some basic commands and templates were part of the library itself.
   
   we can change the templates directly, but have to move the according code to our project manually. 
   
######Chef vs Urknall
     **Urknall**
		Ties users to Golang.
		Helping to catch bugs early and making refactoring easy.
		Urknall supports for Linux.
		Easy to learn and deploy. 
		Go is more flexible to use both YAML and JSON
        No need any dependecies 
        
 	**Chef**
		Ties users to Ruby.
		Larger community, with a large collection of modules and configuration recipes.
		Full support for Linux, Unix, Windows.
		Not as easy to learn and deploy. and Documentation still needs a lot of work.
		Relies on JSON which is not as friendly as YAML.


   
   
