---
title: Setting up Scala, SBT, Play, Akka
slug: setting-up-scala-sbt-play-akka
date_published: 2015-03-16T06:51:17.639Z
date_updated:   2015-08-16T13:48:58.571Z
---

###Part 1 : Setting up Scala, SBT, Play, Akka 

This will be multi-part series in building a cloud API server for our PaaS with cloud instrumentation using a messaging layer.

###1. Let us setup SBT 0.13.

#### Installing in debian

    echo "deb https://dl.bintray.com/sbt/debian /" | sudo tee -a /etc/apt/sources.list.d/sbt.list
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 642AC823
    sudo apt-get update
    sudo apt-get install sbt

(or)

#### Manual install of sbt

- Download the [sbt_launch.jar](https://repo.typesafe.com/typesafe/ivy-releases/org.scala-sbt/sbt-launch/0.13.9/sbt-launch.jar?_ga=1.124271561.2110266759.1437462670) to your ~/bin directory.

- Create a script named `sbt` in your ~/bin directory with the following contents.

    java -server -Xms1024M -Xmx3072M -Xss32M     -XX:+CMSClassUnloadingEnabled -XX:MaxPermSize=1024M -XX:+UseG1GC -XX:+AggressiveOpts -XX:SurvivorRatio=128 -XX:MaxTenuringThreshold=0 -jar `dirname $0`/sbt-launch.jar "$@"
    
- Adjust the -Xmx, -Xms -XX:MaxPermSize based on the RAM you have. 

At Megam we all have atleast 8GB or > of RAM. 

#### *optional Install sbt-eclipse 

Install the scala-ide eclipse plugin for Eclipse Mars. 

Help > Install New Software > 

Add the correct link from herehttp://scala-ide.org/download/nightly.html

You can install typesafe stack and download templates from here. http://typesafe.com/stack/download#template 
http://typesafe.com/resources/typesafe-stack/downloading-installing.html 

- Create a new project in eclipse. 
Scala – Worksheet allows you to play around with REPL inside eclipse editor. or use command line, to use REPL



`sbt console`

If you only plan to use scala, you are done here. You can tweak your Build.scala to use the scala version you want.

###2. Eclipsify scala project

https://github.com/typesafehub/sbteclipse/wiki https://github.com/typesafehub/sbteclipse Create a file .sbt/plugins/plugins.sbt and add the following to include eclipse plugin support.

    addSbtPlugin("com.typesafe.sbteclipse" % "sbteclipse-plugin" % "2.3.0"
    
If you created a project from command line then run sbt > eclipse to eclipsify a project..

    ram@rammegam:~/code/megam/workspace/nilam$ sbt
    [info] Loading project definition from /home/ram/code/megam/workspace/nilam/project
    [info] Set current project to nilam (in build     file:/home/ram/code/megam/workspace/nilam/)
    [nilam] $ eclipse
    [info] About to create Eclipse project files for your project(s).
    [info] Updating {file:/home/ram/code/megam/workspace/nilam/}nilam...
    [info] Resolving org.hibernate.javax.persistence#hibernate-jpa-2.0-api;1.0.1.Fin                                                                                [info] Done updating.
    [info] Compiling 6 Scala sources and 1 Java source to /home/ram/code/megam/workspace/nilam/target/scala-2.9.1/classes...
    [info] Successfully created Eclipse project files for project(s):
    [info] nilam
    
   
###3. If you with to use akka

A sample akka source code for the Typesafe Stack (http://typesafe.com/stack). http://typesafe.com/resources/tutorials/getting-started-with-akka-scala.html From your akka code type sbt run:

    ram@rammegam:~/code/megam/workspace/megam_akka$ sbt run
    [info] Loading project definition from /home/ram/code/megam/workspace/megam_akka/project
    [info] Set current project to nilam (in build     file:/home/ram/code/megam/workspace/megam_akka/)
    [info] Updating {file:/home/ram/code/megam/workspace/megam_akka/}nilam...
    [info] Resolving com.typesafe#config;0.3.1 ...
    [info] downloading http://repo.typesafe.com/typesafe/releases/com/typesafe/akka/akka-actor/2.0.3/akka-actor-2.0.3.jar ...
    [info]     [SUCCESSFUL ] com.typesafe.akka#akka-actor;2.0.3!akka-actor.jar (9117ms)
    [info] downloading http://repo.typesafe.com/typesafe/releases/com/typesafe/config/0.3.1/config-0.3.1.jar ...
    [info]     [SUCCESSFUL ] com.typesafe#config;0.3.1!config.jar(bundle) (3345ms)
    [info] Done updating.
    [info] Compiling 1 Scala source to /home/ram/code/megam/workspace/megam_akka/target/scala-2.9.2/classes...
    [info] Running org.megam.akka.Nilam
    Count is 3
    [success] Total time: 25 s, completed 6 Nov, 2012 12:31:57 PM



###4. Setting up Play framework

Let us create a project titled megam_play which will use external dependencies like scaliak, newman, scalaz This project megam_play was created by cloning an existing typesafe_stack (play scala sample template). You are free to pick any other template from Github.com Adding library dependencies in your Build.scala file. The scaliak, amqp dependency has been moved to a common artifact named “megam_common”

    import sbt._
    import play.Project._

    object ApplicationBuild extends Build {

     val appName = "megam_play"

      val appVersion = "0.1.0"

      val organization = "Megam Systems"

      val homepage = Some(url("http://www.megam.co"))

      val startYear = Some(2013)

      val description = "RESTful API server for the megam platform. Uses Riak and Memcache"

      /**
       *   if you use groupID %% artifactID % revision instead of groupID % artifactID % revision
       *   (the difference is the double %% after the groupID), sbt will add your project’s Scala version
       *   to the artifact name.
       */

      val play2AuthVersion = "0.11.0-SNAPSHOT"
      val megamVersion = "0.1.0-SNAPSHOT"

      val appDependencies = Seq(
        javaCore, cache,javaEbean,
        "com.twitter.service" % "snowflake" % "1.0.2" from "https://s3-ap-southeast-1.amazonaws.com/megampub/0.1/jars/snowflake.jar", //don't move this below.
    "com.github.indykish" % "megam_common_2.10" % megamVersion excludeAll (
      ExclusionRule("commons-logging","commons-logging"),
      ExclusionRule("org.slf4j","slf4j-jdk14")),
    "com.github.mumoshu" %% "play2-memcached" % "0.3.0.2",
    "jp.t2v" %% "play2-auth" % play2AuthVersion,
    "jp.t2v" %% "play2-auth-test" % play2AuthVersion % "test",
    "com.stackmob" %% "newman" % "1.3.0" % "test")

      val main = play.Project(appName, appVersion, appDependencies).settings(    
    sbt.Keys.resolvers += "Sonatype Snapshots" at "https://oss.sonatype.org/content/repositories/snapshots",
    sbt.Keys.resolvers += "Typesafe Snapshots" at "http://repo.typesafe.com/typesafe/snapshots/",
    sbt.Keys.resolvers += "Scala-Tools Maven2 Snapshots Repository" at "http://scala-tools.org/repo-snapshots",
    sbt.Keys.resolvers += "Twitter Repo" at "http://maven.twttr.com", // finagle 
    sbt.Keys.resolvers += "spray repo" at "http://repo.spray.io", //spray client used in newman.
    sbt.Keys.resolvers += "spray nightly" at "http://nightlies.spray.io", //spray client nighly used in newman (0.23.0).
    sbt.Keys.resolvers += "Spy Repository" at "http://files.couchbase.com/maven2" // required to resolve `spymemcached`, the plugin's dependency.
    )

    }
    
We package debs, hence build.sbt contains the required statements

    import sbt
    import Process._
    import com.typesafe.sbt.packager.debian.Keys._
    import    com.typesafe.sbt.packager.linux.LinuxPackageMapping
    import S3._

    scalaVersion := "2.10.3"

    scalacOptions := Seq(
      "-unchecked", 
      "-deprecation",
      "-feature",
      "-optimise",
    "-Xcheckinit",
    "-Xlint",
    "-Xverify",
    "-Yinline-warnings",
    "-Yclosure-elim",
    "-language:postfixOps",
    "-language:implicitConversions",
    "-Ydead-code")

    com.typesafe.sbt.packager.debian.Keys.name in Debian := "megamplay"

    maintainer in Debian:= "Rajthilak <rajthilak@megam.co.in>"

    packageSummary := "Cloud API server - Megam." 

    packageDescription in Debian:= " (REST based) Cloud API server for Megam platform.The API server protects the resources using HMAC based authorization, as provided to a customer during onboarding."

    s3Settings

    linuxPackageMappings in Debian <+= (baseDirectory) map { bd =>
      (packageMapping((bd / "bin/mp") -> "/usr/local/share/megamplay/bin/mp")
       withUser "root" withGroup "root" withPerms "0755")
    }

    linuxPackageMappings <+= (baseDirectory) map { bd =>
      val src = bd / "target/staged"
     val dest = "/usr/local/share/megamplay/lib"
    LinuxPackageMapping(
    for {
      path <- (src ***).get
      if !path.isDirectory
    } yield path -> path.toString.replaceFirst(src.toString, dest)
    )
    }

    linuxPackageMappings in Debian <+= (baseDirectory) map { bd =>
      (packageMapping((bd / "conf/application-production.conf") -> "/usr/local/share/megamplay/conf/application-production.conf")
    withConfig())
    }

    linuxPackageMappings in Debian <+= (baseDirectory) map { bd =>
      (packageMapping((bd / "conf/application-logger.xml") -> "/usr/local/share/megamplay/conf/application-logger.xml")
    withConfig()) 
    }

    linuxPackageMappings in Debian <+= (baseDirectory) map { bd =>
    (packageMapping((bd / "conf/routes") -> "/usr/local/share/megamplay/conf/routes")
    withConfig())
    }

    linuxPackageMappings in Debian <+= (baseDirectory) map { bd =>
    (packageMapping((bd / "conf/messages") -> "/usr/local/share/megamplay/conf/messages")
    withConfig())
    }

    linuxPackageMappings in Debian <+= (baseDirectory) map { bd =>
    (packageMapping((bd / "conf/play.plugins") -> "/usr/local/share/megamplay/conf/play.plugins")
    withConfig())
    }

    com.typesafe.sbt.packager.debian.Keys.version in Debian <<= (com.typesafe.sbt.packager.debian.Keys.version, sbtVersion) apply { (v, sv) =>
    sv + "-build-" + (v split "\." map (_.toInt) dropWhile (_ == 0) map ("%02d" format _) mkString "")
    }

    debianPackageDependencies in Debian ++= Seq("curl", "java2-runtime", "bash (>= 2.05a-11)")

    debianPackageRecommends in Debian += "riak"

    linuxPackageMappings <+= (baseDirectory) map { bd =>
    packageMapping(
    (bd / "copyright") -> "/usr/share/doc/megam_play/copyright"
    ) withPerms "0644" asDocs()
    }

    linuxPackageMappings in Debian <+= (com.typesafe.sbt.packager.debian.Keys.sourceDirectory) map { bd =>
    (packageMapping(
    (bd / "debian/changelog") -> "/usr/share/doc/megam_play/changelog.gz"
    ) withUser "root" withGroup "root" withPerms "0644" gzipped) asDocs()
    }

    mappings in upload := Seq((new java.io.File(("%s-%s.deb") format("target/megamplay", "0.12.4-build-0100")),"0.1/debs/megam_play.deb"))

    host in upload := "megampub.s3.amazonaws.com"

    credentials += Credentials(Path.userHome / "software" / "aws" / "keys" / "sbt_s3_keys")

    S3.progress in S3.upload := true
    
    
 1.Plugins.sb

    // Comment to get more information during initialization
    logLevel := Level.Warn

    // The Typesafe repository 
    resolvers += "Typesafe repository" at     "http://repo.typesafe.com/typesafe/releases/"

    // Typesafe snapshots
    resolvers += "Typesafe Snapshots" at    "http://repo.typesafe.com/typesafe/snapshots/"

    // Use the Play sbt plugin for Play projects

    addSbtPlugin("play" % "sbt-plugin" % "2.2.0")
    
    
project/build.properties

`sbt.version=0.13.0`

We built our own AMQP based on scalaz, and is available in http://github.com/indykish/megam_common. Now build and publish megam_common jars using the process as described in this link into https://oss.sonatype.org/content/repositories/snapshots/com/github/indykish/megam_common_2.10/0.1.0-SNAPSHOT/.

`sbt publish`


Run the play project megam_play

    ram@ramhome:~/code/megam/workspace/megam_play$ sbt
    [info] Loading global plugins from /home/ram/.sbt/0.13/plugins
    [info] Loading project definition from /home/ram/code/megam/workspace/megam_play/project
    [info] Set current project to megam_play (in build     file:/home/ram/code/megam/workspace/megam_play/)
    [megam_play] $ play
           _
      _ __ | | __ _ _  _
     | '_ | |/ _' | || | 
     |  __/|_|___|__ /
     |_|          |__/

    play 2.2.0 built with Scala 2.10.2 (running Java 1.7.0_25), http://www.playframework.com

    > Type "help play" or "license" for more information.
    > Type "exit" or use Ctrl+D to leave this console.

    [megam_play] $

You can use lsof as shown below to see if the server runs on port 9000.



    [nilam] $ run

    $ sudo lsof -i:9000
    [sudo] password for ram:
    COMMAND   PID USER   FD   TYPE DEVICE SIZE NODE NAME
    java    15640  ram  270u  IPv6  40094       TCP *:9000 (LISTEN)

Now let us add a template to show the

    1. index page,
    2. Error when an invalid URL is passed

####index.scala.html

    @(message: String)(implicit flash: play.api.mvc.Flash)
    @main("Megam Cloud v1") {
    @welcome(message)
    }
    
    
####main.scala.html



    @(title: String)(content: Html)
    <!DOCTYPE html>
    <html>
    <head>
    <title>@title</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Lato:300,400,700" />
    <link rel="stylesheet" type="text/css" href="@routes.Assets.at("stylesheets/theme.css")" >
    <link rel="stylesheet" type="text/css" href="@routes.Assets.at("stylesheets/bootstrap-theme.css")" >
    <link rel="stylesheet" type="text/css" href="@routes.Assets.at("stylesheets/bootstrap.css")" >
    <link rel="stylesheet" type="text/css" href="@routes.Assets.at("stylesheets/bootstrap-glyphicons.css")">
    <link rel="stylesheet" href="styles/default.css">
    <link rel="stylesheet" type="text/css" href="@routes.Assets.at("stylesheets/styles/default.css")" >
    <link rel="shortcut icon" type="image/png" href="@routes.Assets.at("images/favicon.png")">

    <!-- Bootstrap -->
    <script src="@routes.Assets.at("javascripts/jquery.js")" type="text/javascript"></script>
    <script src="@routes.Assets.at("javascripts/bootstrap.js")" type="text/javascript"></script>
    <script  src="@routes.Assets.at("javascripts/highlight.pack.js")" type="text/javascript"></script>

    <script type="text/javascript">
            $(document).ready(function() {
                hljs.initHighlightingOnLoad();
                $('pre code').each(function(i, e) {
                    hljs.highlightBlock(e)
                });
                $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                    e.target// activated tab
                    e.relatedTarget // previous tab
                });

            });
    </script>
    <style type="text/css">
      /* <![CDATA[ */
      #pagetoc li {
        padding-left: 22px;
        text-indent: -22px;
      }

      /* ]]> */
    </style>
      </head>
       <body>
       <div>     
        <div>
            @leftmenu()
            @content
        </div>
      </div>

    <!-- JQuery will invoke via the spinner and display a loading modal lock. -->
    <div id="loading" />
  </body>
