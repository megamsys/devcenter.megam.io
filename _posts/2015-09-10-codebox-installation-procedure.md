---
title: Codebox Running Procedure
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Codebox Running Procedure
---

The Codebox IDE helps to create powerful development environments in the cloud with a collaborative, online/offline IDE for your collaborators and your teams.This component is available as an open source project (built with web technologies) on GitHub or Stay updated on Twitter. Let we see the installation procedure.

###### Fork the codebox.git from your github id.
For that logging in github then enter into codebox.git. In right side top corner you can find 'Fork' option. Click on that.

###### Clone the codebox.git into your github id.


	git clone https://github.com/megamsys/codebox.git

###### Change the directory to codebox.


	cd codebox

###### Install npm software to access codebox dependency files


	npm install

###### Install gulp globally


	npm install gulp -g

###### Build the codebox with the help of installed gulp.


	gulp build

###### Create directories codebox and packages under home directory.


	mkdir /home/megam/.codebox
	mkdir /home/megam/.codebox/packages

###### Set node path


 	export NODE_PATH=/home/megam/.codebox/packages

###### Run codebox


	node ./bin/codebox.js -p 3000 -u admin:admin run ~/code/megam/workspace/

Here I run this code box IDE in the port 3000. As per your wish you can set the port and username and password. This is an example to install & run the codebox IDE.
I have the contents of codebox in the directory code/megam/workspace/. In the same way you can run the codebox IDE using the path where you stored.
