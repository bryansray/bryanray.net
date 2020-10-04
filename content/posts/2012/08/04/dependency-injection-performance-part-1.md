---
title: Dependency Injection Performance - Part 1
date: 2012-08-04T00:00:00-05:00
---
Let me begin this by stating that I’m not a huge statistical person by any stretch of the imagination. I'm not all that interested in crunching numbers and I really don’t have a knack for this sort of thing. The reason for this is that statistical analysis can almost always have a counter-argument; and I really dislike debating numbers. It's just not all that entertaining, in my opinion. Nonetheless, I do have a strong interest in dependency injection in general; which is why I decided to follow up on the topic …

This will be the beginning of a series of posts on a few of the more popular dependency injection frameworks in the .NET framework, including, but not limited to: Autofac, Ninject, Unity, Castle Windsor, and Spring.NET.

This sort of all began a couple weeks ago when a co-worker of mine, Philip, began doing a bit of performance testing on some of the dependency injection containers. Why? Well, the application we work on was seeing some performance issues that ended up being the retrieval of objects from our container. Ultimately, his finding led to a caching mechanism that we applied to the container, but also led him down this path of questioning the overall performance of the container(s) in general.

My initial findings are pretty inline with what Philip found, but I still have a hard time actually believing the numbers I’m seeing. Mostly because a few of the numbers are so absurdly high that it just makes me question whether or not the tests that I’m running are actually relevant or correct.

Unfortunately, I don’t have any pretty charts and graphs to post at the moment, but I do plan on putting some of the data together tomorrow once I have a few more of the containers implemented and a bit more hard evidence.

Stay tuned ...
