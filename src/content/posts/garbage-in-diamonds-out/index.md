---
title: Garbage In, Diamonds Out
date: '2026-10-09T12:00:00Z'
description: Ten months ago I didn’t know where I ended and the AI began. Now the AI writes almost everything I produce at work, and I’ve come to believe the thing that matters most isn’t the model at all – it’s what you feed it.
categories:
  - AI
  - Software Development
draft: true
---

Ten months have passed since I last did you a post, and in that time the robots have come on leaps and bounds. I, meanwhile, have come on a modest hop. I left you last Christmas in a mildly melancholic state, confessing that I no longer knew where I ended and the AI began. Eight months before that, a crypto miner had moved into my web server through a door I’d left wide open, and I’d used the occasion to question my entire self-worth in public. Two posts, two existential crises. It’s fair to say that the AI-related corner of this blog has not been a barrel of laughs.

Those crises were never really about typing, by the way. Nobody grieves for the act of pressing keys. They were about control – about the slow, creeping realisation that I was no longer the person who knew exactly how my software worked, because I was no longer the person who had built it, brick by brick, with my own two hands. There’s a particular kind of satisfaction in being close to the machine: in knowing why a query is slow before you’ve even looked at it, in carrying a map of a codebase around in your head. And I could feel that closeness slipping away.

I’d love to tell you that I’ve since found a way to get it back. I haven’t, not really. But I have, over the past few months, worked out what I think the job _is_ now, and it has made the loss a lot easier to live with. So this post is about that. It’s also about the single most important lesson I’ve learnt about working with AI, which is the one in the title.

### From WordleWise to the real world

Most of what I’ve written about AI on this blog so far has involved my own personal projects – things like WordleWise and FantraXpert, apps whose user base can be counted on one hand and whose stakeholders are my wife and my mates. If I break WordleWise, the consequences are a mildly irritated wife and a gap in our streak data. If a crypto miner gets in, I _am_ the incident response team, and the post-mortem is a blog post.

This year, things changed. I’m now a Lead Developer, working on a real system with real users and real consequences, in an organisation where the knowledge needed to do anything useful is scattered across code repositories, ticketing systems, wiki pages, email threads, chat messages, meeting recordings and the heads of a few dozen people. It wouldn’t be professional to talk with great candour about the specifics, but I can talk about what it’s taught me, which is a lot.

### What my day actually looks like

Let me paint you a picture. It’s 9am. I am stomping away on a walking pad beneath my desk like a hamster who’s just remembered he left the oven on, dictating into a microphone, and the first thing I do is open what I call my orchestration session. I tell it the date and roughly what’s on my mind, and it comes back with the state of play: what’s changed since yesterday, what’s waiting on me, and a handful of pieces of work that could be getting on in parallel. I pick the ones I want – my reply is often little more than “A and C” – and it writes me the prompts to spin up four or five more Claude Code sessions, each with its own job.

On a typical day those jobs might include: writing prompts for the AI assistants that live inside our corporate tools, which can see our tickets, wiki pages, emails and chat, to find out what’s happened while I wasn’t looking; turning the transcript of yesterday’s meeting into updated notes and a list of actions; drafting replies to the comments people have left on a design document; implementing a change and opening a pull request; and building me an illustrated primer, diagrams and all, so I don’t walk into a meeting on a topic I only half understand. At the end of the day, a final session checks that everything has been captured and nothing has been left dangling.

Anybody peering over my shoulder (not that anyone can – I work from home most of the time) would probably conclude that I’ve outsourced my entire job to a computer and am now simply getting my steps in. But it doesn’t _feel_ like I’m working any less hard than I used to. If anything, it’s the opposite. Every one of those sessions comes back to me wanting something: a choice from a numbered menu of next steps, a yes or no on a draft before it goes out under my name, a correction when it’s wandered onto somebody else’s turf or misread what I meant. Multiply that by five sessions, switching between them all day long, and you end up making more decisions before lunch than I used to make in a week. Decision-making is tiring in a way that writing code never was.

### Content is cheap

That brings me to the phrase I’ve been repeating at work so often that my colleagues must surely be sick of it by now: **_content is cheap_**.

Code, documents, emails, diagrams, ticket comments, pull request descriptions – all of it is now cheap, in the way that a tin of beans is cheap. If we have a clear idea of what a solution looks like, producing it is something I can hand to Claude, and it’ll have it done in the background in half an hour. What isn’t cheap is everything that comes before that point: deciding what to build, in what order, and why. That’s where all the value has drained to, like water to the lowest point in a field.

But “content is cheap” comes with a rather large asterisk, and the asterisk turns out to be the most important thing in this entire post.

