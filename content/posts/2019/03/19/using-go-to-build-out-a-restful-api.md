---
title: "Using Go to Build Out a RESTful API"
date: 2019-03-19T14:46:33-05:00
---

I see a lot of the benefit of Go. It’s “simple.” The stdlib is great. However, nothing ever seems to scratch the surface more than “look … I can start a web server using the stdlib and serve a single endpoint. It’s great!” Finding a good article or book that describes how to organize your (web) application seems extremely rare.

Any developer who has built something of substantial size (small to medium), knows that there are some things that you typically don’t want to do when building software. I’m trying to find out if these are “bad” habits that I’ve learned? Or perhaps I need to think differently in Go?

Let’s take a simple example. I come from mostly a web application background. One of the things I’ve learned is not to fill my controller up with a lot of business logic. Instead, I tend to push a bunch of that logic back towards the model. I’ve done this in multiple ways, one of my most recent favorite tends to be using the CQRS pattern. However, Go rarely mentions anything about a CQRS or DDD. Everything basically shows you how to create a “controller” (`HandlerFunc`), query a database, and send it back. Is this okay for any other web developers? Is this okay in Go?

Another example … lets say that I’m building a simple application that allows users to create Todo items.  In languages that I come from, I’m typically not used to exposing my Domain objects directly through my API.

For example, if I have a domain object that looked like this:

```csharp
public class TodoItem {
	public int Id { get; set; } // Database specific (internal)
	public string Name { get; set; }
	public bool IsProcessed { get; set; } // Internal Property
	public bool IsCompleted { get; set;
}
```

In my experience, I would preferably not want to expose `Id` and `IsProcessed` to the outside world. Typically, in C#, this is managed through `ViewModel` or what I prefer to call them `ResourceModel` when exposed solely through an API.

My controllers typically handle translating a domain model in to a resource model using some sort of mapping library (AutoMapper) or simply manually mapping them by hand.

However, I have never seen this mentioned in a Go tutorial? I can’t even seem to find anyone discussing something like this. Is this not a concern in Go? Is it considered okay to expose your entire domain object to the world?  This doesn’t seem like a language specific thing, but a API design and keeping your domain encapsulated type thing. So it concerns me when I don’t see anyone talking about these things in the Go community at all?

Could someone help me understand what I’m missing? Should I be working to organizing in a DDD or CQRS type pattern? How do I build something that does more than “fetch data from the database in the controller and send it straight back”?