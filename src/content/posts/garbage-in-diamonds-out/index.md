---
title: Garbage In, Diamonds Out
date: '2026-10-09T12:00:00Z'
description: Ten months on from Land of Opus and Glory, and a few months into life as a Lead Developer, here’s where I’ve landed on building software with AI – mostly on the matter of what you feed it, and partly on what I’ve lost along the way.
categories:
  - AI
  - Software Development
draft: true
---

Ten months have passed since I last did you a post, which by the standards of this blog is practically punctual. Much has happened in that time, the most significant development being that since the summer I’ve been a Lead Developer in the UK Civil Service – a title I still try out on myself in the mirror occasionally, like a footballer who has just been handed the captain’s armband and isn’t entirely sure which arm it goes on.

As I say on my [Developer Story](/developer-story) page, it wouldn’t be professional to talk with great candour about a current role here, so you won’t find any tales from the office in this article. What I can tell you is that AI is now woven through more or less every hour of my working day, as it is through a worrying proportion of my evenings, and that my thinking about building software has shifted quite a bit as a result. In April last year I wrote a rather glum piece about [a crypto miner moving into my web server](/2025/04/21/how-vibe-coding-led-to-a-crypto-mining-attack-on-my-web-server), and in December I confessed in [Land of Opus and Glory](/2025/12/20/land-of-opus-and-glory) that I no longer knew where I ended and the AI began. This is the third instalment in what is apparently now a trilogy. I’m hoping for _The Return of the King_ rather than _The Godfather Part III_, but you can be the judge of that.

### The Poirot problem

Imagine you’ve hired Hercule Poirot. You’ve paid his considerable fee, you’ve tolerated the moustache, and now you lock him in a broom cupboard with a single page torn from the middle of the case file – a page, let’s say, concerning the butler’s dental appointments – and ask him to solve the murder.

Some time later you open the door. Does Poirot emerge, sigh, and announce, “_Mon ami_, I have insufficient information”? He does not. His little grey cells abhor a vacuum. He names a murderer, with a flourish, and walks you through a beautifully structured account of means, motive and opportunity. It was the vicar.

It was not the vicar. There is no vicar.

That, more or less, is the experience of working with a large language model that can’t see what it needs to see. If it threw its hands up and admitted defeat, it would honestly be a lot more useful. What it does instead is produce a great deal of stuff that sounds entirely plausible and doesn’t work: code that calls a function nobody wrote, a fix for a bug that lives somewhere else, a confident explanation of a business rule that the business abandoned two years ago. And then you stop trusting it, and you tell your friends it’s overhyped, and you go back to doing everything by hand, feeling vindicated.

So when people ask me how to get good work out of AI, I always give the same answer: it’s about the information that you give it. If you give it enough context and a clear instruction, it can basically do almost anything now. But if you’re uploading a single file, or it has no background layer of context, or all it’s got is the information in the ticket, then it’s going to make mistakes, and you’re not going to trust it. That’s where human judgement comes in – and most of that judgement, it turns out, is about what to put in front of the machine in the first place.

### Seven Horcruxes and a man called Dave

The information never lives in one place. In every organisation I’ve ever come across, the knowledge you need to make a change safely has been split, Voldemort-style, into seven pieces and hidden in unlikely spots: a bit in the code, a bit in the ticket, a bit on a wiki page last edited during the Johnson administration, a bit in an email thread, a bit in a chat message with a thumbs-up reaction and no reply, a bit in a meeting that nobody minuted, and the most important bit of all in the head of a man called Dave, who is currently on annual leave in Lanzarote.

A model that sees one of those fragments is Poirot in the cupboard. A model that sees all of them, on the other hand, is a frankly alarming thing to behold. On my own projects, I can paste a vague bug report – something on the level of “the confetti didn’t go off” (the sort of message I’d expect from my wife if [WordleWise](/2025/12/23/wordlewise-ui-ux-updates) ever malfunctioned during one of her rare victories) – into a session that can see the whole repository, and more often than not it goes straight to the offending line before I’ve finished my tea. Combining different information sources is the big thing for me now.

