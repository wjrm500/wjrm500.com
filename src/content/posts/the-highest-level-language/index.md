---
title: The Highest-Level Language
date: '2026-10-30T12:00:00Z'
description: Where I’ve landed on AI and software development at the end of October 2026 – what I pay less attention to now, what I pay more attention to, what it means for a team, what it costs, and why I’m betting on it anyway.
categories:
  - AI
  - Software Development
draft: true
---

Earlier this evening I watched a music video called _LGTM_. It’s genuinely brilliant, and (in a twist I’m choosing to find delightful) it was made with AI. It tells the story of a company that discovers AI can write its code, sacks its developers in a fit of efficiency, watches the code quietly rot, loses its production database to an over-privileged agent, and finally has to ring up the old developer and beg him to come back. I laughed. Lots of developers I know would have laughed harder, and I think I understand why.

The thing is, I don’t really recognise the world it describes. Not because nothing ever goes wrong with AI – it does, and I’ll get to that – but because most of the jokes are about AI as it was a year or two ago, and they land so well because they speak to a fear that a lot of developers have right now, which is that their jobs are next. I get the fear. I just don’t think the answer is to keep telling ourselves the robot can’t code. It can. The more useful question is what we do now that it can.

This is my third post in a row about AI, after [the one where a crypto miner moved into my server](/2025/04/21/how-vibe-coding-led-to-a-crypto-mining-attack-on-my-web-server) and [Land of Opus and Glory](/2025/12/20/land-of-opus-and-glory) last December, so I’ll try not to repeat myself. What I want to do here is write down, as plainly as I can, what I actually think about AI and building software at the end of October 2026. Not a love letter, and not a manifesto either. More of a position, with a date on it, so that I can look back in a year and see how wrong I was.

And to make sure it really is what I think, rather than what sounds good on the day, I did something slightly unusual. I keep a knowledge repository for my job, a big pile of meeting transcripts, messages, plans and notes, and I asked Claude to go through it and work out what I believe from what I’ve actually said and done over the last few months. Then I argued with it. What follows is what survived.

### What I’ve let go of

I’m a Lead Developer, so I need to be a little careful how I put this. But I’d rather be honest than sound sensible, so here goes.

**I don’t mind what language the code is in.** Gramlet, the word game I’ve been working on all year, is written in Node.js, and I couldn’t tell you why. If it had mattered I’d probably have picked Python, because that’s the one I actually know. At work everything is Java, and I haven’t learned any Java since I joined. I don’t feel bad about that, and I don’t think I need to.

**I think about architecture much less than I used to.** If someone tells me we have four controller classes, or an MVC architecture, or whatever else, it doesn’t really move me. That isn’t because architecture doesn’t matter. It’s because the architecture exists to serve the software, and code is so cheap to write and rewrite now that I’d rather spend my attention on what the software should do. If it does what users need, and it’s secure, reliable and quick, the architecture is probably fine. If it isn’t, the architecture can change.

**I don’t read much code.** I said this to someone at work in the summer and it still sounds odd out loud: on my own projects I haven’t really looked at the code in months. I check it through the tests, the behaviour and the questions I ask about it, not by reading it line by line.

I once wrote in a planning document that “the AI is the higher-level programming language”, and that’s still the best way I’ve found of putting it. We stopped writing assembly a long time ago, and nobody thinks less of a developer for not knowing which registers their Java ends up in. This feels like the same move, one more level up.

### What I pay more attention to

Letting go of those things has freed up attention for others, and these are the ones that matter to me now.

**The principles.** Good software is reliable, resilient, performant and secure, and it meets the needs of the people using it. Weirdly, I think knowing that these things exist and matter, and being able to tell when an answer is about them, gets you most of the way. I can tell Claude to make something more secure, read back what it tells me (asking it to explain again in plainer words if I need to), and push on the parts that don’t sound right. It’s a bit like being a decent CEO. You don’t need to know how everything works. You need to hire well, ask good questions and know what good looks like.

**The information it gets.** The thing I say most often to people who ask how to get good work out of AI is that it’s about what you give it. Give it enough context and a clear instruction and it can do almost anything now. Give it one file and a ticket and it will make mistakes, and you won’t trust it, and you’ll be right not to. I had a nice example of this recently: a design for a fairly hefty piece of work, put together with Claude from the source code and the business requirements, then explored for a good while by some very experienced developers. They mostly confirmed it. What they could have added – testing it against real data, in environments I couldn’t get to – was the part that depended on their access, not their judgement.

**The system around the model.** When the AI gets something wrong, I try not to fix the output. I fix whatever produced it: the instructions, the context, the checks. A review comment shouldn’t just change one pull request, it should change the rules the AI works to, so the same mistake doesn’t come back. And where a rule can be checked by a script, it should be a check, not a sentence, because sentences drift and checks don’t. (This blog has a script that fails the build if an em dash sneaks in. I am, apparently, that sort of person.)

