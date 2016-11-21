---
title: How to use Oauth in ROR
layout: post
author: rajthilak
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: How to use Oauth in ROR
---
I hate signing up for websites. I’ve already signed up for so many, using different usernames, that going back to one of them and trying to remember my credentials is sometimes impossible. These days, most sites have begun offering alternative ways to sign up, by allowing you to use your Facebook, Twitter or even your Google account. Creating such an integration sometimes feels like a long task. But fear not, Oauth is here to help.

In this tutorial, i’m going to explain how to integrate these authentication providers into your Rails app. Here i use “omniauth” gem. Because Omniauth allows you to easily integrate more than sixty authentication providers, including Facebook, Google, Twitter and GitHub.

#### Step 1: Preparing your Appllication

Let’s create a new Rails application and add the necessary gems. I’m going to assume you’ve already installed Ruby on Rails 4.0 or latest using RubyGems.

Run this command in your terminal

`rails new omniauth-tutorial`

Now open your Gemfile and reference the omniauth gem.

`gem 'omniauth'`

Next, per usual, run the bundle install command to install the gem.

#### Step 2: Creating a Provider

In order to add a provider to Omniauth, you will need to sign up as a developer on the provider’s site. Once you’ve signed up, you’ll be given two strings (sort of like a username and a password), that needs to be passed on to Omniauth.

#### Step 3: Add your Providers to the App

Create a new file under config/initializers called **omniauth.rb**. We’re going to configure our authentication providers through this file.

Paste the following code into the file we created earlier

	Rails.application.config.middleware.use OmniAuth::Builder do
 		provider << provider >>,
        Rails.configuration.<< provider >>_client_id,
    	Rails.configuration.<< provider >>_secret_key ,
        << options >>
	end

For example use the google provider then use the following

	Rails.application.config.middleware.use OmniAuth::Builder do
 		provider :google_oauth2,
    	Rails.configuration.google_client_id,
    	Rails.configuration.google_secret_key , { :scope =>
    	"userinfo.profile, userinfo.email, devstorage.full_control,
    	compute", :prompt => 'consent'}
	end

####Step 4: Creating the Login Page

Let’s create our sessions controller. Run the following code in your terminal to create a new sessions controller.

`rails generate controller sessions`

And add some actions in your controller.
Next, open your **config/routes.rb** file and add this

	get   '/login', :to => 'sessions#new', :as => :login
	match '/auth/:provider/callback', :to => 'sessions#create'

Let’s break this down:

The first line is used to create a simple login form where the user will see a simple `Connect with Provider` link.
The second line is to catch the provider’s callback. After a user authorizes your app, the provider redirects the user to this url, so we can make use of their data.

Open your app/controllers/sessions_controller.rb file and write the create method, like so

	def create
      auth_hash = request.env['omniauth.auth']
      render :text => auth_hash.inspect
	end

This is used to make sure everything is working. Point your browser to [localhost:3000/auth/provider](http://) and you’ll be redirected to provider page so you can authorize your app. Authorize it, and you will be redirected back to your app and see a hash with some information.

####Step 5: Creating the User Model

In the Rails console (rails console), create the new model.

`rails generate model User name:string email:string`

 For now, our user model will only have a name and an email. With that out of the way, we need a way to recognize the user the next time they log in.

####Step 6: Adding create action on controller

Let’s add some code to our sessions controller so that it logs a user in or signs them up, depending on the case. Open **app/controllers/sessions_controller.rb** and modify the create method, like so:

	def create
 	 auth_hash = request.env['omniauth.auth']
 	 user_identity = User.find_by_email(auth_hash["info"] ["email"])
 	if user_identity
       render :text => "Welcome back #{user_identity.user.name}! You have already signed up."
 	else
       user = User.new :name => auth_hash["info"]["name"], :email => auth_hash["info"]["email"]
       user.save
       render :text => "Hi #{user.name}! You've signed up."
 	end
	end

We check whether an authorization exists for that provider and that email. If one exists, we welcome our user back.

If no authorization exists, we sign the user up. We create a new user with the name and email that the provider gives us, and we associate an authorization with the provider.
Give it a test! Go to [localhost:3000/auth/provider](http://) and you should see “You’ve signed up”. If you refresh the page, you should now see “Welcome back”.

####Step 7: Create html

Open `app/views/sessions/new.html.erb` and add

	<%= link_to "Connect", "/auth/<< provider >>" %>
