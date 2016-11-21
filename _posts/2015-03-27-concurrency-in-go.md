---
title: "Concurrency in Go!"
layout: post
author: "rajthilak"
og_image_url: "https://devcenter.megam.io/res/gotalk-intro.png"
description: "Concurrency in Go!"
---

### What is concurrency?

Execution of multiple processes independantly and they may or may not be getting executed at the same time.
Imagine a webserver gets multiple smaller requests and they all concurrently gets executed. It is basically multitasking on a single-core processor.


### Oh, wait! then Concurrency is parallelism?

Parallelism is about running multiple processes at the same time, but concurrency is about dealing with a lot of processes may or may not be getting executed at the same time. Confusing?

**Parallelism**

  * Simultaneous Execution
  * Running multiple threads on different processors   at the same time against each other.
  * Requires multiple cores.

**Concurrency**

*   Independent Execution
*  Running multiple light-weight concurrent processes(goroutines!!, hold on! we'll see what goroutines are)
*   Single core

  > Note: Using GOMAXPROCS, it is possible to run goroutines on different logical processors by configuring the runtime.


So, 'Concurrency is not parallelism' but,

'concurreny can achieve parallelism'.



# why Go?

Go's concurrency primitives are way too good and it is easy to write concurrent programs.
Go uses goroutines to achieve concurreny and importantly, it makes communication between goroutines a lot easier.

### what are goroutines ?
Fundamentally, goroutine is a function which runs concurrently with other functions.

So, here is an example

    package main
    import (
        "fmt"
           )

    func print(s string){
            for i := 0; i < 5; i++ {
                 fmt.Println(s)
         }
     }


     func main() {
         print("Current thread")

         go print("bye")  

         var input string
         fmt.Scanln(&input)
     }


   Compile the above code to understand how the goroutines work. We'll look into more details in a bit.



### what are channels?
Channels are basically pipelines that are used to communicate between two goroutines. Channels can be used for synchronization of goroutines, etc.

    package main

    import (
        "fmt"
        "time"
        )

        func put(c chan string){
         for {
            c <- "Tadaa!"
           }
          }

        func print(c chan string){
          for {
            message := <- c
            fmt.Println(message)
            time.Sleep(time.second * 2)
            }
           }
         func main() {
           var c chan string = make(chan string)

           go put(c)
           go print(c)

           var input string
           fmt.Scanln(&input)
          }


  How awesome right? Thats how cool goroutines and channels are. It makes it a lot easier and more interesting to program.  


### why are goroutines super cool?

Concurreny was possible in other languages too, but what made concurreny a cherrypie in go?

goroutines are light-weight, other languages like java, uses threads.

Creating a goroutine hardly takes 2kb of stackspace(it was 8kb till go 1.3) where as a thread consumes 1MB per stack space.


I recommend all of you reading this to watch [Go Concurrency Patterns](http://www.youtube.com/watch?v=f6kdp27TYZs) by Rob Pike

Few Links:

[Fundamentals of concurrent programming](https://www.nada.kth.se/~snilsson/concurrency/)

[Concurreny goroutines and GOMAXPROCS](http://www.goinggo.net/2014/01/concurrency-goroutines-and-gomaxprocs.html)
