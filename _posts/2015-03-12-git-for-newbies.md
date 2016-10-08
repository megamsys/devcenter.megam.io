---
title: Git for Newbies,made easy!
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Git for Newbies,made easy!
---


#### Wondering what Git and Github are all about? Well,firstly:

## Git and GitHub- What is the difference?

>**Git** is a **version control system**; think of it as a series of snapshots(commits) of your code. You see a *path of these snapshots*, in which order they where created. You can make *branches to experiment* and come back to snapshots you took.

>**GitHub**, is a **web-page** on which you can **publish** your **Git repositories** and **collaborate** with **other people**.It is the best place to *share code* with friends, co-workers, classmates, and complete strangers. Did you know that over **eight million people use GitHub to build amazing things together?!**(Now that's something to read about,eh?)


Now let's get started! Now that you know what is the difference between Git and Github,let us go ahead and set up your Git tool. It's a simple 4 step process.(Piece of cake,really!)

#### How to setup Git tool:
##### STEP 1:
>http://git-scm.com/downloads.

>**Download the latest version of Git** from the link mentioned above.

##### STEP 2:
>On your computer, **open terminal**.
##### STEP 3:
>Now, you need to **tell Git your name** so your commits will be properly labeled. Type the following:

>>`$ git config --global user.name  “Your name”`

##### STEP 4:
>**Tell Git the email address** that will be associated with your Git commits. Type:

>>`$ git config --global user.mail  “Your mail”`

Now that you've got **your Git tool is setup.** Let's proceed. What next?
FIRST THINGS FIRST!!
###### How do you create a Repository?
>**Create a new directory** , open it and **type**

  >>`$git init`

>to create a new repository.(This is on your terminal ofcourse).


**Next.**

###### HOW DO YOU FORK A REPOSITORY?
>**Hang on.**

>**Fork?! What's a fork?**

>**A fork is a copy of a repository.** Forking a repository allows you to freely experiment with changes without affecting the original project.                                                                      Most commonly, forks are used to either **propose changes to someone else's project** or to **use someone else's project as a starting point for your own idea.**
A great example of using forks to propose changes is for **bug fixes**. Rather than logging an issue for a bug you've found, **you can:**
**1.Fork the repository.**

>**2.Make the fix.**

>**3.Submit a pull request to the project owner.**
If the project owner likes your work, they might pull your fix into the original repository!
At the heart of open source is the idea that by sharing code, we can make better, more reliable software.
In fact, when you create a repository on GitHub, you have a choice of automatically including a license file, which determines how you want your project to be shared with others.

###### STEPS TO FORK A REPOSITORY:

>1.On GitHub, **navigate to the repository** that you want to **fork**.

>2.
In the **top-right corner of the page**, click **“FORK”**.
*Now you have a fork of the original repository!*
>
You might fork a project in order to propose changes to the upstream, or original, repository. In this case, it's good practice to regularly sync your fork with the upstream repository.

So, right now, you have a fork of the repository that you want to make changes to, but you don't have the files in that repository on your computer!So, **let's create a clone of your fork locally on your computer.**
###### HOW DO YOU CREATE A CLONE OF A REPOSITORY ON YOUR OWN COMPUTER?

**There are two ways to clone a repository in GitHub.**

>**1.Using HTTPS:**

>To clone using HTTPS, type:

>>`$  git clone path/to/repository`

>**2.Using SSH:**

>To clone using SSH, type:





>>`$  git clone username@host:path/to/repository`

###### STEPS TO CREATE A CLONE:
>1.On GitHub, **navigate to your fork** of the repository you just forked.

>2.In the **right sidebar** of your fork's repository page, click the button with an arrow, below the **“HTTP CLONE URL”** to copy the clone URL for your fork.

>3.**Open Terminal** (for Mac and Linux users) **or the command line** (for Windows users).

>4.**Type** the following:

  >>`$ git clone https://github.com/YOUR-USERNAME/REPOSITORY-NAME`

>5.**Press enter** and your clone will be created.
Now, **you have a local copy of your fork of your
repository!**

When you fork a project in order to propose changes to the original repository, you can configure Git to pull changes from the original, or upstream, repository into the local clone of your fork.
###### How do you configure Git to sync your fork with the original repository?
>1.Repeat the steps above to create a clone(as mentioned above^).

>2.**Change directories** to the location of the fork you cloned in

 >3.**Type** the following:
		>>`$ git remote -v`

>4.**Press Enter.**

>You'll see the current configured remote repository for your fork.

>5.Type :
	>>`$ git remote add upstream`

>Type the URL you copied and press Enter.

>7.To verify the new upstream repository you've specified for your fork, type
>>`git remote -v`

>again. You should see the URL for your fork as origin,
and the URL for the original repository as upstream.

**So now that's done.**
**What do you do next?**
###### CREATING BRANCHES:
>Branches allow you to **build new features** or **test out ideas without putting your main project at risk**.
###### OPENING PULL REQUESTS:
>If you are hoping to contribute back to the original repository, you can **send a request to the original author to pull your fork** into their repository by submitting a pull request.

**Every public repository can be forked, so find a project you're interested in and get forking!**

Yayy,done!It may look a bit daunting in the beginning but once you get a hang of it, it gets really simple.
**GO AHEAD AND GIVE IT A TRY!**
