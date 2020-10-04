---
title: An rSpec Pending Snippet
date: 2009-02-12T19:18:20-05:00
---
So I've been AFK from the blogging scene and pretty much any other scene that's imaginable for the past couple months. Typically, when I'm generating specs I tend to do something like this:

```
its TAB
```

This will use the rSpec TextMate Bundle to insert a snippet like this:

```
it "should do something" do
end
```

Which is very handy … unfortunately, a lot of the time I'm putting together the behaviors of a specific model or controller I like to "stub/pend" out all of the behaviors I can think of off the top of my head. A UsersController for instance I would do this:

```
it "should find the specified person"
it "should associate the person to the associated view"
it "should render the show template"
```

and so on and so forth. I find this a little easier than having to have my brain switch gears from "it should do this", writing the behaviors for that specific action and then going back to thinking about what else the specifications will do.

So to make a long story short I put together this little snippet:

```
it "should do something"
```

which is generated using a `itsp` (it's pending) command. I know it's nothing huge and it really didn't take me a lot of time to add the snippet, but I really feel that it's a great snippet to have for quickly generating some thoughts about how a specification should behave.

If anyone has any thoughts or feedback … I'd be more than happy to hear it!