</html>


####errorPage.scala.html


    @(ex: Throwable)

    @main("An error occurred while trying to run megam_play. contact support.") {
    <div class="api-doc">
      <div class="mddoc margin-top-large">
       <image src="@routes.Assets.at("images/nirvana.png")"/>
    <h1><a name="rest_docs" href="#a-rest_docs">Sucked into Nirvana</a></h1>
    <p class="lead">
      <code>
        @(ex getMessage)
      </code>
    </p>
    <div class="page-header">
      <h2>Stacktrace</h2>
    </div>
    
     <div class="">
     
    
    <code class="brush: bash; toolbar:     false;">@({val u = new java.io.StringWriter; ex.printStackTrace(new java.io.PrintWriter(u)); u.toString})
        </code>
      </div>
     </div>
    </div>
    }
    
    
    object Global extends GlobalSettings {

     override def onStart(app: Application) {
    play.api.Logger.info("Megam Play %s App - started".format("0.1"))
    }

    override def onStop(app: Application) {
    play.api.Logger.info("Megam Play %s App - going down. Stateless folks - you don't care.".format("0.1"))
    }

    override def onError(request: RequestHeader, ex: Throwable) : Future[play.api.mvc.SimpleResult] = {
    Future.successful(InternalServerError(
      views.html.errorPage(ex)))
    }

    override def onHandlerNotFound(request: RequestHeader): Future[play.api.mvc.SimpleResult] = {
    Future.successful(NotFound(
      views.html.errorPage(new Throwable(NOT_FOUND + ":" + request.path + " NOT_FOUND"))))
     }
    }
    

Thee view files are placed under views directory.

Type https://localhost:9000






