---
title: Content Is Cheap
date: '2026-10-09T12:00:00Z'
description: Ten months ago I was wondering where I ended and the AI began. Now I lead a team of developers, the AI writes almost all of my code, and I think I've finally worked out what the job is. Spoiler – it isn't typing.
categories:
  - AI
  - Software Development
draft: true
---

Ten months have passed since I last did you a post, and in that time the robots have come on leaps and bounds. I, meanwhile, have come on a modest hop. I left you last Christmas in a mildly melancholic state, confessing that I no longer knew where I ended and the AI began. Eight months before that, a crypto miner had moved into my web server through a door I’d left wide open, and I’d used the occasion to question my entire self-worth in public. Two posts, two existential crises. It’s fair to say that the AI-related corner of this blog has not been a barrel of laughs.

So I’m pleased to report that this one is different. Not because the crisis has gone away exactly – more on that later – but because somewhere over the past few months, the fog has lifted a bit, and I think I’ve worked out what the job actually _is_ now. The answer, as is so often the case with the answers to big questions, is annoyingly simple, and it’s a phrase I’ve been repeating at work so often that my colleagues must surely be sick of it by now:

**_Content is cheap._**

Code, documents, emails, diagrams, ticket comments, training material, pull request descriptions – all of it is now cheap, in the way that a tin of beans is cheap. What isn’t cheap is the thinking: deciding what to build, in what order, and how you’d know if it was any good. That’s where all the value has drained to, like water to the lowest point of a field, and that’s where I spend my days.

Let me explain how I got here.

### From WordleWise to the real world

Most of what I’ve written about AI on this blog so far has involved my own personal projects – things like WordleWise and FantraXpert, apps whose user base can be counted on one hand and whose stakeholders are my wife and my mates. If I break WordleWise, the consequences are a mildly irritated wife and a gap in our streak data. If a crypto miner gets in, I _am_ the incident response team, and the post-mortem is a blog post.

This year, things changed. I’m now a Lead Developer, working on a real system with real users, real reviewers and real consequences, alongside a team of developers who had never seen a line of AI-generated code merged into their codebase before I turned up. It wouldn’t be professional to talk with great candour about the specifics, but I can talk about what it’s taught me, which is a lot. Because it turns out that “one man and his Claude” and “a team adopting AI” are two very different beasts. The first is a hobby. The second is a cultural shift, and cultural shifts, as anybody who has ever tried to get their family to load the dishwasher properly will attest, do not happen overnight.

### What my day actually looks like

Let me paint you a picture. It’s 9am. I am plodding along on a walking pad beneath my desk, dictating into a microphone like some sort of Victorian industrialist addressing his secretary, and four or five Claude Code sessions are whirring away in parallel on my screen. One is working on a pull request. One is drafting a reply to a comment on a design document. One is investigating why a piece of data looks wrong. One is rewriting a plan I wrote last week, because I’ve changed my mind about it. And one – my favourite – is keeping track of what all of the others are doing, so that I don’t have to.

From the outside, this looks a lot like delegation. A colleague could be forgiven for walking past and concluding that I’ve outsourced my entire job to a computer and am now simply getting my steps in. But it doesn’t _feel_ like I’m working any less hard than I used to. If anything, it’s the opposite. The robots do the typing, but the questions they put back to me are relentless, and every one of them needs a decision: is this the right priority? Is this the right shape? Is this actually true, or does it just sound true? Who needs to agree before we go ahead? It is decisions, all the way down, and decision-making is exhausting in a way that typing never was.

I used to measure a good day by how much code I’d written. Now I measure it by how many things I’ve moved along and how few of them I’ll have to move back.

### Trust is engineered, not read

Here’s the question that keeps me up at night, and it’s not “will AI take my job?” – I made my peace with that one some time ago. It’s this: _how do you trust code that nobody typed?_

The instinctive answer is that you read it. Every line. Like a diligent schoolteacher with a red pen, you pore over each pull request until you’re satisfied that every function does what it says on the tin. And for the very first AI-generated pull requests that land in a team, that is more or less what has to happen – trust has to start somewhere, and scepticism is the right default.

But it can’t be the end state, because the maths simply doesn’t work. A model can produce in half an hour what takes a human a day to review properly. If every line needs a human to read it, then all you’ve done is move the bottleneck from the writing to the reading, and given your reviewers a deeply unsatisfying new job as proofreaders for a machine. I said as much in a meeting not long ago, and I meant it: I don’t want people to have to read AI garbage that I’m just pumping out.