### Garbage in, diamonds out

Cheap content is only worth having if it’s _good_ content, and in my experience the biggest single factor in whether an AI produces something good isn’t the model you’re using or how cleverly you’ve worded your prompt. It’s the information you give it.

It’s the key message I always try to give people. If you give it enough context and a clear instruction, it can do almost anything now. But if you upload a single file, or all it can see is the text of one ticket, then it’s going to make mistakes, and you’re not going to trust it – and you’ll be right not to. Asking a model to make good decisions about a system it can only see a sliver of is like tearing a page out of the middle of an Agatha Christie novel and asking somebody who the murderer is. They’ll give you an answer, and they’ll sound terribly sure of themselves. Even the finest striker in the world looks pretty ordinary if nobody passes him the ball.

So most of my energy this year hasn’t gone into prompting at all. It’s gone into building the informational environment the AI works in. On my machine, every one of our code repositories sits side by side in a single folder, alongside a knowledge repository I’ve built: a Git repository that an AI keeps for me, containing everything I know about my work. Raw evidence goes into one layer and is never edited – meeting transcripts, email threads, the answers that come back from those corporate AI assistants. A distilled, current picture of each topic sits above that, and strategy and priorities sit above that. Every conversation I have with the AI is recorded and committed automatically, so nothing I say is ever lost.

When I first started building it, I wrote down one goal: _garbage in, diamonds out_. I wanted to be able to paste in anything – a messy transcript, a half-finished email chain, a screenshot – without tidying it up first, and trust the system to work out what mattered and where it belonged. I also wanted the system, not me, to be the thing that noticed when it was out of date and went looking for more. For a while, keeping it fed made me a sort of human USB cable, ferrying prompts from Claude into the corporate assistants and copying their answers back again, but even that was worth it.

The results have been, frankly, a bit startling. Paste a bug report into a session that has the right repository to hand, and more often than not it pinpoints the problem almost instantly. Cross-reference the code against the ticketing system and you discover that a feature everyone had written off as pie in the sky has in fact already been specified in seven separate tickets that nobody had ever connected. And the counter-examples are just as instructive: the one time I had a prototype built without the AI reading the wiki page that held the answer, a colleague spotted the gap the moment they saw it. Same model, same prompt style; different information, completely different outcome.

The upshot is that, even on topics where I’m only watching from the sidelines, I can now make useful contributions, because the AI is reviewing things in the context of everything else that has ever been said about them – the relevant code, the relevant conversations, the relevant decisions. It’s also left me in the slightly uncomfortable position of my AI being better informed about my job than I am, which is either a triumph of engineering or a damning indictment, depending on how charitable you’re feeling.

### When the robot fails, look in the mirror

One of my favourite observations from the past few months came out of a conversation about which parts of a codebase would be hardest for AI to work in. The frustrating thing about AI is that if it threw its hands up in despair when it was out of its depth, it would actually be a lot more useful. What it does instead is produce a great deal of stuff that sounds plausible and doesn’t work.

But when an AI performs badly on a codebase, it is very often telling you something about the codebase itself. Inconsistent terminology, missing structure, logic smeared across five different places, a naming convention that changes every three files – a human developer who has worked on a codebase for years carries all of this around in their head and navigates it by instinct. A model arrives fresh every single time. It is, in that sense, the ultimate new starter, and if your codebase is impenetrable to a new starter, then it was always impenetrable; you just had people around who had learnt to live with it.

Which is really the same lesson as before, wearing a different hat. A messy codebase is a poor informational environment. Garbage in, garbage out.

### Trust is engineered, not read

Here’s the question that keeps me up at night, and it’s not “will AI take my job?” – I made my peace with that one some time ago. It’s this: _how do you trust code that nobody typed?_

The instinctive answer is that you read it. Every line. And when a team is merging AI-generated code for the very first time, that is more or less what has to happen – trust has to start somewhere, and scepticism is the right default. But it can’t be the end state, because the maths simply doesn’t work. A model can produce in half an hour what takes a human a day to review properly, and if every line needs a human to read it, all you’ve done is move the bottleneck from the writing to the reading.

So what’s the alternative? Well, it’s the thing that has quietly made my own projects trustworthy for a while now: tests. Lots of them, at every level of the testing pyramid, running on every change. On my personal projects I have thousands, and they’re the reason I can deploy to production with a feeling of security even though, technically speaking, everything is vibe coded – because everything is _passing_. Add linters, type checkers, written conventions that the AI reads before it starts, and a review process that scales with what a change touches rather than who or what wrote it, and you have what people have started calling a _harness_: the scaffolding that surrounds the model and keeps it honest.