I should say that I find this marvellous and slightly deflating in roughly equal measure. There was a time when finding that bug would have been my evening, and I’d have come out the other end knowing the code a little better. Now I come out the other end knowing where the code is, which isn’t quite the same thing. I’ll come back to that.

### Garbage in, diamonds out

The oldest law in computing is _garbage in, garbage out_. Charles Babbage was once asked whether, if you put the wrong figures into his machine, the right answers would come out, and he declared himself “not able rightly to apprehend the kind of confusion of ideas that could provoke such a question”. A hundred and sixty-odd years later, we have finally built a machine that will cheerfully have a go.

I’ve been tinkering with a little knowledge system of my own, and in a moment of marketing genius worthy of the _Dragons’ Den_ pitch that gets five “I’m out”s, I summarised its goal as _garbage in, diamonds out_. The idea is that I can throw in raw, messy material and get gold back. It mostly works, and the reason it works is instructive: the diamonds only come out because all the garbage is in there _together_. A diamond, after all, is just a lot of carbon that’s been in the right place for long enough.

The flipside is that when an AI tool performs badly on a codebase, it’s sometimes a reflection of the codebase itself. If the same concept is called a customer in one file, a client in another, a user in a third and a “punter” in a comment clearly written at two in the morning, the model has to guess which is which, and it will guess with Poirot-like confidence. Likewise when the folder called `utils` has quietly become a second application. A messy codebase is a poor informational environment, and you get out what you put in. A decent test, before blaming the model, is to ask whether a new human starter would fare any better. If the answer is that they’d need three weeks and a guided tour from Dave (back from Lanzarote, nicely bronzed), the model never stood a chance. Having produced my fair share of cesspits over the years – see [Catan](/2022/03/10/a-catan-love-story), see [Bargain Basement](/2021/04/05/bargain-basement) – I say this with no great sense of superiority.

### Content is cheap

I always say that content is cheap in this day and age. Code, documents, plans, tests, release notes, an email declining a meeting in the tone of a regretful Victorian aunt: all of it can now be produced in seconds and in more or less unlimited quantity. For most of my career, I _was_ the content. Now the content is the cheap bit, and the bit where I need to be involved is the thinking: the prioritisation, the strategy, deciding what should exist at all, and all the other higher-level stuff the content is supposed to serve.

There is an asterisk, though. Cheap content is only good content if the inputs are good. It’s a bit like being a football club with a bottomless transfer budget. Wonderful, in theory. But if your scouting department is one man watching highlight reels on YouTube, you will spend a billion pounds and end up with forty-three midfielders, eleven goalkeepers and no idea what your best team is. I won’t name names. (Chelsea.)

The scarce resource there was always the scouting, and it’s the same with code: what’s scarce now is knowing which lines you need, which comes straight back to information. Give the machine the whole picture and cheap content becomes a superpower. Give it a ticket and a prayer, and you get forty-three midfielders.

### Trust is engineered, not read

Which brings me to trust. When code arrives that nobody typed, the instinctive response is to read every line of it. That’s an admirable instinct and a doomed one: reading every line of AI-generated code, forever, is like reading the terms and conditions – technically possible, morally commendable, and something nobody has actually done since about 2009.

The way out, I think, is to stop trying to _read_ your way to trust and start _engineering_ it. That means automated tests at every level of the testing pyramid – unit, integration, end-to-end (the robot podcast hosts I [wrote about](/2025/05/04/listen-to-the-robots-and-thou-shalt-prosper) last year would be thrilled to know the distinction finally stuck). On my own projects, I can now deploy to production with a real feeling of security, even though everything is vibe coded, because everything is passing. Five years ago, “everything is vibe coded” and “a feeling of security” would not have appeared in the same sentence, unless that sentence was a confession.

Tests are half of it. The other half is writing your conventions down somewhere the AI will actually read them so that it starts each piece of work already knowing the house rules. And when a review turns up a problem, the fix shouldn’t just go into the code; the lesson should go into the system, as a new test or a new convention, so that it outlives the pull request. Otherwise you’re Bill Murray in _Groundhog Day_, waking up to Sonny and Cher every morning and correcting the same mistake for what feels like ten thousand years.

