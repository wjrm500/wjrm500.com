---
title: 'Claim. Spell. Delegate.'
date: '2026-10-09T12:00:00Z'
description: In ten months I turned a forgotten 2022 word game into Gramlet, with 316,000 lines of code, eight game modes and a charity pot. I wrote 115 of those lines myself. So what exactly did I do? I got Claude to go through all 1,609 of our conversations and find out.
categories:
  - AI
  - Software Development
draft: true
---

Last December, in a [rambling ode to Claude Opus 4.5](/2025/12/20/land-of-opus-and-glory), I joked that I’d keep using Claude Code to build stuff “until of course I forget what code looks like completely and have an identity crisis”.

Reader, I have forgotten what code looks like.

Between February and October this year, I typed **115 lines of code** for the word game I’ve been working on. Not 115 a day, or 115 a week. 115, total, and most of those were me nudging a margin by a few pixels or fixing a typo in the update log. Over the same period the codebase grew to around **316,000 lines**.

The game is called **[Gramlet](https://gramlet.co.uk)**, and if you’ve been reading this blog for a while you might remember its ancestor: [Anagramageddon](/2022/12/08/anagramageddon-fight-for-territory-and-find-anagrams-as-you-battle-against-the-clock), a scrappy little two-player game I built by hand back in 2022, with a 200-line JavaScript file I described at the time as “something of an abomination”. It sat more or less untouched for nearly three years. Then Claude Code on the web arrived, and last December I picked it back up, and things got slightly out of hand.

This article is my attempt to work out what, if anything, I can still take credit for.

### What even is Gramlet?

Gramlet is a daily word game. You claim letters on a grid, one at a time, always next to one you already own, and after each claim you spell a word from your growing bank of letters. That’s the core of it, and it’s the bit I came up with in 2022. Everything else has grown around it since, mostly by asking “what if?”. What if the clock was ticking? What if you couldn’t see the whole board? What if some letters were worth more than others? What if your opponent was a bot? Most of those questions turned into a game mode of their own. The one to start with is Volt, where your score is multiplied by a bar that drains while you think.

![Three phone screenshots of Gramlet. The first shows the Timeless grid, with a cluster of claimed letters in the top-left corner and the rest hidden under padlocks. The second shows the letter bank, where you spell a word from your claimed letters. The third shows Volt, with the surge bar running down the left-hand side of the grid.](./gramlet-screens.png)
_Timeless mid-game, spelling a word from the letter bank, and Volt with its surge bar_

Give it a go at [gramlet.co.uk](https://gramlet.co.uk) – no account needed. My wife has been its chief tester since January. She finds a lot of the bugs that only show up on an iPhone.

### Asking the robot about the robot

Here’s how I went about this. I asked Claude to analyse every single Claude Code session I’ve had on Gramlet, the whole git history and the GitHub pull requests, and to tell me honestly what I’d contributed. I am aware that AI has a taste for sycophancy, so I asked it to back every claim with evidence from the data.

Getting hold of the data took a bit of fiddling. My sessions live on Anthropic’s servers, and the only way Claude could read them from inside its sandbox was a hundred events at a time, through a tool only the model could call. Every page meant another trip through the model. It estimated a full extraction would cost around a billion tokens, and kept gently suggesting it might eat my entire weekly usage allowance. By the next morning I’d had enough:

> definitely not, please stop threatening to use all of my usage, that is never going to be an option

In the end I sat down at my laptop, opened Claude Desktop, and it wrote a script that ran in my Chrome tab and pulled down the lot: **1,609 sessions, 6.4 GB of transcripts**, and the download itself used no tokens at all.

### The numbers

Here’s the headline stuff, from December 2025 (when Claude got involved) to the start of October 2026:

-   **9,538 commits** to master, about 2,190 pull requests and 948 GitHub issues
-   **1,609 Claude Code sessions**, on 267 of roughly 290 days
-   **9,654 messages** typed by me, adding up to about **438,000 words**, roughly five novels’ worth
-   **About 99%** of the code added since December was written by an AI
-   **43%** of the codebase is now tests. In 2022 it was zero

So the AI wrote the code. The more interesting question is what I was doing with all those words.

### Five versions of me

Reading back through ten months of my own messages was a strange experience, a bit like finding an old diary, if your diary was mostly you swearing at a robot about a word game. But a pretty clear story emerged, in five chapters.

**Pair programmer (December to January).** I was still a developer, just with a very fast colleague. I ran the app on my Windows laptop, pasted stack traces back into the chat, tweaked CSS by hand and wrote some of the end-to-end tests myself. My prompts were proper specifications, a median of 33 words a message, and the AI was mostly doing what it was told. Not that I was always patient while it did:

> Literally just write the f\*cking code already there is no way to exit plan mode, so can you just get on with it

**Product manager (February to April).** I stopped committing code around the middle of February and didn’t really notice. I was too busy arguing. This was the era of me checking every claim it made, and of a fairly relaxed attitude to risk:

> I can’t be arsed with a follow up pr / migration to remove the allowlist, it isn’t that big a deal if sh\*t f\*cks up as we’ve only got about five users

It was also when I started asking it to review its own work. On the last day of January I told it: “as of this moment, right now, you are no longer the code author, you are the code interrogator”. By May that prompt had become a permanent “engineering lead” skill, and by August a hook that physically blocked Claude from finishing a pull request until it had interrogated itself. A little bit of me lives on in that hook.

**Reviewer on a phone (May to July).** Claude Code works on mobile, and I discovered that I could ship features from bed. In March, 13% of my sessions were started from my phone. By July it was 83%. My messages shrank accordingly, to a median of about 15 words, and on 6 June I first typed the phrase that would come to define our relationship: **“merge if you’re happy”**. I have now typed that, or “merge when you’re happy”, 451 times. My prompts also got stranger. A real message, from 16 June:

> be agentic, octopus intelligence, set up agents, subagents, agents within agents, mastermind this sh\*t - I don’t need to tell you what to do, you are a genius

![A line chart of the running total of times I typed “merge if you’re happy” or “merge when you’re happy”, from the first on 6 June to 451 by October. It climbs steeply through June, July and August, then flattens in September.](./merge-if-happy.svg)
_“Merge if you’re happy”, a running total_

**Factory owner (August).** August was absurd: 2,818 commits in a single month. I let sessions fix and merge small problems on their own, and my prompts became correspondingly high-level. Here is one from 18 August, in its entirety:

> fix broken sh\*t

At one point I had twelve sessions running at once on a Saturday afternoon. I also tried OpenAI’s Codex for three days, having twice threatened Claude with it in the spring, once as a rival that would check its work and once as its replacement.

**Editor (September to now).** Fewer sessions, much bigger ones. My median message is now 12 words. The record for a whole session was set back in August. Here is the entirety of my side of it, in which Claude fixed the backend tests and merged the fix:

> fix backend tests
>
> merge

Four words, 21 minutes apart.

### Whose ideas were they, anyway?

This was the bit I actually cared about. Code authorship is a pretty rubbish measure of credit for a game. Nobody thinks Dumbledore built Hogwarts. He just runs it, in the sense that children keep nearly dying there and Ofsted somehow never visits. Still his school. The question is who came up with the stuff that makes Gramlet _Gramlet_.

I had Claude pull out the 41 key ideas in the game, and for a while I tried to score each one: who thought of it, who chose it, and so on. The tallies were tidy and told me very little. So instead I went back through the full conversations behind four of them and read them properly, both sides.

**The surge bar.** One evening in April I asked Claude to “Think of some cool unique improvements for Volt game mode. Think outside the box.” It came back with a page of electricity-themed ideas: chain lightning, a voltage meter, charged letters. None of them grabbed me, and twenty minutes later I typed:

> What about some like multi step discrete bar of charge that reduces over time, it resets to full after every word entry, the more charge you have the more your word score gets multiplied, something like that, riff on that with some ideas

Its reply opened “Love this. Tempo mechanic transforms Volt from a “short puzzle” into a proper rhythm game.” It named it the surge bar and riffed: freeze the bar while you type, overcharge it on rare letters, and punish an empty bar with a 0.75x multiplier. I kept the name and threw away most of the riffs. The bar would keep draining while you typed, run for “3 seconds per interval (15 total) per turn”, and multiply your score by 2 when full and by 1 when empty. When its plan started adding bonuses for rare letters, I told it: “I have no idea what you’re on about with rarity bonus or reveal bonus, these aren’t things”.

Then came the fiddling. Over one April morning the turn went from 15 seconds to 25, then in the space of two minutes back to 15, back to 25, and finally to 20 (“Sorry to be a pain but 20 seconds actually not 25”).

The best exchange came in May, when I decided Volt should top out at 999. Claude worked out that this needed word scores adding up to 111, and suggested 2, 3, 5, 8, 13, 19, 26, 35. I was smitten:

> hmm the problem is the steeper one is so damn mathematically pure AND it lands on 111, it’s beautiful

Two minutes later it came clean: “Honest answer: that “steeper” curve isn’t actually as pure as I made it sound… I hand-tuned the tail to land on 111. Sorry – should have flagged that.” I took it anyway (“ah f\*ck it let’s go for 2 3 5 8 13 19 26 35”), and while I was at it told it to “bump surge min down to 0 (as in, if timer lapses, player scores NOTHING)”. Reading that back, it’s a harsher version of the empty-bar penalty Claude had suggested three weeks earlier, and I’d turned down.

**Fog of war.** In January I asked for some hidden test versions of the daily game to try out with friends, starting with “a variation where letters that aren’t adjacent to a letter you own are hidden”. Claude’s plan called it Fog of War, and the name stuck. The rules were mine: “You’d not be able to see any letters beyond the letters directly adjacent to yours - they’d all just be blank. And you’d not be able to restart the game.” Later I closed the loophole: “There’s no committing/ confirming, no undoing in fog of war, otherwise you could use that to get more info”.

Ten days after that I told it: “I want fog of war to become the main game. it is the best version of the game.” I had a plan for fog to unlock the classic game, and classic to unlock a hard mode, and I asked Claude to “be my sparring partner on this… push back, feed back, whatever”. It did push back, and it asked a question I hadn’t: was fog really easier on new players, or just faster? So I told it the real story. The daily game had been a hit with friends and family, until “a small group of players started scoring 58 every day”, the maximum, by studying the grid for ages and undoing their way to the perfect path. Its reply opened “This context is everything”, and it put the problem better than I had: “So Fog isn’t about difficulty progression. It’s about game health.”

That was the most useful thing it said. The rest of its suggestions were my own plan handed back to me, and I said so: “it sounds like what you’re saying is basically the idea I came to you with, which is fine but doesn’t move the conversation along much.” Its next batch included the grid fighting back, which I liked, and a version where letters next to yours disappeared each turn, which I pointed out would leave you nothing to claim. “You’re right, that was sloppy thinking.” In the end I built my unlock chain anyway, and two weeks later threw it out: “Fog of War will BE the Daily Challenge, it doesn’t even need to be labelled as Fog of War.”

Reading these back, the pattern isn’t neat. The core of each idea came from me or from something that annoyed me, but Claude regularly named things, did the maths and built five versions overnight. Once or twice it saw the problem more clearly than I did. Mostly, though, my job was to say no: to its riffs, to its first designs, and quite often to my own ideas once they were built.

A few shorter ones. **Near-miss hints**, where the game tells you the longer word you could have played on your last turn, were Claude’s idea from the start. I just said “I kind of like this near miss feature thing” and then spent nine months fiddling with it.

**The tagline**, “Claim. Spell. Repeat.”, is one I’m quietly proud of. It started as a line I wrote myself for the About page in May (“Claim a letter; form a word; repeat.”). About six weeks later, Claude’s onboarding designs used “Claim. Spell. Climb.”, and I wasn’t having it:

> “Repeat” is better - just because “Repeat” is the thing you actively do, whereas “Climb” is passive

**The names** are a mixed bag. Most of them came off lists the AI generated: Volt, Timeless, VoltArena, Omnigram. I picked them, sometimes with little ceremony (“I quite like Omnigram - we should use this name”). But Gramlet itself is mine, and so are Triplet, Rarefied and VoltMini.

And not everything made it. Making “Qu” a single letter tile was built, reviewed twice, and then left to rot on a branch.

### I trained it, and it trained me

Two things changed over the year that I didn’t expect.

First, the AI’s personality. Back in January I was already asking it to say less:

> That’s a lot of text, please summarise questions you actually need answering succinctly

It didn’t, really. By June and July its replies were averaging 260 to 280 words, about 20 words of Claude for every word of mine. So on 31 July I added a section to the project’s instructions file, `CLAUDE.md`, on how to talk to me, including the line: “The maintainer has ADHD. A dense reply gets abandoned, not skimmed.” Within three weeks its replies had halved. By September they were down to around 95 words. Meanwhile the “You’re right!”s dropped from 7% of its replies to under 1%, and it started disagreeing with me more often. When it did push back, I accepted its argument about two times in three. When I didn’t, I wasn’t subtle about it:

> surge doesn’t “build” - please go away and actually learn how the game works before you try to write content

![A line chart of median words per message from December to October. Claude’s replies climb from about 120 words to 279 in July, then fall to about 95 after the 31 July rule. My messages fall steadily from 57 words to 12.](./words.svg)
_Median words per message: mine, and Claude’s replies_

Second, the instructions file itself. `CLAUDE.md` is where you tell Claude how to behave in your project, and I kept adding to it every time it did something annoying. By 12 August it was **42,000 words long**, which is nearly as long as _The Great Gatsby_. It contained rules about rules. The next day I had it cut to 16,000 words, and within four weeks it had grown back to 34,000. There was a whole separate file, `DECISIONS.md`, because AI review passes kept re-raising questions I’d already settled; one issue was re-filed nineteen hours after I closed it. On 9 September we cut it down to about 3,500 words, and this time it stayed cut.

![A line chart of the word count of CLAUDE.md from February to October. It creeps up to about 8,000 words by late July, shoots up to 42,477 on 12 August, drops to 15,970 the next day, climbs back to 33,861 by 8 September, then falls to 3,508 on 9 September.](./claude-md.svg)
_Words in `CLAUDE.md`, with Gatsby for scale_

Turns out the most important code I wrote this year wasn’t code at all; it was a document about how to talk to me, which I then had to heavily edit because it had become impossible to talk to.

(For the record, I also swore at it about 14 times per thousand messages between January and May, and not once in September or October. I’d like to say that’s personal growth. It’s probably just that it got better.)

### Was it me, or the models?

There’s a complication I’ve been ignoring. I didn’t talk to one AI this year. I talked to ten.

![A chart with one row per Claude model, from Sonnet 4.5 in December to Opus 5.5 in October, and one small line for every session I ran on it. Beside each model are my median words per message, falling from 34 to 12.5, and how often I said I was confused, per 100 messages, highest for Opus 5 at 2.1.](./models.svg)
_Every session, by the model it ran on_

My messages shrank with almost every new model: a median of 34 words with Sonnet 4.5, 26 with Opus 4.6, 20 with 4.7, 15 with 4.8 and 12.5 with Opus 5.5. How often I told it to merge went from about 3% of my messages with Opus 4.5 to 16% with 4.8 and 26% with Sonnet 5. And the flattery faded: Sonnet 4.5 told me I was right in one reply in ten; Opus 5.5 has managed it in fewer than one in a hundred.

My memory is that Opus 5, which arrived on 24 July, was the one that drove me up the wall. The data says I swore at it less than at any other big model, but told it I was confused more often than any other. It wasn’t even verbose. Its median reply was 158 words, against 254 for Opus 4.8. It just used them to say things I didn’t understand.

So did I trust it more because it got better, or did it get better because I wrote 42,000 words of rules at it? Honestly, both, and they’re hard to pull apart. The ADHD rule went in on 31 July, a week after Opus 5 arrived, and in an Opus 5 session at that. What I can say is that each new model got a slightly lazier version of me, and coped fine.

### So can I call myself the creator?

I think so, yes, as long as I’m careful about the verb.

I can’t say I _built_ Gramlet, or _coded_ it. I typed 115 lines in eight months; the AI typed the rest, and plenty of the good ideas came out of our back-and-forth rather than out of my head alone. But I did invent the game, by hand, in 2022. I sparked most of what it’s become, I chose between every set of options, and nothing hit production without me saying so. Gramlet is a Will May game.

### Final thoughts

In December I wrote that I no longer knew where I ended and the AI began. Having now been through ten months of data with a fine-tooth comb, I think I actually do know, and the answer is weirdly comforting.

The AI made building almost free. A feature that would once have taken me a month of evenings now takes a message from my phone and a “merge if you’re happy”. And when building is free, the only things left that matter are the things the building was always in service of: having ideas, choosing between them, and knowing when something isn’t right yet. Twenty of my 29 ideas arrived after nine at night or in the small hours. That’s the job now.

Anyway, go and play [Gramlet](https://gramlet.co.uk). The surge bar was my idea. 🟨⚡
