---
title: "From Linode to Light Sail on AWS"
date: 2019-03-03T14:05:46-05:00
---

Most of the companies that I have worked for began moving their products to the “cloud” (read, “other peoples computers”). These companies have been mostly Microsoft shops, so Azure has been the obvious choice. Azure has a great user interface, a great set of services, and all the black magic pricing that AWS comes with.

One of the things that lured me towards giving AWS a real look, was Light Sail. Light Sail is, basically, a fixed price cost for your instances. If you’ve been using Linode or Digital Ocean. Light Sail, is ultimately, a direct competitor of theirs. 

I’ve had Linode servers for a long time. Running a few Wordpress sites and some pet projects that I have built. When I first heard about Light Sail, it really sounded like a good way to get my feet wet with AWS.

So, one holiday weekend, I rolled up my sleeves and boxed up my Linode servers and migrated things over to Light Sail. The transition went really smoothly. As I mentioned, I really don’t have a very complex server setup. SSH, web servers, PHP, Elixir, .NET Core, and that’s about it.

To help me venture out and learn a bit more. I chose to use the Amazon Linux distribution. The migration would have been a ton easier if I had stuck with Ubuntu, but I really wanted to give another server bistro another shot. For the most part, everything was pretty straight-forward. I was pleasantly surprised with the `yum` package manager; which made the experiment worth it.

Sadly, I did have a little trouble with getting Lets Encrypt up and running with Amazon Linux. I basically ended up having to manually download and compile everything; which wasn’t too much of a pain. Hopefully, Lets Encrypt and Amazon Linux get better integrated some time in the future. It would have been great to simply `yum install certbot` and be off to the races,

The services that I’ve used so far: AWS WorkMail, Route 53, Light Sail (Instances, Storage, and Database), and a touch of CloudFront.

So far, the experience has been really straight forward. Admittedly, I’m only using a very small subset of AWS’s offerings, but so far the overall experience has been nice.

My least favorite of the services so far has been WorkMail. Its Web User Interface leaves a lot to be desired. I comes from a gmail background and I’ve grown very accustomed to the gmail short-cut keys. Much like in VIM, as a developer, when you lose access to shortcut keys that your fingers are trained to use … things just take a while to switch out of. However, if you’re only using WorkMail through a client like Outlook, Mail, or any other IMAP client. It’s, obviously, not really a big issue.

I would still like to experiment more with CloudFront. Adding in a caching layer to all the sites that I host seems like it would be a useful endeavor.