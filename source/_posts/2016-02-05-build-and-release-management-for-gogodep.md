---
title: Build and release management for go(godep)
slug: build-and-release-management-for-gogodep
date_published: 2016-02-05T05:51:16.879Z
date_updated:   2016-02-05T05:51:16.877Z
---

##Introduction
If you are using 3rd party packages, (packages that you don't own or control), you will want a way to create a reproducible build every time you build your projects. If you use 3rd party packages directly and the package authors change things, your projects could break. Even if things don't break, code changes could create inconsistent behavior and bugs.

>**godep tool is a great step in the right direction for managing 3rd party dependencies and creating reproducible builds.**

####Downloading Godep
Download godep using go get and make sure your $GOPATH/bin directory is in your PATH.

	go get github.com/tools/godep
	export PATH=$PATH:$GOPATH/bin
    
####How Godep Works
A **godep save** command will copy all imported packages in their entirety from your current **GOPATH** into a vendored workspace folder in **./Godeps/_workspace**. A list of those packages will be stored with relevant version information in a master file, **Godeps/Godeps.json**. This is done not just for the packages your project directly imports but also for any imported by your dependencies.

Using Godep is as simple as prepending your normal Go commands like go test or go build with the godep command. This uses a temporarily extended **GOPATH** which prioritizes the Godep vendor directory.

>saves your GOPATH to the Godep folder 
>
	$ godep save ./…  

>builds using the Godep vendored dependencies
>
	$ godep go build ./…   

>tests using the Godep vendored dependencies
>
	$ godep go test ./…


From here, should you apply a change to your **GOPATH**, your project will be isolated.

>update a dependency
>
	go get -u github.com/golang/protobuf/…
   
>build using standard GOPATH
>
	$ go build ./…                         

>build using Godep vendored version
>
	$ godep go build ./…     
    
    
####godep update versus godep save
**godep update** takes a specific dependency package and updates the vendored instance of that package with the version in your **GOPATH**. This will update files with changes, add new files, remove old ones, and update the version SHA listed in the **Godeps.json** file.

	$ go get -u github.com/golang/protobuf/…
	$ godep update github.com/golang/protobuf/…
    
This will not add or remove sub-packages from dependency management, nor will it update any other dependencies recursively. Only previously imported packages are listed in the **Godeps.json** file and only those listed are updated.

Updating the entire package will update any references to sub-packages; however no new packages will be added, nor old ones removed. Similarly, if your dependency update is dependent upon another change elsewhere in your dependency stack, you may run into issues. **godep update** only touches the packages listed in Godeps.json, which match the provided package pattern.

In contrast, **godep save** applies the entire relevant GOPATH to the Godeps folder and will add/remove packages as needed. Because it’s based off of your **GOPATH, godep save** can also check for build errors and non-clean repositories before applying changes, enforcing dependency cohesion.

Given the dangers of using **godep update** (missing packages and dependencies), it’s much safer to use **godep save**. The only situation where it’s safe to use godep update are when both of these conditions are satisfied:

>No dependencies of your target dependency need to be updated.

>No imports were added to or removed from your target dependency.

If the dependency is external to your organization, it can be difficult to determine what changes are taking place, so it is safer to never use **godep update** on anything third-party.

####When to Use Godep
Not every project may require the broad dependency control as provided by Godep.

Unlike import path-based vendoring, Godep vendors the entire set of dependencies regardless of a specific desire to version them. This does mean that no dependencies will ever be updated unless explicitly altered, first through **GOPATH** and then through Godep.

Should your organization have a large number of common dependencies across different projects, you may want to look into using a forked dependency model. Godep provides a locally controlled, customizable dependency management system. When used with care, this system can support highly versioned and reproducible builds, especially in change resistive environments with few shared dependencies.


