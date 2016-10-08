---
title: "Playing with configuration in Go lang"
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: "Playing with configuration in Go lang"
---

# Application configuration
> A config file is a reasonable way to maintain different environments such as development and production.

For most applications configuration includes logging levels, port bindings, and database settings. These settings are typically stored in environment variables, for example:

	 export MEGAM_HOME="/var/lib/megam"
 	export MEGAM_HOST="megam.io"
	 export MEGAM_PASSWORD="password"

 Once set I can read configuration values from the command line like this:

 	$ echo $MEGAM_HOME
 	/var/lib/megam

It’s equally as easy to access environment variables in Go using the os package:

	package main

	import (
    	"fmt"
    	"os"
	)

	func main() {
    	home := os.Getenv("MEGAM_HOME")
    	fmt.Printf("Megam home is set to: %v\n", home)
	}

The biggest drawback to storing configuration in the environment is that you can only store string values; it’s up to you to convert these strings into values that can be used by your application.

>**It is highly recommended that we go for configuration files instead of storing our configuration settings using environment variables.**

sample conf yaml file:

	MEGAM_HOME: /var/lib/megam
    riak:
 	 url: localhost:8087
 	 bucket: accounts

>######How to use this conf file in our go application ?
>tsuru/config is one of way to parse and use conf file in go application

# tsuru/config Introduction
Config is a Go package to manage yaml configuration files.

For usage information, read tsuru package documentation: http://godoc.org/github.com/tsuru/config.

## Usage

	import "github.com/tsuru/config"

Package config provide configuration facilities, handling configuration files in yaml format.

### Get values
To get values from conf file use following code in your application

	s, err := config.GetString("conf_string")

It gets the string value from conf file.

some examples:

>conf file:
>
	MEGAM_HOME: /var/lib/megam
    riak:
 	 url: localhost:8087
 	 bucket: accounts

First we get "MEGAM_HOME"

	home, err := config.GetString("MEGAM_HOME")
    if err != nil {
    	fmt.Printf("Megam home getting error: %v\n", err)
    }
    fmt.Printf("Megam home is set to: %v\n", home)

Second we get riak url from file

	url, err := config.GetString("riak:url")
    if err != nil {
    	fmt.Printf("getting error: %v\n", err)
    }
    fmt.Printf("Riak url is set to: %v\n", url)

To get subdivision of key then used **":"** in between the keys.

> ###supported formats
>
* func GetBool(key string) (bool, error)
* func GetDuration(key string) (time.Duration, error)
* func GetFloat(key string) (float64, error)
* func GetInt(key string) (int, error)
* func GetList(key string) ([]string, error)
* func GetString(key string) (string, error)
* func GetUint(key string) (uint, error)

### conclusion
Hopefully this article has hightlighted the steps in using configuration files in a go project
