---
title: 'A Catan Love Story; or, As My Miller Father Used To Remind Us Regularly Over the Dinner Table: No Pain, No Grain'
date: '2022-03-10T16:15:53Z'
updated: '2022-08-22T23:50:20Z'
description: Old and wizened you must have grown since last I put fingertip to keyboard key, to persist my thoughts in the digital universe; like the great Dumbledore, siphoning off memories into his Pensieve. A quaint little article published all the way back in November 2021 was my last offering at the altar of Will May’s…
categories:
  - Python
  - Software Development
cover: ./me-vs-kate-catan-1.png
---

Old and wizened you must have grown since last I put fingertip to keyboard key, to persist my thoughts in the digital universe; like the great Dumbledore, siphoning off memories into his Pensieve. A [quaint little article](/2021/11/26/soccer-simulation-creating-the-team-formation-graphics) published all the way back in November 2021 was my last offering at the altar of _[Will May’s Journey to Educate Himself in Software Development](/)_ \*. What have you done in the intervening period? What wonders have you beheld? Come to mention it, what have I done? Well, I’ve not changed the world, but I _have_ got slightly fatter, so that’s something.

_\* The observant reader will notice how I inconspicuously slip in the name of my website to increase brand awareness. Tricks of the trade, my dears_

This is an article about my latest completed project: a Python implementation of the board game Catan, with a [Tkinter](https://docs.python.org/3/library/tkinter.html) frontend. If you’ve never played Catan, I highly recommend you give it a go – it’s compelling stuff. Between being introduced to it back in early 2021 and flying from London to Singapore in August that same year, I became gradually more and more enamoured with it, and during that 13-hour flight an intoxicating vision of a _digital_ version of Catan filled my head. Having little else to do to pass the time save helplessly tracing the excruciatingly slow progress of the plane sprite along its flight path, I abruptly unsheathed my laptop and set to work on Microsoft PowerPoint, that most bespoke graphic design tool. Over the course of two or three hours, I painstakingly rendered slide after slide of interlocking hexagons: visual aids in my attempt to figure out exactly how I’d go about writing a program that could generate a Catan board’s worth of hexagon vertex coordinates. A Singapore cent for the thoughts of any fellow passengers who happened to catch a glimpse of me and my laptop screen during the process; I likely appeared a lunatic, caught in a kaleidoscopic trance.

The flight landed and we were whisked away to our quarantine hotel. Here, deploying my latest project – [Soccer Simulation](https://soccer-sim.wjrm500.com/) – took precedence; the Catan idea was temporarily shelved. I returned to it later in August, and then sporadically again and again over the next few months, programming in bursts. It became a rather monstrous time sink: I made a total of 295 commits to the repository between August and December 2021. By early December, my wife Kate and I had already begun actively playing the game together on a single computer, with these sessions helping me to identify bugs and potential improvements. And by the turn of the year, all of the desired functionality had been implemented, and all of the visible bugs had been squashed: all that remained was to ship the code!

Because I’d designed the application using a bespoke client-server architecture from the outset, initial deployment wasn’t too onerous. I deployed the server-side code to a remote instance of [Amazon Lightsail](https://aws.amazon.com/lightsail/), and by downloading the client code from GitHub onto Kate’s computer, installing all of the dependencies and making some MacOS-specific code tweaks, we were able to play the game across multiple devices for the first time. That first cross-device game was a triumphant occasion – until it crashed, about ten minutes into play. “_Ah, yes_”, I said to Kate, who had turned to me with a look halfway between disappointment and disgust, “_Didn’t I tell you I programmed it to crash whenever I have no chance of victory?_”. The reality, of course, was that something was going awry, and try as I might, I couldn’t fathom what it might be. To this day I have very little idea; something to do with firewalls, I think.

Like any good developer, I lost patience and abandoned the project, and the game went into a state of dormancy. Kate and I stopped playing it, too: after having a taste of cross-device play, the idea of reverting to single-device play, with all the disadvantages that come with that, (primarily, that you can see exactly which resources are in your opponent’s hand at all times!) wasn’t overly enticing.

It was only a couple of days ago that I was able to muster up the motivation to return to the project. Tossing the whole remotely-hosted server thing into the bin, I modified the code to make the game playable across multiple devices _on the same network_, with the main client doubling up as a server through the magic of threading. Then I ran the application through the black box that is PyInstaller, and observed, with all of the tender affection of a parent at a childbirth, my lovely little executable file come into being. And thus, the project was finally complete!

**Visit [this page](/catan "this page") for instructions on how to download and set up the game**.

And now I will discuss my thoughts on the project a little further, resorting to interview form in a shamefaced way to avoid having to compose structured prose – which, to be fair, would probably be dull to write and even duller to read. So here we are:

\[REDACTED\]: “_Hey Will, nice to see you again_”

Will (me): “_Hi \[REDACTED\], same to you. Hope you and \[REDACTED\] have been keeping well?_”

\[REDACTED\]: “_Actually, \[REDACTED\] left me. But I’m coping. Anyway, great work on the Catan project! Looks fantastic. How did you find it?_”

Will (me): “_Ah, sorry that \[REDACTED\] left you. He / she / it was miles out of your league though, if we’re honest – I mean, just look at the state of you! As for the Catan project – I’m very proud of what I’ve produced, but it’s taken a lot of energy, and as has been the case with previous projects of mine, the code has become increasingly unstructured over time, to a point where it felt as though working on it was really reinforcing bad habits_”

\[REDACTED\]: “_True – maybe if I’d made more effort, \[REDACTED\] wouldn’t have left me. And maybe if you’d made more effort, your code wouldn’t have become such a cesspit! Why does this always happen to you, and what are you going to do to stop it happening in future?_”

Will (me): “_I’m not sure \[REDACTED\] leaving you was a function of your effort, or lack thereof. I think it had more to do with the fact that you’re just a figment of my imagination, and I think \[REDACTED\] is looking for something more substantial. With regards to my avoiding future code cesspits, I think there’s a couple of things I can do differently. Firstly, I need to think more carefully about what I want the end product to look like before I start coding, and focus more on creating some form of software architecture at this stage. More of a top-down approach is required, especially with multifaceted projects like this. Presumably such an approach would lead to more modular, maintainable code. Secondly, I need to reduce the scope of my ambition slightly – large projects like this are all well and good, but they don’t half drag on. I think it’s probably better for motivation (and learning) to work on lots of different, smaller personal projects._”

\[REDACTED\]: “_Wise words indeed. Although it’s rather rich of you to label me as a mere figment of your imagination. In this context both you and I are equals; but gutters through which our author and hallowed creator’s effluent may solemnly flow._”

Will (me): “_So I am not Will (me)?_”

\[REDACTED\]: “_You are Will, insofar as I am Will._”

Will (me): “_But everything I say is getting prefixed with_ ‘Will (me):’_!_”

\[REDACTED\]: “_A simple artefact of the interview form, I’m afraid to say. Think about it: if our creator hadn’t bestowed names upon us – if everything you said wasn’t prefixed with_ ‘Will (me):’ _and everything I said wasn’t prefixed with_ ‘\[REDACTED\]’ _– then this wouldn’t be an interview at all, really; just the ravings of a madman._”

Will (me): “_I see. Well, this is quite a blow to the ego._” 

\[REDACTED\]: “_Putting the nature of our very existence to one side for the moment, I’d like to ask you what aspect of the Catan project you’re most proud of_.”

Will (me): “_Definitely the canvas, with the drawing of the hexagons on the board and all of the action-bound animations that bring it to life. It took a huge amount of work, and really pushed my understanding of graphics_.”

\[REDACTED\]: \*nods\* “_How about the hardest thing?_”

Will (me): “_Besides the initial drawing of the hexagons, the client-server communication aspect was an interesting and novel challenge for me, in terms of learning about network sockets, building a bespoke messaging system on top of that, thinking about exactly what data should be transferred, how far the objects loaded into memory on the client should mirror the objects on the server, and the ‘state maintenance’ concerns that go along with that. But perhaps the most difficult single problem I faced from a logical perspective was defining an algorithm for calculating the longest road, which in a nutshell is the longest unbroken chain of road tokens on the board owned by a single player. The problem required a recursive solution, and I just couldn’t figure it out. Eventually I pinched a solution I found on GitHub, and integrated a slightly modified version of that into my own code!_”

\[REDACTED\]: “_INTERVIEW TERMINATED._”

Will (me): “_Charming!_”

**DISCLAIMERS:**

-   No copyright infringement is intended. This game is purely a personal project, and even if my implementation was polished enough to monetise (which, sadly, it is not), that would not be my intention.
-   I discovered a little while after starting the project that my work here is hardly pioneering – from a quick search on GitHub, I found that numerous programmers have, with varying degrees of sophistication, created digital versions of Catan in the past; and, of course, there is [the all-singing, all-dancing official digital version of the game](https://www.catan.com/catan-universe), which puts mine wholly to shame!