Funnily enough, the setup I’ve ended up with at work looks a lot like the one I use at home. There’s a short set of core rules that always load, more detailed rules that load only when a task needs them, an index so nothing has to be read twice, and raw evidence kept separate from the tidy summaries built on top of it. It works really well for one person. Whether it’s the right shape for a team is a different question, and one I haven’t answered. Could the same thing live somewhere the whole team can reach, like Copilot Studio or a shared knowledge base that keeps itself up to date? I’ve tried bits of it, and some of it works and some of it hits walls. And what do teams that are further down this road actually do? From what I’ve read, the most advanced ones haven’t stopped reviewing code. They’ve changed how they review it, with people judging what a change is for and an AI reading every line. That feels like the right direction to me, though I’m not sure anyone has the finished answer yet.

### What it means for a team

This is where my day job comes in. I’m not trying to make developers a bit faster. I’m trying to close the gap between the people who understand what users need and the code running in production.

Think about everything that sits between someone talking to users and a change going live: the tickets, the handovers, the estimates, the sprints, the code itself. A lot of that exists because writing code used to be slow and expensive. It isn’t any more, and in the public sector the cost of everything in the middle lands on the taxpayer. So the developers I want to work with aren’t people who type features out by hand, or even people who sit there prompting an AI to build features one at a time. They’re people who build the system that lets code be produced safely and easily, so that product thinking turns into working software with as little in between as possible.

That changes what I look for in people. Which languages someone knows matters much less to me than how they think about AI and how they think about software in general. I’d rather work with someone who can talk sensibly about what makes a system trustworthy than someone who can recite a framework.

And the biggest obstacle in my experience isn’t culture or appetite. People want this. What holds it back, in the public sector at least, is access and permission, and how slowly both arrive. That part frustrates me more than any amount of bad AI code ever has.

### What it costs

None of this is free, and I’d be kidding myself to pretend otherwise.

**The gap between engineer and model is narrowing.** There is still a fair bit of back and forth between me and the AI on anything complicated, and that’s where the engineering skill lives right now. But there’s less of it with every new model. I’m a software engineer too, so I won’t pretend that’s comfortable, and I won’t pretend it stops with other people’s jobs.

**Understanding has to be kept up on purpose.** The higher up you work, the less low-level detail you carry around in your head. I built myself a little learning app at work for exactly this reason, so that I could keep a real grip on how our service works. I don’t use it yet. I keep meaning to. I’m so busy getting things done that learning keeps losing out, and that shows.

**It shows most in meetings.** Working with AI, I’m at my best asynchronously. I take a question away, run it past everything I know, and come back with a much better answer than I’d have given on the spot. But a lot of decisions get made in meetings, and a lot of how people see you comes from how you come across in them. The more abstract my work gets, the less I speak the same language as the developers in the room, and there are technical discussions now where, honestly, I don’t think we need to be having them at all. Write it down, give it to the model with the requirements, and let it make the call. I know how that sounds.

Then there’s the awkward bit. Sometimes the honest answer to a question is “I don’t know, but I’ll find out” – which, these days, means “I’ll ask my AI”. Saying that out loud is hard. There’s a bit of shame in it, and I don’t want people to think I just hand everything over to a machine, because that isn’t what happens. (I’m writing a separate post about exactly this, about what I actually did on Gramlet, and it’s more than you’d think.) I haven’t got this balance right yet, between working the way that gets the best results and being the kind of lead developer people expect to see in a meeting.

### The bet

So here’s the honest version. I sound very confident that all this works, and mostly I am. But it hasn’t been done before, not in the way I want to do it, and certainly not for long.

There’s no long-term evidence. A system built by hand twenty years ago that’s still running is real evidence that good engineering works. A system built mostly by AI has, at best, a few months behind it. It’s a bit like the new weight-loss drugs: everything looks great so far, but nobody can show you the twenty-year study, because there isn’t one yet. So in that sense it is a leap of faith, resting on the principles of what makes good software rather than on years of proof.

I’ve also changed my mind in public already. In September I told a room of developers that the human developer’s job would shift from writing code to validating it, and that the bar for that validation had to be high. A few weeks later I was planning for AI to do a lot of the reviewing too. Both were things I believed when I said them. I suspect this post will date in the same way, which is rather the point of writing it down.

And the stakes are lopsided. If the AI makes a critical mistake that takes a service down or lets someone in, it won’t matter how much good it did beforehand, or how much time it saved. You don’t survive that. So while you’re changing how a team works, you have to do it carefully: keep enough understanding to steer, build the checks before you need them, and earn trust in steps rather than assuming it.

### Where I stand

So, at the end of October 2026, this is what I think.

AI is the highest-level programming language we’ve got, and I’ve chosen to work at that level. I care less about how the code is written and more about the principles it has to meet, the information it’s built from and the system around it. I think teams should be built to close the gap between what users need and what ships, rather than to write code faster. I think this costs something, in understanding, in how you come across and in the work left for engineers, and I think it’s a bet without much history behind it.

I still think it’s the right bet. Ask me again next year.