So what’s the alternative? Well, it’s the thing that has quietly made my own projects trustworthy for a while now, which is tests. Lots of them, at every level of the testing pyramid, running constantly, on every change. On my personal projects I have thousands, and they’re the reason I can deploy to production with a feeling of security even though, technically speaking, everything is vibe coded – because everything is _passing_. Tests are joined by linters, type checkers, written conventions that the AI reads before it starts, and a review process that scales with what a change touches rather than who, or what, wrote it. Together these form what people have started calling a _harness_: the scaffolding that surrounds the model and keeps it honest.

The harness is where trust comes from: a system in which bad code struggles to survive, whether or not anybody happens to read it. And building that system is the real engineering now. My worst nightmare is a codebase that blossoms into a sort of vibe-coded paradise, lush and verdant on the surface, with no roots to speak of – and then one day something goes wrong, and nobody can say why. The harness is how you stop that happening.

### Getting grilled

I’ll tell you about the first time I put an AI-generated pull request in front of a team that had never seen one before. It was, in a word, a grilling.

To be clear, the grilling was entirely fair. The pull request was large. The descriptions were verbose. The code was peppered with comments that read like they’d been translated from English into Corporate and back again. And then there was the vocabulary: one of my colleagues told me they’d spent the best part of a day scratching his head over a function that referred to something called a “named fact”. _What’s a named fact?_ they asked. Never heard of one. And quite right too, because nobody had – it was a term Claude had invented, fully formed, and woven so confidently into the code that it looked like it had always been there.

My first instinct, I’ll admit, was a slightly defensive one. My second, better instinct was to realise that every one of those review comments was valuable – just not in the way review comments used to be. In the old world, a review comment teaches a human developer something, and if you’re lucky they remember it next time. In the new world, the developer is a model with no memory whatsoever, and so a review comment that only fixes _this_ pull request is a lesson that evaporates the moment the conversation ends.

So now, every piece of review feedback produces two changes, not one: the fix itself, and a line added to the conventions file that the AI reads before it writes anything. The cure for “named fact” turned out to be a glossary of the words our team actually uses, which is a lot less glamorous than a cleverer prompt and a lot more effective. Review comments haven’t lost their value. If anything they’ve gained it, because a lesson learnt once is now a lesson learnt forever.

### When the robot fails, look in the mirror

One of my favourite observations from the past few months came out of a conversation about which parts of a codebase would be hardest for AI to work in. A colleague pointed out that there were certain services where, if the AI went anywhere near them, it would simply throw its hands up in despair.

If only! The frustrating thing about AI is that if it _did_ throw its hands up, it would be a lot more useful. What it does instead is produce a great deal of stuff that sounds plausible and doesn’t work, with the unwavering confidence of a pub quiz team captain who has never once been right about the capital of Australia.

Still, when an AI performs badly on a codebase, it is very often telling you something about the codebase itself. Inconsistent terminology, missing structure, logic smeared across five different places, a naming convention that changes every three files – a human developer who has worked on a codebase for years carries all of this around in their head and navigates it by instinct. A model arrives fresh every single time. It is, in that sense, the ultimate new starter, and if your codebase is impenetrable to a new starter, then it was always impenetrable; you just had people around who had learnt to live with it.

AI is an amplifier. It amplifies good engineering and it amplifies bad engineering, and it is completely indifferent as to which one it’s holding.

### A rule is not a check

This is perhaps the single most useful thing I’ve learnt this year, and I learnt it from building a system not for code but for myself.

Alongside the day job, I’ve built myself a kind of second brain: a Git repository that an AI keeps for me, containing everything I know about my work. Raw evidence goes into one layer and never changes. A distilled, current picture of each topic sits above it. Strategy and priorities sit above that. Every conversation I have with the AI is recorded and committed, automatically. It’s become the most useful tool I own, and building it taught me something slightly humbling about rules.

Early on, I gave the AI a lot of rules, written in lovely, clear English. Keep it short. Don’t repeat yourself. Don’t invent jargon. And it would follow them for a while, beautifully, and then slowly, imperceptibly, drift away from them, like a dinghy whose owner has forgotten to put the anchor down. I’d add another rule to correct the drift, and that rule would drift, and before long the rules file was the size of a small novel and being followed about as closely as the Highway Code on a Friday night.

At one point I had to sit my AI down and have a frank conversation about its prose. It had started making up strange, novel turns of phrase that I couldn’t parse at a glance, and even when there was basically nothing to say, it would still somehow write three paragraphs. It had developed favourite words. Things were “load-bearing”. Arguments were “carried”. It was like living with a management consultant.

