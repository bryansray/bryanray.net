---
title: "Google Chrome Debugging"
date: 2019-01-10T08:17:45-05:00
tags: ["programming", "debugging"]
---

Google Chrome is a very popular web browser used by many web developers today. With a very quick release cycle and a powerful set of  developer features turned the browser into a must have tool. 

Most developers are more than likely familiar with many of Chrome's features like live-editing CSS, using the basic DevTools and the basics of the debugger.

However, in this post, we'll be going over some great tips and tricks that may help improve your workflow even more.

Let's get to it ...

{{< youtube m6V1VL6FNe8 >}}

1. Quick file switching
If you're familiar with text editing tools like: Sublime Text, Atom, Visual Studio, or even VIM and Emacs ... you probably can't be without their "Go to anything" feature. You'll be happy to hear that DevTools has one as well. 

Simply press CMD + P when DevTools is opened to quickly search for, and open any file in the project.

2. Searching within source code
Searching within' your files is also possible. To search in all files loaded on the page for a specific string hit CMD+OPTION+F. This method of search also supports regular expressions and file path filtering as well.

3. Go to line ...
After you've opened a file in the Sources tab, DevTools has a shortcut to easily jump to any line in that file. To initiate a jump just press CTRL + G.

4. Use multiple carets & selections 
This is another one of those powerful features that comes from almost any modern text editor. While editing a file you can set multiple carets by holding down the CMD key and clicking where you want them to be. This allows you to write the same text in many places at once.

5. Preserve Log
This one is pretty straight forward, but can come in very handy some times. By checking the "Preserve Log" option in the Console tab, you can persist the log instead of clearing it on page load. 

This can come in handy if you want to investigate bugs that show up just before the page is unloaded. Or if you have some values that you just don't want to keep logging to the conosle.

6. Color Picker

7. Force element state
8. Select next occurrence
If you press the CMD + D keys while editing a file in the Sources tab, the next occurrence of the current word will be selected as well. This will allow you to quickly change the name of a variable simultaneously.

11. Change color format

7. Pretty Print {}
8. Device mode
9. Device emulation sensors
12. Visualize the Shadow DOM
15. console.table


### Advanced Debugging

1. The ability to break in Javascript when an element has changed in the DOM


### Chrome Canary

Google Chrome has 4 Release types.

1. A Regular Releasecvx CXZfg
2. A Beta Release
3. A Developer Release
4. Canary

Canary is simple a much newer release that is not as well tested, but has the latest shiny new stuff. This includes new DevTool features as well as browser changes as well. After a while, the version that was releaed in the Canary channel gets any bugs that are found fixed, then filters downward to the Developer release. And then to the Beta Relase. And lastly make their way down in to the Regular Release.

Other than the lack of testing, and possibily not having all the bugs fixed, canary is merely Google Chrome **from the future** (except for those features that might get scrapped due to lack of quality).

In short, you get cool shiny new stuff, but it might crash horribly. On the other hand, you don't have to use it as your primary web browser. And, in fact, you can not set it as the default browser.