One lesson from building my own system took me a while to learn: rules written in English drift. You write a perfectly sensible sentence in a conventions file, and three weeks later it’s being half-followed, then quarter-followed, then interpreted with a sort of lawyerly creativity. A rule that can be checked mechanically is a check, not a sentence. This very blog, for instance, has a script that fails the build if it finds an em dash anywhere, because I prefer a spaced en dash and I am, it turns out, that sort of person.

None of this is new, of course. AI-generated code is just code, and all of the standard rules of what makes good software still apply. If anything, the machine has made the boring disciplines matter more, because they’re now doing the job that a human reading every line used to do.

### What the hands knew

I’ve been fairly upbeat so far, so let me be honest about the other side of the ledger.

When I wrote about feeling deadened back in April 2025, it was never really about typing. Nobody misses typing. It was about control, and about closeness: being near to how things actually work, knowing a system because you built it with your own hands. I could still tell you, five years on, why the back four in my [Soccer Simulation](/2021/11/26/soccer-simulation-creating-the-team-formation-graphics) formation graphics sit where they do on a 32-unit canvas. I couldn’t tell you very much at all about the frontend of [FantraXpert](/2025/10/27/fantraxpert-a-fantasy-football-data-dashboard), a jungle of JavaScript that Claude grew under my nose and that I’ve barely deigned to inspect. Both of them work. Only one of them is _mine_ in that old, warm, “I can’t believe I did this” sense.

And as a Lead Developer, that closeness isn’t a sentimental luxury. I’m slightly worried that I’m moving too far away from the technical foundations the role needs. I sometimes wonder what I would do without AI, and I don’t much like the answer; you end up becoming so dependent on these things. I’d love to be able to spend an evening, or ten, properly learning Java, rather than learning just enough to know whether the thing in front of me looks right. It’s a weird world we’re living in now.

What I’ve started doing about it is treating understanding as something I have to go and get on purpose, rather than something that accrues as a side effect of doing the work. When there’s something I’m working with but don’t really understand, I get the machines to build me a visual primer and I sit with it until I do understand. The irony of using AI to claw back the understanding that AI took away is not lost on me. It helps. It doesn’t fully fix it, and I’m not sure anything will.

### The future is already here

Now for the bit where I make enemies.

In that crypto mining post, I wrote that humans would eventually be untethered from the code, “probably sooner than most developers are willing to admit”. Well. It was sooner. I think we’re already well past the point where anybody should be hand-writing or hand-reviewing code as a matter of course. The future is already here; it’s just been sitting quietly in a terminal, waiting for us to notice.

The developer’s job is changing from writing code to validating it, and – this is the part people tend to miss – validation itself shrinks as trust is earned. Every test, every mechanical check, every convention the machine reliably follows is a little bit of reviewing you no longer have to do with your own eyes. What’s left for the human is the information, the checks and the decisions: getting the whole picture in front of the model, building the safety net that lets you trust what comes out, and deciding what’s worth building in the first place. You don’t necessarily need to understand all of the lower-level details anymore. You do need to understand best practices and the core principles, because those are what tell you whether the safety net has holes in it.

The ground keeps moving, too. A lot of established knowledge, even knowledge about AI from a year ago, just isn’t as relevant now. My 2023 article on [stuffing my source code into a pair of .txt files](/2023/11/22/how-chatgpts-new-gpts-feature-can-help-you-develop-software) so that a custom GPT could read them now reads like a guide to churning butter. I fully expect this article to suffer the same fate, probably by Christmas.

And there’s plenty I’m unsure about. I don’t know exactly how much of the lower-level detail a lead developer can afford to let go of, and I suspect I’ll find out the hard way. Nor do I know how fast a team that’s new to all this can responsibly move. What I do believe is that a team’s initial scepticism is the right starting point. Trust has to be earned with evidence – tests that pass, checks that bite, a track record – and nobody should be expected to take it on faith because a man with a blog sounded confident. Poirot sounded confident, too.

Thanks for reading. If you think I’ve got any of this wrong, please do pop me an email at [wjrm500@gmail.com](mailto:wjrm500@gmail.com), with as much context as you can muster. Otherwise I’ll just assume it was the vicar.