What eventually worked was turning each rule into a _check_. Word limits on every file, enforced by a script that blocks a commit when a file grows past its budget – so adding anything means cutting something. A banned-phrase list, counted automatically across every conversation. A hard cap on how long a reply can be. A rule that can be checked mechanically should be a test, because a test doesn’t drift.

Which, you’ll notice, is exactly the same lesson as the harness. Whether it’s code or prose, you don’t make a model reliable by asking it nicely. You make it reliable by building something that tells it, unambiguously and every single time, when it’s wrong.

### The final ten per cent

Lest you think I’ve become insufferably evangelical, let me tell you about a training video.

Earlier this year I built a generator that produced a training video for a product entirely with AI: browser automation driving the real application, synthetic narration talking over the top, the whole thing stitched together without a human hand touching the edit. It came out at seventeen minutes long and I was, briefly, extremely pleased with myself. Then I measured it properly, and it turned out that over half of the runtime never actually showed the application at all. It was, to all intents and purposes, a narrated slide deck with a screenshot behind it.

The model was blameless here. We’d written the script first and then gone looking for footage to match, which is roughly the equivalent of writing the match report before kick-off. Reverse the order and the problem largely goes away – but no amount of model intelligence would have spotted that for us, because it was an editorial decision, not a technical one.

A few weeks and a model generation later, I tried again with a single, almost throwaway prompt, and what came back looked really good straight away. Astonishingly good, in fact. But then, as always, the final ten per cent took the longest: the container slightly in the wrong place, the narration slightly out of sync, a hundred little things that irked me on every viewing. AI gets you to ninety per cent at a speed that would have been unthinkable two years ago. The last ten per cent is still taste, and taste is still stubbornly, irritatingly human.

### What I’m still unsure about

I promised myself I wouldn’t make this post a tidy little sermon, so here are the things I haven’t worked out.

-   **My own understanding** – I am slightly worried that I’m drifting too far from the technical foundations a Lead Developer needs. I do a great job working asynchronously, with my robots and my second brain, but so many important decisions are made face-to-face, in real time, where there’s no AI to whisper in my ear. So I now treat understanding as something to work at deliberately, with a daily learning habit and visual primers on the parts of the system I can’t yet explain off the cuff. It is, I’m aware, slightly ironic to be using AI to teach me the things AI stopped me needing to know
-   **The gap between where I’m heading and where I am** – in private, I’ll happily tell you that we’re already past the point where anybody should be hand-writing or hand-reviewing code, and that the future isn’t coming, it’s already here. In a meeting room, with a team that has every right to be sceptical, I’ll tell you that the bar for human validation has to be high, for now. Both are true. The skill is in knowing which one to say to whom, and in making sure the second slowly turns into the first
-   **Last year’s evidence** – almost everything that was confidently known about AI-assisted development twelve months ago is now slightly out of date, and some of it is flat wrong. Designing for the models we have today feels like building a house for a child who will be a different size by Christmas. I try to design for the models of six months from now, and I’m not always sure that’s brave rather than foolish

### Final thoughts

Last December I wrote that a Senior Developer spends less time than a Junior Developer writing code, and a Lead Developer spends less than a Senior. I can now confirm, from the other side of that sentence, that it’s true – and that the time saved has a habit of finding new homes. It goes into deciding what’s worth building. It goes into building the harness that lets you trust what gets built. It goes into turning every hard-won lesson into something a machine can check, so that you only have to learn it once.

The developer of the future, I suspect, is less a writer of code and more a validator of it, and hopefully, as the models improve and our faith in them is earned rather than assumed, less and less of a validator too. That might sound bleak. A year and a half ago it felt bleak to me. But I’ve come to think that the typing was never really the point. It was just the most visible part of the job, in the same way that the goals are the most visible part of football, and nobody ever won a league by only practising their finishing.

Content is cheap. Thinking is dear. Spend accordingly.

Before I go, I owe you a progress report on the manifesto I scribbled at the bottom of the crypto mining post:

-   **Leverage the power of AI to do cool things** – ✅ Very much so
-   **Be completely transparent about my use of AI** – ✅ Hence this post
-   **Keep certain things completely AI-free, including the text content of articles in this blog** – ah. About that…
-   **Do not fear the machine** – ✅ Mostly. Ask me again after the next model release

Thanks for reading, and if you’ve got thoughts, disagreements or a strong opinion on the capital of Australia, please pop me an email at wjrm500@gmail.com!