The harness is also where review feedback goes now. A review comment used to teach a human developer something, and if you were lucky they remembered it next time. A model has no memory whatsoever, so a comment that only fixes _this_ pull request is a lesson that evaporates the moment the conversation ends. These days every piece of feedback should produce two changes: the fix, and a line in the conventions file the AI reads before it writes anything. Review comments haven’t lost their value. If anything they’ve gained it, because a lesson learnt once becomes a lesson learnt forever.

### A rule is not a check

The knowledge repository taught me one more thing, and it was slightly humbling.

Early on, I gave the AI a lot of rules, written in lovely, clear English. Keep it short. Don’t repeat yourself. Don’t invent jargon. And it would follow them for a while, beautifully, and then slowly, imperceptibly, drift away from them, like a dinghy whose owner has forgotten to put the anchor down. I’d add another rule to correct the drift, and that rule would drift too, and before long the rules file was the size of a small novel and being followed about as closely as the Highway Code on a Friday night.

At one point I had to sit my AI down and have a frank conversation about its prose. It had started making up strange, novel turns of phrase that I couldn’t parse at a glance, and even when there was basically nothing to say, it would still somehow write three paragraphs. It had developed favourite words. Things were “load-bearing”. Arguments were “carried”. It was like living with a management consultant, and I came very close to switching to a different model altogether.

What eventually worked was turning each rule into a _check_. Word limits on every file, enforced by a script that blocks a commit when a file grows past its budget, so that adding anything means cutting something. A banned-phrase list, counted automatically across every conversation. A hard cap on how long a reply can be. A rule that can be checked mechanically should be a test, because a test doesn’t drift.

Whether it’s code or prose, you don’t make a model reliable by asking it nicely. You make it reliable by building something that tells it, unambiguously and every single time, when it’s wrong.

### What I’m still unsure about

I promised myself I wouldn’t make this post a tidy little sermon, so here are the things I haven’t worked out.

-   **The closeness I’ve lost** – this is the big one, and I don’t want to pretend it away. I am slightly worried that I’m drifting too far from the technical foundations a Lead Developer needs. There are parts of our system I’ve shaped without ever having had my hands inside them, and so many important decisions are made face-to-face, in real time, where there’s no AI to whisper in my ear. So I now treat understanding as something to work at deliberately, with a daily learning habit and visual primers on the parts of the system I can’t yet explain off the cuff. It is, I’m aware, slightly ironic to be using AI to teach me the things AI stopped me needing to know. And it isn’t the same as the old kind of knowing, the kind you earn by getting your hands dirty. I’m not sure anything will be
-   **How fast to go** – I believe we’re already past the point where anybody should be hand-writing or hand-reviewing code as a matter of course. I also believe that a team merging AI-generated code for the first time is right to set a high bar for human validation, for now. I don’t think those two beliefs contradict each other – one is the destination and the other is the starting point – but getting from one to the other means earning trust with evidence, one change at a time, and I don’t yet know how quickly that can responsibly happen
-   **Last year’s evidence** – almost everything that was confidently known about AI-assisted development twelve months ago is now out of date, and some of it is flat wrong. Designing for the models we have today feels like buying school shoes for a child who will be a different size by Christmas. I try to design for the models of six months from now, and I’m not always sure that’s brave rather than foolish

### Final thoughts

Last December I wrote that a Senior Developer spends less time than a Junior Developer writing code, and a Lead Developer spends less than a Senior. I’d go further now. I think the job of a software developer is changing more profoundly than at any point since we stopped punching holes in cards. The developer of the future won’t be a writer of code at all, and before long won’t be much of a reader of it either. They’ll be the architect of the environment in which code gets written: the curator of the information the machine works from, the builder of the checks that decide whether its output can be trusted, and the person who decides what’s worth building in the first place. Get the environment right and you get diamonds. Get it wrong and no model on Earth will save you.

I don’t think that makes what we’ve lost any less real. The pleasure of building something with your own hands, of being close enough to the machine to feel it working, is a real thing, and I miss it. But I’ve stopped believing it was the whole of the job. Content is cheap. Information is precious. Thinking is dear.

Before I go, I owe you a progress report on the manifesto I scribbled at the bottom of the crypto mining post:

-   **Leverage the power of AI to do cool things** – ✅ Very much so
-   **Be completely transparent about my use of AI** – ✅ Hence this post
-   **Keep certain things completely AI-free, including the text content of articles in this blog** – ah. About that…
-   **Do not fear the machine** – ✅ Mostly. Ask me again after the next model release

Thanks for reading, and if you’ve got thoughts or disagreements, please pop me an email at wjrm500@gmail.com!
