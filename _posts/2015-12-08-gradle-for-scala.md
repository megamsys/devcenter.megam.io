---
title: Gradle for scala
layout: post
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: Gradle for scala
---

### Installing gradle

We have decided to gradually migrate all our projects to gradle from `sbt` due to its performance.

In our recent [sparkbuilder](https://github.com/megamsys/sparkbuilder.git) project we found a need to **natively build jars** for our analytic prediction templates - We call us  Yonpi [**Y**et **AN**other **P**lug**I**n]

Here we will look at installing gradle and setting up a scala project and publishing it to bintray.

#### Download grade

Dowload and untar the zip [gradle](http://gradle.org/gradle-download/)


### Environment variable

Setup the PATH environment variable by appending *GRADLE_HOME/bin*

There may be packages for your distro (ubuntu, or archlinux)

#### In Archlinux

```

yaourt gradle

```

### Your first scala project [sparkbuilder](https://github.com/megamsys/sparkbuilder.git)

> *build.gradle*

The build recipe for gradle resides here.

>*src/main/scala:*

Contains the scala source code.

Gradle provide a plugin for scala projects, just include the line in your build.gradle as  `apply plugin: scala`

```

apply plugin: scala

```

Here is our full gradle file.

```

apply plugin: 'scala'

repositories {
    maven {
      url 'https://repo.gradle.org/gradle/libs-releases-local'
    }

    maven {
      url 'http://dl.bintray.com/megamsys/scala'
    }

    mavenCentral()
}

dependencies {
  compile 'org.scala-lang:scala-library:2.11.7'
}

def toolingApiVersion = gradle.gradleVersion

dependencies {
    compile "org.gradle:gradle-tooling-api:${toolingApiVersion}"
    compile 'io.megam:libcommon_2.11:0.20'
    compile 'org.scalaz:scalaz-core_2.11:7.1.5'
    testCompile 'junit:junit:4.5'
    testCompile 'org.specs2:specs2-core_2.11:3.6.5-20151112214348-18646b2'
    testCompile 'org.specs2:specs2-junit_2.11:3.6.5-20151112214348-18646b2'
    testCompile 'org.specs2:specs2-matcher-extra_2.11:3.6.5-20151112214348-18646b2'
    runtime 'org.slf4j:slf4j-simple:1.7.10'
}


```

To start from the top.

>*repositories*

Add the repositories you want *gradle* to download jars

```

repositories {
    maven {
      url 'https://repo.gradle.org/gradle/libs-releases-local'
    }

    maven {
      url 'http://dl.bintray.com/megamsys/scala'
    }

    mavenCentral()
}

```

In the above we use a library from bintray.com/megamsys/scala, and also will be using `gradle tooling api` to build scala code (yonpi)

>*dependencies*

Add the dependencies you want *sparkbuilder* to use. We will use the following apis.

- gradle-tooling
- scalaz
- megam:libcommon

For *tests* we will use

-  junit
-  specs2

```

dependencies {
    compile "org.gradle:gradle-tooling-api:${toolingApiVersion}"
    compile 'io.megam:libcommon_2.11:0.20'
    compile 'org.scalaz:scalaz-core_2.11:7.1.5'
    testCompile 'junit:junit:4.5'
    testCompile 'org.specs2:specs2-core_2.11:3.6.5-20151112214348-18646b2'
    testCompile 'org.specs2:specs2-junit_2.11:3.6.5-20151112214348-18646b2'
    testCompile 'org.specs2:specs2-matcher-extra_2.11:3.6.5-20151112214348-18646b2'
    runtime 'org.slf4j:slf4j-simple:1.7.10'
}

```

### CompileScala

Lets compile our source code.

```

gradle build

```

The above does a compile and test of scala code.

### Testing using spec2 and gradle

specs2 isn't quite friendly as in [sbt](https://scala-sbt.org)

So to make it work we will need to add these dependencies for using **specs2**

Yes, **JUnit** is needed

```

testCompile 'junit:junit:4.5'
    testCompile 'org.specs2:specs2-core_2.11:3.6.5-20151112214348-18646b2'
    testCompile 'org.specs2:specs2-junit_2.11:3.6.5-20151112214348-18646b2'
    testCompile 'org.specs2:specs2-matcher-extra_2.11:3.6.5-20151112214348-18646b2'

```

Let us create our first `YonpiRawSpecs.scala` file. You'll notice that on top of the class you will need   `@RunWith(classOf[JUnitRunner])` to run your specs2.


```

package test

import org.specs2.mutable._
import org.specs2.Specification
import java.net.URL
import org.specs2.matcher.MatchResult
import org.specs2.execute.{ Result => SpecsResult }

import io.megam.gradle._
import org.megam.common.git._
import org.junit.runner.RunWith
import org.specs2.mutable.SpecificationWithJUnit
import org.specs2.runner.JUnitRunner
import org.slf4j.LoggerFactory

@RunWith(classOf[JUnitRunner])
class YanpiRawSpec extends Specification {

  def is =
    "YanpiRawSpec".title ^ end ^ """
  YanpiRawSpec is the implementation that build the git repo
  """ ^ end ^
      "The Client Should" ^
      "Correctly build Yonpis for a git repo" ! Yanpi.succeeds ^
      end

  case object Yanpi {

      def succeeds: SpecsResult = {
      val yp =   YanpiProject(new GitRepo("local", "https://github.com/megamsys/sparkbuilder.git"))
      println ("yp.name0 ="+yp.name0)
      println ("yp.root0 ="+yp.root0)
      println ("yp.jar0 ="+yp.jar0)

      yp.name0  == "sparkbuilder"
      yp.root0  == "/home/megam/code/megam/home/megamgateway/sparkbuilder"
      yp.jar0 == "/home/megam/code/megam/home/megamgateway/sparkbuilder/build/sparkbuilder.jar"
    }
  }

}


```

### Running tests

Kickoff the specs to see if they pass

```

gradle test

```

![Megam spec passes](/content/images/2015/12/megam_spec_pass.png)

### Publishing to bintray

Register and get the credentials of bintray.

Create ./bintray/credentials with the following value. Your password might be different.

```
realm = Bintray API Realm
host = api.bintray.com
user = megamio
password = fake8080808080808080

```

Modify your build.gradle to load the properties file

```


apply plugin: 'com.jfrog.bintray'

ext.bintray = new Properties()
bintray.load(new FileInputStream("$System.env.HOME" + "/.bintray/.credentials"))

group = "io.megam"

bintray {
	user = bintray['user']
	key =  bintray['password']
  dryRun = false
  publish =  true
  publications =['sparkbb']
	pkg {
		repo = 'scala'
		name = 'sparkbuilder_2.11'
    userOrg = 'megamsys'
    group = 'io.megam'
		desc = 'Automated spark yonpijar builder using gradle tool for any git repo. Yonpis are templated machine learning scala code residing as separate Git.'
		licenses = ['Apache-2.0']
    websiteUrl = "https://www.megam.io"
		vcsUrl = 'https://github.com/megamsys/sparkbuilder.git'
		labels = ['spark', 'builder', 'gradle', 'spark']
		publicDownloadNumbers = true

	}
}

```

Refer [sparkbuilder](https://github.com/megamsys/sparkbuilder.git) for the details on build.gradle

Now that we have loaded our bintray config, let publish jars to bintray.

```

gradle clean

gradle build

gradle bintrayUpload

```

Ok, verify the link [https://dl.bintray.com/megamsys/scala/io/megam/sparkbuilder_2.11](https://dl.bintray.com/megamsys/scala/io/megam/sparkbuilder_2.11),

Cool the project is up there in bintray.

You can use it to your hearts content.
