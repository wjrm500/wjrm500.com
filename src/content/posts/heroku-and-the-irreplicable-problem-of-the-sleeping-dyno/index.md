---
title: Heroku and the Irreplicable Problem of the Sleeping Dyno
date: '2021-09-20T01:40:19Z'
updated: '2022-08-17T14:38:12Z'
description: I was befuddled to say the least, the first time I stumbled across the Sleeping Dyno. For rather than manifesting itself in reptilian form, as a terrible lizard in its dormancy, presumably mustering its energies for some cataclysmic rampage – a sight that would, of course, have provoked minimal befuddlement – the Sleeping Dyno is…
categories:
  - Software Development
---

I was befuddled to say the least, the first time I stumbled across the Sleeping Dyno. For rather than manifesting itself in reptilian form, as a terrible lizard in its dormancy, presumably mustering its energies for some cataclysmic rampage – a sight that would, of course, have provoked minimal befuddlement – the Sleeping Dyno is in fact a rather more subtle thing in the beholding, presenting to the user in the form of a _slow web page load time_. An incalculably more terrifying proposition than being warped back in time to the Jurassic, I’m sure you’ll agree.

A slow web page load time is no cause for befuddlement, the rational among you may argue. Well, dear reader, it is the ephemeral nature of the problem that gives rise to the befuddlement in this case: for once you’ve encountered it, it _is_ no longer; like some sort of subatomic particle for which to view is to alter. Because, when you think about it, if you want a Sleeping Dyno to explore its filesystem, do some processing and send you some data, it’s probably going to need to be woken from its slumbers.

![](./lazy-tyrannosaurus-rex-sleeping-dinosaur-t-rex_125446-583.jpg)

**_Enough of the dinosaurs already!_**

As much as I’m enjoying the dinosaur-related shenanigans, it’s time for me to stop talking utter nonsense. The dynos I am referring to are **Heroku dynos**. To provide some meaningful context, Heroku is a cloud-based platform that allows you to deploy applications to the interweb, free-of-charge. Each application deployed to Heroku is automatically assigned something called a dyno, which is basically the thing that handles requests made to your application. Picture a web server – it’s basically that, but virtualised. As Heroku have a [web page](https://www.heroku.com/dynos) dedicated to explaining what dynos are, I recommend taking your information straight from source, and not allowing my own (mis)interpretation to cloud your understanding!

When you create an account on Heroku, you are granted a set number of free dyno hours per month – currently that limit is 1,000 with debit / credit card validation, and 550 without. To preserve dyno hours, free dynos **automatically sleep after 30 minutes of inactivity**. This means that when it’s been a short while since anybody’s used your Heroku application and you make a request to it, the page will take an absolute _age_ to load. This is simply because the dyno needs to wake up before it can handle the request. Once awoken, it is able to handle subsequent requests with all of the alacrity of an electric nan knitting a sweater – lovely!

In reading the above, the temporally-aware reader might have felt a slight prickle along the nape of their neck. For why does one need to preserve one’s dyno hours if the average month is only 730 hours long? What’s stopping one keeping one’s dynos awake 24/7 – propping open their eyelids with matchsticks, pumping them intravenously with Red Bull, and forcing them to listen to an endless loop of Crazy Frog over the loudspeakers?

Well, technically, nothing. You can torture your poor dynos if you so wish, and in just a minute I’ll talk about how you can do this. But there are two reasons why this _might_ not be such a good idea…

-   Firstly, the free dyno limit applies to a Heroku _account_, and not to a Heroku _app_. And because each app must have at least one dyno (dynos are fundamental to app functionality), when you have multiple apps running off your account, there is no possible way of keeping all of them awake, all of the time – unless you’re willing to fork out for the privilege
-   Secondly, a single app might have multiple dynos. Examples of why it might be beneficial to have multiple dynos on a single app include scaling a web app to better handle a higher traffic volume, by increasing the number of web dynos; or decoupling the front and backend of your app to improve user experience, by running concurrent web and worker dynos, whereby the worker dyno will handle larger processing tasks in the background (a technique I used in my [Soccer Simulation](http://soccer-sim.herokuapp.com/) app). Currently it’s possible to allocate a maximum of two free dynos to a single app

However, if you are only running a single app with a single dyno from your Heroku account, you may as well get your money’s worth, and try to come as close as possible to maxing out your free dyno hours – and this means keeping your solitary dyno awake, round the clock. Oh yeah! Suck it, dyno!

**_Keeping your dyno awake_**

One way of preventing a dyno from sleeping is to ping it at set intervals using a web monitoring service, such as New Relic.

Below, I’ve given a set of instructions for how to use New Relic to keep your Heroku app awake, but I’ve kept it brief simply because these exact instructions may well become invalid in a day, a week, a month – who knows!

-   Create a New Relic account for free [here](https://newrelic.com/signup)
-   From the New Relic dashboard, click “Synthetics” from the horizontal menu at the top of the page
-   Click the “Create monitor” button in the top right corner of the page
-   Where it says “Select monitor type”, click “Availability”
-   Name your monitor (this is just for your personal reference), define the URL to be pinged (the URL of your Heroku app e.g. example-app.herokuapp.com), and specify an interval (30 minutes should suffice, as this corresponds to the time taken for a Heroku dyno to go to sleep)
-   Select a location – I just went for London, England, UK, being English and all – although I’m not sure how much it matters for our purposes here
-   Click “Save monitor”

Hopefully this article taught you something you didn’t already know, and if not, then I hope the dinosaur-related wordplay at least provided some level of amusement, and if not, then I’m sorry, I suppose.

And now, whenever you visit my [Soccer Simulation](http://soccer-sim.herokuapp.com/) app (come on, don’t pretend like it’s not already set as your homepage!) and it takes ages to load, rest assured that it’s not because the code is hideously unoptimised – no, it’s because nobody ever uses it. So there!
