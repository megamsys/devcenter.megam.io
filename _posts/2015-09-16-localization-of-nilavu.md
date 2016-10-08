---
title: Internationalization in Rails
slug: localization-of-nilavu
date_published: 2015-09-16T09:47:34.402Z
date_updated:   2015-09-16T09:47:34.400Z
---

####What is Internationalization?
Internationalization means adapting computer software to different languages, regional differences and technical requirements of a target market. Internationalization is the process of designing a software application so that it can potentially be adapted to various languages and regions without engineering changes. 

The process of "internationalization" usually means to abstract all strings and other locale specific bits (such as date or currency formats) out of your application. The process of "localization" means to provide translations and localized formats for these bits.

#####Setup the Rails Application for Internationalization

Rails adds all .rb and .yml files from the config/locales directory to your translations load path, automatically.

######Gemfile and Gemfile.lock setup



	#Gemfile
    	- gem "megam_api", "~> 0.65"
    #Gemfile.lock
    	- megam_api (0.65)
        + rails-i18n (4.0.4)
		+ i18n (~> 0.6)
		+ railties (~> 4.0)
        


######ApplicationController setup

You make a method in app/controllers/application_controller.rb for users to change their language and create a before_filter:

	before_filter :set_user_language
	
	  def set_user_language
	    I18n.locale= 'en'
	  end

######En.yml

The default en.yml locale in this directory contains a sample pair of translation strings:

	en:		 
   	hello: "Hello world"		   
    
Then the sample English language loaded en.yml locale directory is,

	signup:
	   title: "Sign up"
	   first_name_tag: "First Name"
       last_name_tag: "Last Name"
       phonenumber_tag: "Phone Number"
       email_tag: "Email"
       password_tag: "Password"
 	  login_here: "Login here"

And the reference in our view file (apps/views/index.html.erb):

	<%= t('signup.title') %></u>&nbsp;&nbsp; <a href="signin"><u class="colr-denimblue"><%= t('signup.login_here') %></u></a>
    
    
#####Conclusion    
  
Internalization now easy to convert any standard localized language through create new _.yml format file for required language.(Ex. ru.yml for Russian language)
