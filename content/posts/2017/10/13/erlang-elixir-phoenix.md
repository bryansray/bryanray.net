---
title: "Erlang, Elixir, & Phoenix"
date: 2016-01-30T21:20:38-05:00
draft: false
---

Elixir has recently found a lot of success in the form of some very impressive performance metrics coming out of the Phoenix framework. The Phoenix team recently posted their impressive journey on the road to 2 million individual websocket connections. They also provided the process for their optimizations and gave some incites in to how they were able to achieve these results. 

*I would like to have comparison data for the 2 million number. How do I make some associations?*

Lets first get Elixir's origin story out of the way. Elixir is a relatively new language built on top of the Erlang Virtual Machine.

And to understand where Elixir gets a lot of its performance, stability, and behavior from, it helps to have a little understanding of where it came from and what it sits on top of: Erlang. Erlang is described as a general-purpose, concurrent, garbage-collected programming language and runtime system (that's a mouthful).

### Erlang Overview 

{{< youtube xrIjfIjssLE >}}

Erlang was originally designed by Ericsson to support distributed, fault-tolerant, soft real-time, highly available, non-stop applications. It supports hot swapping, that allows code to be changed without stopping the system.

The first version was developed in 1986 by Joe Armstrong, Robert Virding, and Mike Williams. It was originally a proprietary language within Ericsson, but was released as open source in late 1998 after some drama inside Ericsson.

#### Erlang History

The name "Erlang", is attributed to [Bjarne Dacker](http://www.erlang-factory.com/conference/SFBay2010/speakers/BjarneDacker), has been presumed by those working on telephony switches to be a reference to the Danish mathematician and engineer Agner Krarup Erlang or the ubiquitous use of the unit named for him, and also as an abbreviation of "Ericsson Language."

Erlang was designed in the Ericsson Computer Sciences Lab to build software for its own telecommunication products. The initial version of Erlang was implemented in Prolog and was heavily influenced by the programming language PLEX used in earlier Ericsson phone exchanges. Erlang combined ideas on message passing from Smalltalk and CSP, and also had a pattern matching syntax derived from Prolog.

By 1988 Erlang had proven to be suitable for prototyping exchanges, but the Prolog interpreter had proven to be entirely too slow for production use. One group within Ericsson had estimated that it would need to be 40 times faster in order to be suitable for production use.

In 1992 work began on the BEAM virtual machine which compiles Erlang to C. According to Armstrong, the Erlang language went from lab product to real applications following the collapse of the next-generation AXE exchange in 1995.

In 1998 Ericsson announced the AXD301 switch, which contained over a million lines of Erlang code. Unfortunately, shortly after that release Ericsson banned the in-house use of Erlang for new products, citing a preference for non-proprietary languages and that they wanted to be consumers of software and not producers.

This ban ultimately led Joe Armstrong and others to leave Ericsson. Luckily, the Erlang implementation was open-sourced at the end of 1998 shortly after the fallout. Armstrong started a company called Bluetail that built Erlang only applications. And was eventually re-hired by Ericsson in 2004.

Erlang is widely used to run mobile networks worldwide including: GPRS, 3G, and LTE. It's almost guaranteed that if you're using a phone today that connects to LTE, you're data is traveling through an Ericsson switch that is running Erlang. 

[WikiMedia](https://commons.wikimedia.org/wiki/File:SPEC-1_VAX_01.jpg) | 
[VAX 11/780](https://upload.wikimedia.org/wikipedia/commons/0/00/SPEC-1_VAX_01.jpg)

### Enter Elixir

Fast forward 13 years later ... and enter the inception of the Elixir language from Jose Valim.

Elixir is a functional, concurrent, general-purpose programming language that runs on the Erlang Virtual Machine (BEAM). It builds on top of Erlang to provide distributed, fault-tolerant, nearly real-time, non-stop applications, but also extends Erlang to provide support for meta programming with macros and polymorphism via protocols.

Jose created a proof of concept for the Elixir language using the Erlang Virtual Machine and had his first commit for Elixir on January 9th, of 2011.

Elixir's initial code was ready to share with the open-source community a few months later in April of 2011. At that point, the language sat relatively untouched for about 8 months, because the prototype was not as good as Jose expected.

Late in 2011, Jose consulted with Yehuda Katz (of Rust, Ember.js, jQuery, Merb, and Ruby on Rails fame) to help with one particular piece related to the language syntax and abstract syntax tree.

[I wonder if Yehuda or Jose would expound on what part of the language syntax?]

There was a small bit of active development over 2011 and in February of 2012 an Elixir logo and website were launched, along with Elixir's first official release.

In September of 2012 Elixir had its first presentation @ Emerging Language Camp with Strangeloop.

### Phoenix Conceptualization

Almost a year later in September of 2013 the Phoenix Framework was born in the head of Chris McCord. In December of 2013 Chris settled on the name "Phoenix" and on January 18 of 2014 the first git commit was made on the Phoenix project.

February 4th, 2014 the Phoenix framework was announced publicly to the Google Groups and a few months later in July of 2014 Phoenix was announced at the very first ElixirConf. This is the point when Phoenix truly started to gain momentum and started to earn it's recognition.

In September 2014 Jose Valim joined the phoenix-core team. And less than a year later Phoenix released version 1.0 and shortly after Elixir announced its 1.0 release on September 28th of 2015.