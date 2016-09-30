---
title: How to contribute to a Git Repository
slug: how-to-contribute-to-a-git-repository
date_published: 2015-03-14T10:20:13.813Z
date_updated:   2015-03-14T10:20:15.177Z
---

Now that you know the little gists on creating a forking and cloning a repository,let's move on and learn about how to contribute to a Git repository.
**A great way to get involved in open source is to contribute to the existing projects you’re using. GitHub is home to more than 5 million open source projects.**
Say you want to contribute changes to someone else’s repository? 
**You must first fork the repository.** We have seen all about Forking a repository in our previous post.
so,moving on.
**Next,send a pull request.**
What is a pull request?

######PULL REQUESTS:

>Pull requests let you tell others about changes you've pushed to a repository on GitHub. Once a pull request is sent, interested parties can review the set of changes, discuss potential modifications, and even push follow-up commits if necessary.

Ah, now that's interesting. Wondering how do you initiate one?
It's easy. Follow these steps.
######Initiating a Pull Request:
>>1.Navigate to your repository with the changes you want someone else to pull and press the Pull Request button. 

>>2.Switch to your branch.

>>3.Click the Compare & review button.

>Pull requests can be sent from any branch or commit but it's recommended that a topic branch be used so that follow-up commits can be pushed to update the pull request if necessary.


Now..what is this **branch?**
###### WHAT IS A BRANCH?

>-**Branches allow you to build new features or test out ideas without putting your main project at risk.**

>-The **main branch of a repository is usually named master**, and represents a relatively stable version of the project you're working on. So far, all the changes you've made have been on the master branch.

>-If you're making an app or website, for example, you might have a bunch of different features or ideas in progress at any given time – some of which are ready to go, and others which are not. For this reason, master exists as a central point to fold other branches of work into.
######How to create a branch:
Branch management is an important part of the Git workflow. You can manage branches directly on GitHub.
>You can create a new branch in a repository's branch selector menu. Just start typing the name of your branch; if it doesn't exist, GitHub will offer to create it for you.
 
######Reviewing the pull request :
>After starting the review, you're presented with a review page where you can get a **high-level overview of what exactly has changed between your branch and the repository's master branch.** You can review all comments made on commits, identify which files changed, and get a list of contributors to your branch.

######Changing the branch range and destination repository :
>-By default, pull requests are assumed to be based on the parent repository's default branch. In many cases, the defaults are appropriate. If necessary, you can change the parent repository and branch with the drop-down lists. Clicking on Edit at the top allows you to swap between your head and base, as well as establishing differences between various reference points. References here must be branch names in your GitHub repositor

>-The easiest way of thinking about the branch range is this: the **base branch is where you think changes should be applied**, the **head branch is what you would like to be applied.**

>-**Changing the base repository changes who is notified of the pull request.** Everyone that can push to the base repository will receive an email notification and see the new pull request in their dashboard the next time they sign in.

>-When you change any of the info in the branch range, the commit and files changed preview areas will update to show your new range.

######SENDING THE PULL REQUEST :
######STEPS:
>>**STEP 1:**When you're ready to submit your pull request, click **Create pull request**.

>>**STEP 2:** You'll be taken to a discussion page where you can **enter a title and optional description.** You'll still be able to see exactly which commits will be included when the pull request is sent.

>>**STEP 3:**Once you've entered the title and description, made any necessary customizations to the commit range, and reviewed the commits and file changes to be sent, **press the Create pull request button.**

>>**STEP 4:** The pull request is sent immediately. **You're taken to the main pull request discussion and review page.**

>After your pull request is sent, any new commits pushed to your branch will automatically be added to the pull request. This is especially useful if you need to make more changes.
######MANAGING PULL REQUESTS :
>-All pull requests sent or received by you are browsable through the **pull request dashboard.** Pull requests for a specific repository are also browsable by anyone with access by visiting the **Pull Requests page.**

>-The pull request dashboard and the repository pull request list support a **wide range of filtering and sorting controls.** Use them to narrow down the list to the pull requests you're interested in.

#######REVIEWING PROPOSED CHANGES :
>-**When you receive a pull request, the first thing to do is review the set of proposed changes.** Pull requests are tightly integrated with the underlying git repository, so **you can see exactly what commits would be merged should the request be accepted**.

>-You can also review the cumulative differences of all file changes across all commits, either split or unified.

######MERGING A PULL REQUEST:
>-**Merge a pull request into the upstream branch when work is completed.** Anyone with push access to the repository can complete the merge.
>-If you decide **you don't want the changes in your branch to be merged to the upstream branch, you can also close the pull request without merging.**

#######MERGING A PULL REQUEST USING THE GITHUB WEB INTERFACE :
>-If the merge will not have any conflicts, you can merge the pull request online. Follow these steps:

>>**STEP 1:** In any repository's right sidebar, **click Pull Requests.**

>>**STEP 2:** In the **"Pull Requests" list**, *click the pull request you'd like to merge.*

>>**STEP 3:** Click **Merge pull request.**

>>**STEP 4:** **Type a commit message**, or accept the default message.

>>**STEP 5:** Under the commit message box, click Confirm merge.
>
Optionally, delete the branch. This keeps the list of branches in your repository tidy.

######Reverting a pull request :
**You can revert a pull request after it's been merged to the upstream branch.**

>**Reverting a pull request on GitHub creates a new pull request** that contains one revert of the merge commit from the original merged pull request.
Follow these steps to revert a pull request:

>>**STEP 1:** In your repository's right sidebar, **click Pull Requests.**

>>**STEP 2:** In the **"Pull Requests" list**, *click the pull request you'd like to revert.*

>>**STEP 3:** *Near the bottom of the pull request*, **click Revert.**

>>**STEP 4:** Merge the resulting pull request. 

######Closing a pull request
**You may choose to close a pull request without merging it into the upstream branch.**
This can be handy if the changes proposed in the branch are no longer needed, or if another solution has been proposed in another branch.
Follow these steps to close a pull request:

>**STEP 1:**In any repository's right sidebar, click Pull Requests.

>**STEP 2:**In the **"Pull Requests" list**, *click the pull request you'd like to close.*

>**STEP 3:**At the **bottom of the pull request**, below the comment box, **click Close pull request.**
Optionally, delete the branch. This keeps the list of branches in your repository tidy.

You can also choose to delete the delete unwanted branches.

######DELETING UNUSED BRANCHES:

>-**After you merge or close a pull request, you can delete the branch.** This keeps the list of branches for your repository as clean and useful as possible.

>-At the **bottom of a merged or closed pull request, you’ll see a button to delete the lingering branch**

>-You can also **delete branches from the Branches page.**
 
 **Easy,eh?
 Go ahead and get forking!**







