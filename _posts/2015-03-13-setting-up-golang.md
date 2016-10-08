---
title: Setting up Golang
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Setting up Golang
---
### Introduction

Go, also commonly referred to as golang, is a programming language initially developed at Google in 2007 by `Robert Griesemer, Rob Pike, and Ken Thompson`.

>**Go** is:
>
• open source
>
• concurrent
>
• garbage-collected
>
• efficient
>
• scalable
>
• simple
>
• fun
>
• boring (to some)

[http://golang.org](http://golang.org)

#### Setup

There are many ways to configure the Go development environment on your computer, you can choose any one you like. But i suggest following ways.

###### Way 1 : Install Go Package

The golang Debian package may have already made its way into your Ubuntu distribution. Try this:

>`$ sudo apt-get install golang`

export the settings you’re gonna need to ~/.bashrc file:

>`$ export GOROOT=/usr/lib/go`
>
`$ export GOBIN=/usr/bin/go`


###### Way 2 : From Binary

Download [golang 1.4+ amd64 linux](https://storage.googleapis.com/golang/go1.4.2.linux-amd64.tar.gz),  create a `~/golang` directory, and untar into that directory.

>`$ mkdir ~/golang`
>
`$ cd ~/golang`
>
`$ wget https://storage.googleapis.com/golang/go1.4.2.linux-amd64.tar.gz`
>
`$ tar -xzf go1.4.2.linux-amd64.tar.gz`

Now setup Go binary path. Use the **$GOROOT** and **$PATH** environment variables. In order to make these variables persist through logins/reboots/etc, add the following lines to ~/.bashrc file:

>`$ export GOROOT=$HOME/golang/go`
>
`$ export PATH=$PATH:$GOROOT/bin`

###### Way 3 : From Source

Go will install to a directory named go. Change to the directory that will be its parent and make sure the go directory does not exist. Then clone the repository and check out the latest release tag:

>`$ git clone https://go.googlesource.com/go`
>
`$ cd go`
>
`$ git checkout go1.4.2`

(Optional) Switch to the master branch

If you intend to modify the go source code, and contribute your changes to the project, then move your repository off the release branch, and onto the master (development) branch. Otherwise, skip this step.

>`$ git checkout master`

To build the Go distribution, run

>`$ cd go/src`
>
`$ ./all.bash`

Finally set the environment variables on ~/.bashrc file

>`$ export GOROOT=$HOME/golang/go`
>
`$ export PATH=$PATH:$GOROOT/bin`

Test your installation

Try this,

>`$ go version`
>
go version go1.4.2 linux/amd64


#### Set up your work environment

###### Introducing workspaces

Your Go code is kept in a workspace. A workspace contains many source repositories (git, hg). The Go tool understands the layout of a workspace. You don't need a Makefile. A workspace is a directory hierarchy with three directories at its root:

>**src** contains Go source files organized into packages (one package per directory),
>
**pkg** contains package objects, and
>
**bin** contains executable commands.

The go tool builds source packages and installs the resulting binaries to the pkg and bin directories.

The src subdirectory typically contains multiple version control repositories (such as for Git or Mercurial) that track the development of one or more source packages.

To give you an idea of how a workspace looks in practice, here's an example:

	bin/
            hello                   # command executable
            outyet                  # command executable
	pkg/
            linux_amd64/
                    github.com/golang/example/
                            stringutil.a           # package object
	src/
            github.com/golang/example/
                    .git/             # Git repository metadata
                    hello/
                        hello.go      # command source
                    outyet/
                        main.go       # command source
                        main_test.go  # test source
                    stringutil/
                        reverse.go    # package source
                        reverse_test.go   # test source

This workspace contains one repository (example) comprising two commands (hello and outyet) and one library (stringutil).

A typical workspace would contain many source repositories containing many packages and commands. Most Go programmers keep all their Go source code and dependencies in a single workspace.

Go commands all rely on one important environment variable which is called `$GOPATH`. Notice that this is not the `$GOROOT` where Go is installed. This variable points to the workspace of Go in your computer.

###### The GOPATH environment variable

The GOPATH environment variable specifies the location of your workspace. It is likely the only environment variable you'll need to set when developing Go code.

To get started, create a workspace directory and set GOPATH accordingly. Your
workspace can be located wherever you like, but we'll use $HOME/go in this document.
Note that this must not be the same path as your Go installation.

>`$ mkdir $HOME/go`
>
`$ export GOPATH=$HOME/go`

For convenience, add the workspace's bin subdirectory to your PATH:

>`$ export PATH=$PATH:$GOPATH/bin`


###### Testing with Workspace

To compile and run a simple program, first choose a package path (we'll use github.com/user/hello) and create a corresponding package directory inside your workspace:

>`$ mkdir $GOPATH/src/github.com/user/hello`

Next, create a file named hello.go inside that directory, containing the following Go code.

	package main
	import "fmt"
	func main() {
    	fmt.Printf("Hello, world.\n")
	}

Now you can build and install that program with the go tool:

>`$ go install github.com/user/hello`

Note that you can run this command from anywhere on your system. The go tool finds the source code by looking for the **github.com/user/hello** package inside the workspace specified by GOPATH.

You can also omit the package path if you run go install from the package directory:

>`$ cd $GOPATH/src/github.com/user/hello`
>
`$ go install`

This command builds the hello command, producing an executable binary. It then installs that binary to the workspace's bin directory as hello (or, under Windows, hello.exe). In our example, that will be **$GOPATH/bin/hello**, which is **$HOME/go/bin/hello**.

The go tool will only print output when an error occurs, so if these commands produce no output they have executed successfully.

You can now run the program by typing its full path at the command line:

>`$ $GOPATH/bin/hello`
>
Hello, world.

If you see the "Hello, world" message then your Go installation is working
