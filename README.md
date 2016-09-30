# devcenter.megam.io

staticgen  for devcenter. https://devcenter.megam.io

This is our devcenter where we share technical tips and articles from TeamMegam/Community.

Anyone can send a pullrequest.

## TeamMegam

There are 3 steps

- Step 1: Fork this repo
- Step 2: Local test
- Step 3: Push the changes


#Step 1: Lets fork.

##1. Fork & Clone this repo.

```

$ git clone https://github.com/<id>/devcenter.megam.io

```

#Step 2: Local test

Install hexo

```
sudo  npm install -g hexo-cli

```
Add your new technical doc as markup to your master.

```
hexo new "__your_blog_title_here_"

```

Go to _sources directory, and edit the .md files.

```

hexo server

```

Verify if your post looks good.

http://localhost:4000


#Step 3: Deploying your documentation

Push your master.

```

git push master


```

Send us a pull request.

When the pull request gets merged, devcenter will be refreshed automagically.

#LICENSE

MIT
