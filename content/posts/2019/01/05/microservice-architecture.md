---
title: "Microservice Architecture"
date: 2019-01-05T14:14:46-05:00
draft: false
---

We'll be taking a look at the microservice architecture. We’ll look at some of the problems microservices can cause. And also some of the bigger architectural issues that can occur in the future.

We'll also take a brief stroll through Domain Driven Design (DDD) and some possible anti-patterns that can come from microservices.

So let's get started ...

## How big should a microservice be?
Microservices are typically described in terms of the [single responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) as they should just do one thing really well. Which is fair enough, but precise explanations of what this "one thing" tends to be pretty thin when the rubber meets the road. The answer to this question always seems to be "it depends."

## The risks of premature optimization
Microservices are built to support a more agile approach to service development where you refactor as your understanding of the system evolves. The problem with this is that if you go too far down the wrong road ... it can be very difficult to turn back or adjust accordingly.

In the desire to create small and focused services there is a very real risk that we may decompose things before we fully understand them. This, ultimately, gives rise to services that are not fully autonomous. Services that end up sharing data across service boundaries or have to be updated en masse in response to a change in requirements. The cost of these changes starts to escalate and alas the "[distributed ball of mud](http://www.codingthearchitecture.com/2014/07/06/distributed_big_balls_of_mud.html)" can be born.

Each service brings with it a cost in terms of a maintenance hit and a performance hit around areas such as serialization, communication, configuration, provisioning, and security. If services become too fine-grained ... there is a risk of tipping over in to the "[nanoservice](https://dzone.com/articles/soa-anti-pattern-nanoservices)" anti-pattern. Where the cost of a service greatly outweighs its utility.

Nanoservices cause fragmented logic-by definition. As we break what should have been a meaningful cohesive service, into minuscule steps our logic gets scattered between the bits that are needed to complete the business service. The fact that we need to overhaul several services to accomplish something meaningful can lead to what is referred to as [The Knot](https://dzone.com/articles/soa-anti-pattern-the-knot) anti-pattern.

In service development, *autonomy* is much more important than *size*. It is much easier to reduce a monolithic service down to autonomous components than it is to reverse a web of complex service in to a more cohesive set.

## Identifying Bounded Contexts
[Domain Driven Design](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) (DDD) provides a number of helpful tools for developers grappling with the complexity that is inherent in designing distributed systems. It is difficult to describe a large and complex domain in a single model. So DDD breaks it down in to separate pieces called *bounded contexts*. Each of these bounded contexts has an explicit boundary and contains a unified and consistent internal model that it maintains and interacts with.

This kind of definition lends itself well to microservice modeling as you are identifying manageable, discrete collections of data and behavior that have a clear purpose and explicit boundaries. There is a clear focus on *capabilities* which is particularly useful as services should be more than just a collections of data entities that expose CRUD-style methods.

Broadly speaking, service boundaries can, and in my opinion should, be aligned to these bounded contexts. This helps guarantee the kind of autonomy and cohesion that we need from loosely-coupled services.

## But how "micro" can bounded contexts be?
Here's the catch. Unfortunately, this thought doesn't necessarily add up with the vision of lots of finely grained services collaborating together to provide business value. 

Traditionally, bounded contexts contain clusters of different data entities and processes that can control a significant area of functionality such as *Order Fulfillment* *Model Management*, *Data Management*, etc. Bounded contexts can actually be quite large.

A more finely grained DDD unit is what is referred to as the *aggregate* or an *aggregate root*; which describes a group of objects and behaviors that can be treated as a single cohesive unit. An aggregate is regarded as the basic unit of data transfer - a classic example of an aggregate is an *order* that contains a bunch of *line items*. Or in our context a *collection that contains a bunch of signals*.

So given that an aggregate is a cohesive unit ... perhaps this could be a reasonable indicator of the smallest meaningful scope for a microservice? After all, it would be difficult to split an aggregate across service boundaries without compromising service autonomy.

There is a downside to this though. The problem with this level of granularity is that it tends to give rise to anaemic services that do little more than expose CRUD-style methods. By grouping data entities together rather than encapsulating capabilities and behavior. The end result usually ends up as a very "chatty" service infrastructure where the majority of processing time is spent on remote calls between services.

## Size doesn't actually matter
In my opinion, a single deployable service should be *no bigger than a bounded context, but no smaller than an aggregate root*. I would also suggest that it's better if we start with relatively broad service boundaries to begin with. And then refactoring to smaller services as time goes on and bounded contexts are extracted from existing bounded contexts.

Ultimately, I believe "micro" is a very misleading prefix. These are not necessarily "small" as in "little." These are services in the classic SoA mould. The main difference being that these microservices are created with more of an agile mindset. Including lightweight infrastructure, decentralized governance, and greater emphasis on automation.