---
title: 'Claim. Spell. Delegate.'
date: '2026-10-09T12:00:00Z'
description: In ten months I turned a forgotten 2022 word game into Gramlet, with 316,000 lines of code, eight game modes and a charity pot. I wrote 115 of those lines myself. So what exactly did I do? I got Claude to go through all 1,609 of our conversations and find out.
categories:
  - AI
  - Software Development
draft: true
---

Here, in the blue glow of a phone screen at ten past midnight, we find the modern software developer in his natural habitat. He does not write code. He has not written code since February. He types four words, “merge if you’re happy”, and goes to sleep. By morning, his game has a new feature. Nature is remarkable.

Last December, in a [rambling ode to Claude Opus 4.5](/2025/12/20/land-of-opus-and-glory), I joked that I’d keep using Claude Code to build stuff “until of course I forget what code looks like completely and have an identity crisis”.

Reader, I have forgotten what code looks like.

Between February and October this year, I typed **115 lines of code** into the word game I’ve been working on. Not 115 a day, or 115 a week. 115, total, and most of those were me nudging a margin by a few pixels or fixing a typo in the update log. Over the same period the codebase grew to around **316,000 lines**. You don’t need to be a mathematician to work out that I am not the one doing the typing.

The game is called **[Gramlet](https://gramlet.co.uk)**, and if you’ve been reading this blog for a while (all three of you) you might remember its ancestor: [Anagramageddon](/2022/12/08/anagramageddon-fight-for-territory-and-find-anagrams-as-you-battle-against-the-clock), a scrappy little two-player game I built by hand back in 2022, with a 200-line JavaScript file I described at the time as “something of an abomination”. It then sat more or less untouched for nearly three years. Then Claude Code arrived on the web, and last December I dusted it off, and things got slightly out of hand.

This article is my attempt to work out what, if anything, I can still take credit for.

### What even is Gramlet?

Gramlet is a daily word game. You claim letters on a grid, one at a time, always next to one you already own, and after each claim you spell a word from your growing bank of letters. That’s the core of it, and it’s the bit I came up with in 2022. Everything else has grown around it since, mostly by asking “what if?”:

-   **What if the clock was ticking?** In Volt, your word score is multiplied by a surge bar that drains while you think, over five rounds a day. VoltMini does the same on a 5x5 grid, for people with things to do, and the music speeds up as the timer runs down
-   **What if you couldn’t see the whole board?** Timeless, the classic daily, hides most of the grid under a fog of war
-   **What if some letters were worth more?** In Rarefied, rare letters score higher, and a solver bot called Omnigram works out the best possible score for each day’s board
-   **What if there were extra rules?** Triplet adds three daily challenges (“cross the board”, “no plurals”, that sort of thing). Free Play takes the pressure off and gives you undo
-   **What if you weren’t alone?** Duels with friends, VoltArena for head-to-head in real time, and Grambots, a league of bots to fight instead
-   **Why come back tomorrow?** A new board every day, streaks, a Hall of Fame, holiday themes, and a charity pot that grows a little every time somebody finishes a game

There’s also Gramlet Kids, a Training mode and a post-game slideshow, but you get the idea.

Give it a go at [gramlet.co.uk](https://gramlet.co.uk) – no account needed. My wife has been its chief tester since January. Her bug reports arrive in person, usually while I’m trying to watch something, and almost always begin “Is it meant to…”. It is never meant to.

### Asking the robot about the robot

Here’s how I went about this. I asked Claude to analyse every single Claude Code session I’ve had on Gramlet, the whole git history and the GitHub pull requests, and to tell me honestly what I’d contributed. I am aware of the conflict of interest. It’s a bit like asking the dog to lead the inquiry into the missing sausages.

Getting hold of the data was its own little comedy. My sessions live on Anthropic’s servers, and the only way Claude could read them from inside its sandbox was a hundred events at a time, through a tool only the model could call. Every page meant another trip through the model. It estimated a full extraction would cost around a billion tokens, and kept gently suggesting it might eat my entire weekly usage allowance. There was a lot of waiting. Waiting on Claude is a big part of my life now; back in June, in the voice of a jilted lover, I’d typed:

> can you please stop disappearing and claiming you’ll come back. it’s pissing me off. you never come back.

In the end I sat down at my laptop, opened Claude Desktop, and it wrote a script that ran in my Chrome tab and pulled down the lot: **1,609 sessions, 6.4 GB of transcripts**, without a model anywhere near it. Sometimes the answer to an AI problem is a for loop. Good to know some things never change.

### The numbers

Here’s the headline stuff, from December 2025 (when Claude got involved) to the start of October 2026:

-   **9,538 commits** to master, about 2,190 pull requests and 948 GitHub issues
-   **1,609 Claude Code sessions**, on 267 of roughly 290 days
-   **9,654 messages** typed by me, adding up to about **438,000 words** of English, which is roughly five novels’ worth of me telling a computer what to do
-   **About 99%** of the code added since December was written by an AI
-   **43%** of the codebase is now tests. In 2022 that figure was a round zero

![A bar chart of lines of code added each month from December to October. The AI’s bars grow from about 7,000 in December to nearly 290,000 in August. My share is 4,755 lines in December, 3,275 in January, then 39, 22, 0, 22, 2, 30 and then nothing at all.](./handover.svg)
_Lines of code added each month. My contribution is the row of numbers along the bottom_

So the AI wrote the code. No surprises there. The more interesting question is what I was doing with all those words.

### Five versions of me

Reading back through ten months of my own messages was a strange experience, a bit like finding an old diary, if your diary was mostly you swearing at a word game. But a pretty clear story emerged, in five chapters.

**Pair programmer (December to January).** I was still a developer, just with a very fast colleague. I ran the app on my Windows laptop, pasted stack traces back into the chat, tweaked CSS by hand and wrote some of the end-to-end tests myself. My prompts were proper specifications, a median of 33 words a message, and the AI was mostly doing what it was told. Not that I was always patient while it did:

> Literally just write the fucking code already there is no way to exit plan mode, so can you just get on with it

It was also very, very agreeable. In January, nearly 7% of its replies included some variation of “You’re right!” or “Good catch!”.

**Product manager (February to April).** I stopped committing code around the middle of February and didn’t really notice. I was too busy arguing. This was the era of me checking every claim it made, and of a fairly relaxed attitude to risk:

> I can’t be arsed with a follow up pr / migration to remove the allowlist, it isn’t that big a deal if shit fucks up as we’ve only got about five users

It was also when I started asking it to review its own work. On the last day of January I told it, with all the gravitas of a man addressing his troops: “as of this moment, right now, you are no longer the code author, you are the code interrogator”. By May that prompt had become a permanent “engineering lead” skill, and by August a hook that physically blocked Claude from finishing a pull request until it had interrogated itself. A little bit of me lives on in that hook.

**Reviewer on a phone (May to July).** Claude Code works on mobile, and I discovered that I could ship features from bed and, as I confessed in December, the bog. In March, 13% of my sessions were started from my phone. By July it was 83%. My messages shrank accordingly, to a median of about 15 words, and on 6 June I first typed the phrase that would come to define our relationship: **“merge if you’re happy”**. I have now typed that, or “merge when you’re happy”, 450 times. Lying down also made me grandiose. A real message, from 16 June:

> be agentic, octopus intelligence, set up agents, subagents, agents within agents, mastermind this shit - I don’t need to tell you what to do, you are a genius

**Factory owner (August).** August was absurd: 2,818 commits in a single month. I let sessions fix and merge small problems on their own, and my prompts became correspondingly high-level. Here is one from 18 August, in its entirety:

> fix broken shit

At one point I had twelve sessions running at once on a Saturday afternoon, like a slightly dishevelled air traffic controller. I also briefly cheated on Claude with OpenAI’s Codex for three days, which we don’t talk about.

**Editor (September to now).** Fewer sessions, much bigger ones. My median message is now 12 words. Here is the entirety of my side of a session from this week, in which Claude reviewed the update log, wrote a new entry, opened a pull request, reviewed it, rewrote it after my feedback and merged it:

> What are the latest update log entries. Is anything important missing?
>
> Yes
>
> Is it just me or is that copy very confusing
>
> Great, merge please

Twenty-five words.

### Whose ideas were they, anyway?

This was the bit I actually cared about. Code authorship is a pretty rubbish measure of credit for a game. Nobody thinks Dumbledore built Hogwarts. He just runs the place, hands out the points, and occasionally decides at the last minute that Gryffindor have won. The question is who came up with the stuff that makes Gramlet _Gramlet_.

So I had Claude pick out the 41 key ideas in the game (the modes, the scoring, the post-game slideshow, the look of the letter tiles, the name, all of it) and trace each one back through the sessions: who sparked it, who offered the options, who chose, who refined it. Every quote was checked against the transcripts word for word. Here’s how it came out:

-   **Spark:** me on 29 of the 41, the AI on 4, a genuine back-and-forth on 5, and 3 lost to history
-   **Options:** mostly the AI. When I wanted alternatives, it was the one generating them
-   **Choice:** me, on 39 of the 41
-   **Refinement:** shared, on 37. It proposed, I pushed back with specifics, round we went again

![A grid of 41 columns, one per idea, and four rows: spark, options, choice and refinement. The spark row is mostly my colour, the options row mostly Claude’s or shared, the choice row almost entirely mine, and the refinement row almost entirely shared.](./ideas.svg)
_All 41 ideas, one column each, coloured by who did what_

Some of my favourite lineages:

**The surge bar** in Volt, probably the best idea in the game, was mine, and it came to me at ten past midnight on a Wednesday. I’d asked Claude for ideas to make Volt more exciting and it came back with a list of electricity-themed mechanics, none of which grabbed me. So I typed:

> What about some like multi step discrete bar of charge that reduces over time, it resets to full after every word entry, the more charge you have the more your word score gets multiplied, something like that, riff on that with some ideas

Not exactly Shakespeare. But Claude named it the “surge bar”, I set the numbers (three seconds an interval, 2x down to 1x, an invalid word costs you a chunk), and later it did the maths that let Volt top out at a score of 999. That’s the pattern in miniature: my spark, its craft, my calls.

**The stealing penalty** went the other way. I asked whether stealing letters from your opponent was overpowered. Claude gave me a list of clever fixes, and I replied, with characteristic warmth:

> Hmm a lot of these sound fancy but I just can’t imagine them working that well in practice.

It came back with a simple points penalty, and I picked −2. Its options, my choice. (Stealing has since been switched off entirely, so this whole saga is now of purely historical interest. Much like this blog.)

**Near-miss hints**, where the game tells you the longer word you could have played on your last turn, were the AI’s idea from the start. I just said “I kind of like this near miss feature thing” and then spent nine months fiddling with it.

**The tagline**, “Claim. Spell. Repeat.”, is one I’m quietly proud of. It started as a line I wrote myself for the About page in May (“Claim a letter; form a word; repeat.”). About six weeks later, Claude’s onboarding designs used “Claim. Spell. Climb.”, and I wasn’t having it:

> “Repeat” is better - just because “Repeat” is the thing you actively do, whereas “Climb” is passive

**The names** are a mixed bag. Most of them came off lists the AI generated: Volt, Timeless, VoltArena, Omnigram. I picked them, sometimes with the enthusiasm of a man choosing a sandwich (“I quite like Omnigram - we should use this name”). But Gramlet itself is mine, and so are Triplet, Rarefied and VoltMini.

And not everything made it. Making “Qu” a single letter tile was built, reviewed twice, and then left to rot on a branch. A big redesign to make the letter tiles look like physical, raised tiles reached the test server in August, and then I decided I didn’t like it after all and had seventeen merges reverted. Cheap ideas are wonderful. Cheap ideas are also how you end up reverting seventeen merges on a Wednesday.

### I trained it, and it trained me

Two things changed over the year that I didn’t expect.

First, the AI’s personality. Back in January I was already begging it to shut up a bit:

> That’s a lot of text, please summarise questions you actually need answering succinctly

It didn’t, really. By June and July its replies were averaging 260 to 280 words, about 20 words of Claude for every word of mine. So on 31 July I added a section to the project’s instructions file, `CLAUDE.md`, on how to talk to me, including the line: “The maintainer has ADHD. A dense reply gets abandoned, not skimmed.” Within three weeks its replies had halved. By September they were down to around 95 words. Meanwhile the “You’re right!”s dropped from 7% of its replies to under 1%, and it started disagreeing with me more often. When it did push back, I accepted its argument about two times in three. When I didn’t, I wasn’t subtle about it:

> surge doesn’t “build” - please go away and actually learn how the game works before you try to write content

![A line chart of median words per message from December to October. Claude’s replies climb from about 120 words to 279 in July, then fall to about 95 after the 31 July rule. My messages fall steadily from 57 words to 12.](./words.svg)
_Median words per message: mine, and Claude’s replies_

Second, the instructions file itself. `CLAUDE.md` is where you tell Claude how to behave in your project, and I kept adding to it every time it did something annoying. By 12 August it was **42,000 words long**, which is nearly as long as _The Great Gatsby_, and considerably less romantic. It contained rules about rules. The next day I had it cut to 16,000 words, and within four weeks it had grown back to 34,000, like a hydra with a style guide. There was a whole separate file, `DECISIONS.md`, because AI review passes kept re-raising questions I’d already settled; one issue was re-filed nineteen hours after I closed it. On 9 September we cut it down to about 3,500 words, and this time it stayed cut.

![A line chart of the word count of CLAUDE.md from February to October. It creeps up to about 8,000 words by late July, shoots up to 42,477 on 12 August, drops to 15,970 the next day, climbs back to 33,861 by 8 September, then falls to 3,508 on 9 September.](./claude-md.svg)
_Words in `CLAUDE.md`, with Gatsby for scale_

 Turns out the most important code I wrote this year wasn’t code at all; it was a document about how to talk to me, which I then had to heavily edit because it had become impossible to talk to.

(For the record, I also swore at it about 14 times per thousand messages between January and May, and not once in September or October. I’d like to say that’s personal growth. It’s probably just that it got better.)

### Was it me, or the models?

There’s a complication I’ve been ignoring. I didn’t talk to one AI this year. I talked to ten.

![A timeline of the ten Claude models I used, from Sonnet 4.5 in December to Opus 5.5 in October, with my median words per message beside each: 34 for Sonnet 4.5, falling to 15 for Opus 4.8 and 12.5 for Opus 5.5.](./models.svg)
_Which model was in the chair, and how many words I gave it_

My messages shrank with almost every new model: a median of 34 words with Sonnet 4.5, 26 with Opus 4.6, 20 with 4.7, 15 with 4.8 and 12.5 with Opus 5.5. How often I told it to merge went from about 3% of my messages with Opus 4.5 to 16% with 4.8 and 26% with Sonnet 5. And the yes-man faded out: Sonnet 4.5 told me I was right in one reply in ten; Opus 5.5 has managed it in fewer than one in a hundred.

So did I trust it more because it got better, or did it get better because I wrote 42,000 words of rules at it? Honestly, both, and they’re hard to pull apart. The ADHD rule went in on 31 July, a week after Opus 5 arrived, and Opus 5 was already less wordy than Opus 4.8 (a median of 158 words a reply against 254). What I can say is that each new model got a slightly lazier version of me, and coped fine.

### So can I call myself the creator?

I think so, yes, as long as I’m careful about the verb.

I can’t say I _built_ Gramlet, or _coded_ it. I typed 115 lines in eight months; the AI typed the rest, and plenty of the good ideas came out of our back-and-forth rather than out of my head alone. But I did invent the game, by hand, in 2022. I sparked most of what it’s become, I chose between every set of options, and nothing hit production without me saying so. The closest analogy I can find is a film director: nobody thinks Christopher Nolan personally holds the camera, but it’s still a Christopher Nolan film. Gramlet is a Will May game. It’s just one with an unusually large and tireless crew.

### Final thoughts

In December I wrote that I no longer knew where I ended and the AI began. Having now been through ten months of data with a fine-tooth comb, I think I actually do know, and the answer is weirdly comforting.

The AI made building almost free. A feature that would once have taken me a month of evenings now takes a message from my phone and a “merge if you’re happy”. And when building is free, the only things left that matter are the things the building was always in service of: having ideas, choosing between them, and knowing when something isn’t right yet. Twenty of my 29 ideas arrived after nine at night or in the small hours. That’s the job now. Ideas are the currency, and taste is how you spend it.

It’s a word game, so here’s a word game. Rearrange the letters of _creator_ and you get _reactor_. Rearrange _director_ and you get _credit or…_. I’ve spent ten months as a reactor, poking at what the machine built and telling it that it looks a bit naff. But I think, on the evidence, I was the creator too. Credit, or not? Credit. Just about.

Anyway, go and play [Gramlet](https://gramlet.co.uk). The surge bar was my idea. 🟨⚡
