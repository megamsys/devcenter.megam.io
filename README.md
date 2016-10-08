# devcenter.megam.io

staticgen  for devcenter. https://devcenter.megam.io

This is our devcenter where we share technical tips and articles from TeamMegam/Community.

Anyone can send a pullrequest.

## TeamMegam

There are 3 steps

- Step 1: Fork this repo
- Step 2: Local test
- Step 3: Push the changes

![Image of DevCenter](https://github.com/megamsys/devcenter.megam.io/blob/master/res/devcenter_megam_io.png)


# Step 1: Lets fork.

## 1. Fork & Clone this repo.

```

$ git clone https://github.com/<id>/devcenter.megam.io

```

# Step 2: Local test

## Install jekyll

```
bundle install

```

## Add your new technical doc as markup to your master.

```

# Copy / Paste an article from _posts/ and create your own __your_blog_title_here_.md

```


## Go to `_posts` directory, and edit the .md files.


## Make sure you have the `author name/picture from https://www.megam.io/about` added

## Verify if your post looks good.

```

bundle exec jekyll serve

```


http://localhost:3000


# Step 3: Deploying your documentation

Push your master.

```

git push master


```

Send us a pull request.

When the pull request gets merged, devcenter will be refreshed automagically.

#LICENSE

MIT
