---
title: Part 1 - Getting your first Merb app up and running
date: 2008-08-29T19:18:20-05:00
---

I know this may seem like the most basic of tasks, but there are not a lot of up-to-date articles on just starting out with Merb. So, over the next couple of months. I'm going to go through some of the latest Merb code and things you can do to get up and running with Merb.

This isn't going in to the detail of creating models, controllers, tests, etc … that will come in the next post. I'm going to try and keep these small so that I can come back and change them as Merb solidifies in to 1.0

#### Preface

Merb is, tentatively, planned to release on October 11th; which is just in time for "Merb Camp":http://merbcamp.com. So, with that in mind, a lot of the articles and code that I go through now … will be obsolete in a couple months. Yehuda and the Merb team have gone through great lengths to make sure that the 1.0 release of Merb is something that everyone is going to be happy with in the long run. Which is why things have been changing pretty drastically over the past few releases.

#### merb-gen app

merb-gen app is your starting point for a Merb application. Right now the options that it takes are 'testing_framework', 'orm', 'flat', and 'very_flat'. You can see this by simply typing in:

merb-gen app

in to the console which should return something similar to:

```
Usage: merb-gen app [options] [args]

Generates a merb application.

Options specific for this generator:
          –template-engine OPTION     Template engine to prefer for this application (one of: erb, haml).
          –testing-framework OPTION   Testing framework to use (one of: rspec, test_unit)
          –orm OPTION                 Object-Relation Mapper to use (one of: none, activerecord, datamapper, sequel)
          –flat                       Generate a flat application: one file + configs + templates directory.
          –very-flat                  Generate a very flat, Sinatra-like one file application.
```

Typically when I start new projects I do something like this:

`merb-gen app Blogivore –testing-framework=rspec –template-engine=haml –orm=datamapper`

This will generate a nice clean application that is ready for haml (my personal preference), datamapper, and rspec. If you'd like to see what else you can do with merb-gen … don't forget that you can "view the code yourself":http://github.com/wycats/merb-more/tree/master/merb-gen/lib! I know it sounds intimidating, but honestly, it's not! The code is really straight forward and clean.

That's all I'm going to go in to for now, but next time I'll go over generating your first model, view, and controller.