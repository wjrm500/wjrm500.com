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

So I went back through all 1,609 sessions, plus my ordinary Claude chats from December and January, area by area – the rules, the play screen, the look of the app, and everything around the game – and traced where the ideas behind nine of the biggest features came from. Each timeline below shows only the ideas that shaped what the feature is today, who had them and when. Every quote is word for word.

<div class="tl-legend"><span><i style="background:var(--accent)"></i>Me</span><span><i style="background:var(--warm)"></i>Claude</span></div>

### The rules

#### Fog of war

In most modes you see only the letters next to yours, so you cannot plan the whole game from the first move.

<svg class="tl-strip" viewBox="0 0 640 64" role="img" aria-label="Fog of war: 5 steps from 15 January 2026 to 29 January 2026"><line x1="14" x2="626" y1="24" y2="24" stroke="var(--border)" stroke-width="2"/><circle cx="14.0" cy="24" r="6.5" fill="var(--accent)"/><circle cx="23.0" cy="24" r="6.5" fill="var(--warm)"/><circle cx="407.4" cy="24" r="6.5" fill="var(--warm)"/><circle cx="416.4" cy="24" r="6.5" fill="var(--accent)"/><circle cx="626.0" cy="24" r="6.5" fill="var(--accent)"/><text x="14.0" y="56" text-anchor="start">15 Jan</text><text x="626.0" y="56" text-anchor="end">29 Jan</text><text x="407.4" y="56" text-anchor="middle">24 Jan</text></svg>
<ol class="tl"><li class="key"><p class="tl-meta">15 January 2026<span class="tl-who">Me</span></p><p>I ask for a test version of the daily game with hidden letters:</p><p class="tl-q">“a variation where letters that aren’t adjacent to a letter you own are hidden”</p><p class="tl-out">→ The idea that became fog of war.</p></li><li class="claude key"><p class="tl-meta">15 January 2026<span class="tl-who">Claude</span></p><p>Claude’s plan names it and marks a hidden letter with a question mark:</p><p class="tl-q">“Fog of War … Letters not adjacent to claimed boxes show as ?”</p><p class="tl-out">→ The name and the ? both stuck.</p></li><li class="claude key"><p class="tl-meta">24 January 2026<span class="tl-who">Claude</span></p><p>I suggest two visible outer rings; in a chat Claude recommends one, which I adopt:</p><p class="tl-q">“My recommendation: Edge only (1 ring). Two rings reveals too much”</p><p class="tl-out">→ Only the outer ring shows at the start.</p></li><li class="key"><p class="tl-meta">24 January 2026<span class="tl-who">Me</span></p><p>I set the version that ships, ruling out scouting moves:</p><p class="tl-q">“Undo, Restart and crucially “Play again” (replay after completion) will not be available for this game mode. This is because otherwise users could just take “reconnaissance turns””</p><p class="tl-out">→ No undo, restart or replay in fog.</p></li><li class="key"><p class="tl-meta">29 January 2026<span class="tl-who">Me</span></p><p>Some players were scoring 58 every day on the open grid. I decide:</p><p class="tl-q">“I want fog of war to become the main game. it is the best version of the game.”</p><p class="tl-out">→ Fog became the game you play first each day.</p></li></ol>
<p class="tl-sum"><strong>Claude’s part:</strong> Claude named it Fog of War, chose the ? and cut the visible edge to one ring; the rules against scouting and making it the main game were mine.</p>

#### The surge multiplier

In Volt, every word’s score is multiplied by a surge that drains from 3x to 0x while you think.

<svg class="tl-strip" viewBox="0 0 640 64" role="img" aria-label="The surge multiplier: 5 steps from 14 April 2026 to 5 May 2026"><line x1="14" x2="626" y1="24" y2="24" stroke="var(--border)" stroke-width="2"/><circle cx="14.0" cy="24" r="6.5" fill="var(--accent)"/><circle cx="23.0" cy="24" r="6.5" fill="var(--warm)"/><circle cx="626.0" cy="24" r="6.5" fill="var(--accent)"/><circle cx="635.0" cy="24" r="6.5" fill="var(--warm)"/><circle cx="644.0" cy="24" r="6.5" fill="var(--accent)"/><text x="14.0" y="56" text-anchor="start">14 Apr</text><text x="626.0" y="56" text-anchor="end">5 May</text></svg>
<ol class="tl"><li class="key"><p class="tl-meta">14 April 2026<span class="tl-who">Me</span></p><p>After Claude’s first list of ideas for Volt (today’s VoltMini), I suggest:</p><p class="tl-q">“multi step discrete bar of charge that reduces over time, it resets to full after every word entry, the more charge you have the more your word score gets multiplied”</p><p class="tl-out">→ The surge: a draining bar that multiplies your score.</p></li><li class="claude key"><p class="tl-meta">14 April 2026<span class="tl-who">Claude</span></p><p>Claude’s write-up names it the Surge Bar and adds a cost for mistakes:</p><p class="tl-q">“A horizontal, 5-segment lightning bar … An invalid attempt just flashes the bar red and drains an extra segment as punishment.”</p><p class="tl-out">→ The name stuck, and an invalid word still costs charge.</p></li><li class="key"><p class="tl-meta">5 May 2026<span class="tl-who">Me</span></p><p>I want the 8x8 mode (today’s Volt) to have a different top score:</p><p class="tl-q">“it would be kind of cool if the max score was 999, and no longer using decimal places for scores, they feel too mathsy.”</p><p class="tl-out">→ A target of 333 a round, in whole numbers.</p></li><li class="claude key"><p class="tl-meta">5 May 2026<span class="tl-who">Claude</span></p><p>Claude works out three ways to reach 999 and recommends this one:</p><p class="tl-q">“Keep the bonus curve, change surge ceiling to ×3, redesign curve so Σ = 111.”</p><p class="tl-out">→ The surge ceiling rose from 2x to 3x.</p></li><li class="key"><p class="tl-meta">5 May 2026<span class="tl-who">Me</span></p><p>I take that option and drop the floor from 1x to zero:</p><p class="tl-q">“bump up surge max to 3, bump surge min down to 0 (as in, if timer lapses, player scores NOTHING)”</p><p class="tl-out">→ Surge runs from 3x to 0x, as it still does.</p></li></ol>
<p class="tl-sum"><strong>Claude’s part:</strong> Claude named the Surge Bar, made an invalid word cost charge, and proposed the 3x ceiling as its way to the 999 top score I asked for.</p>

### The play screen

#### Two phases, one letter bank

Each turn you claim a letter on the board, then spell from your letter bank, which takes the board’s place on a phone.

<svg class="tl-strip" viewBox="0 0 640 64" role="img" aria-label="Two phases, one letter bank: 5 steps from 16 November 2022 to 24 August 2026"><line x1="14" x2="626" y1="24" y2="24" stroke="var(--border)" stroke-width="2"/><circle cx="14.0" cy="24" r="6.5" fill="var(--accent)"/><circle cx="517.6" cy="24" r="6.5" fill="var(--accent)"/><circle cx="526.6" cy="24" r="6.5" fill="var(--warm)"/><circle cx="535.6" cy="24" r="6.5" fill="var(--accent)"/><circle cx="626.0" cy="24" r="6.5" fill="var(--accent)"/><text x="14.0" y="56" text-anchor="start">16 Nov 2022</text><text x="626.0" y="56" text-anchor="end">24 Aug 2026</text></svg>
<ol class="tl"><li class="key"><p class="tl-meta">16 November 2022<span class="tl-who">Me</span></p><p>In my 2022 game, before any AI help, a turn is claim then word:</p><p class="tl-q">“Getting WordEntry to activate graphically on requiredAction transitioning to “Enter word””</p><p class="tl-out">→ Every turn is claim a letter, then spell a word.</p></li><li class="key"><p class="tl-meta">23 December 2025<span class="tl-who">Me</span></p><p>On a phone the keyboard hides the word box. I suggest:</p><p class="tl-q">“the grid scrolls up and disappears, the “Enter a word” box is brought up the screen … the letters you need would be visible along with the input box”</p><p class="tl-out">→ The board makes way while you spell.</p></li><li class="claude key"><p class="tl-meta">23 December 2025<span class="tl-who">Claude</span></p><p>Among other ways round the keyboard, Claude offers a strip of your letters:</p><p class="tl-q">“Alternative 4: “Floating Letter Bank” (My Favorite Simple Option)”</p><p class="tl-out">→ The letter bank, and its name.</p></li><li class="key"><p class="tl-meta">23 December 2025<span class="tl-who">Me</span></p><p>I keep the bank but redesign it: always under the board, never scrolling:</p><p class="tl-q">“I like the letter bank idea, but I want to make some changes. … a new letter bank component, between the grid and the word entry box”</p><p class="tl-out">→ Built that afternoon: bank under the board, board folds away.</p></li><li class="key"><p class="tl-meta">24 August 2026<span class="tl-who">Me</span></p><p>Claude had kept the Kids board up while spelling. I settle it for every mode:</p><p class="tl-q">“grid hidden on portrait word entry, left aligned on landscape word entry, across all game modes, simple”</p><p class="tl-out">→ Upright phones hide the board; wide screens keep it beside.</p></li></ol>
<p class="tl-sum"><strong>Claude’s part:</strong> Claude suggested a letter bank as one way round the phone keyboard; the two-step turn, the board giving way and the bank’s design were mine.</p>

#### Spelling the word

You spell by tapping or swiping your claimed letters; they build one connected block, and tapping the block plays the word.

<svg class="tl-strip" viewBox="0 0 640 64" role="img" aria-label="Spelling the word: 5 steps from 3 July 2026 to 8 July 2026"><line x1="14" x2="626" y1="24" y2="24" stroke="var(--border)" stroke-width="2"/><circle cx="14.0" cy="24" r="6.5" fill="var(--accent)"/><circle cx="23.0" cy="24" r="6.5" fill="var(--warm)"/><circle cx="258.8" cy="24" r="6.5" fill="var(--accent)"/><circle cx="503.6" cy="24" r="6.5" fill="var(--accent)"/><circle cx="626.0" cy="24" r="6.5" fill="var(--accent)"/><text x="14.0" y="56" text-anchor="start">3 Jul</text><text x="626.0" y="56" text-anchor="end">8 Jul</text><text x="258.8" y="56" text-anchor="middle">5 Jul</text><text x="503.6" y="56" text-anchor="middle">7 Jul</text></svg>
<ol class="tl"><li class="key"><p class="tl-meta">3 July 2026<span class="tl-who">Me</span></p><p>As tapping becomes the main way to spell, I suggest showing the word as tiles:</p><p class="tl-q">“maybe clicked letter tiles when dimmed could actually appear as letter tiles in a space below the letter bank, forming a word from tiles?”</p><p class="tl-out">→ The word you spell appears as tiles.</p></li><li class="claude key"><p class="tl-meta">3 July 2026<span class="tl-who">Claude</span></p><p>Of three ways to draw the tiles, Claude leans to one, and I choose it:</p><p class="tl-q">“B · Connected block – tiles fuse edge-to-edge with hairline splits into one solid word.”</p><p class="tl-out">→ The word became one connected block.</p></li><li class="key"><p class="tl-meta">5 July 2026<span class="tl-who">Me</span></p><p>I drop the Submit button:</p><p class="tl-q">“remove submit button completely – now you CLICK the word itself to submit – the word IS the submit button”</p><p class="tl-out">→ Tapping the word plays it.</p></li><li class="key"><p class="tl-meta">7 July 2026<span class="tl-who">Me</span></p><p>Tapping bank letters had been an option since April. I make it the default:</p><p class="tl-q">“default should be that users HAVE to tap to type”</p><p class="tl-out">→ The keyboard stays shut; a setting brings typing back.</p></li><li class="key"><p class="tl-meta">8 July 2026<span class="tl-who">Me</span></p><p>I ask for swiping across the letters, like a phone keyboard:</p><p class="tl-q">“swipe to tap letters in letter bank / grid during word entry please. as in, you know how you swipe on a GBoard”</p><p class="tl-out">→ You can glide across your letters to spell.</p></li></ol>
<p class="tl-sum"><strong>Claude’s part:</strong> Claude proposed fusing the tiles into one connected block, which I chose; spelling with tiles, tapping the word to play, tap-first spelling and swiping were my ideas.</p>

#### Fitting a phone

The play screen is a column of zones that fold away step by step only when room runs out; wide screens use two columns.

<svg class="tl-strip" viewBox="0 0 640 64" role="img" aria-label="Fitting a phone: 4 steps from 23 December 2025 to 19 August 2026"><line x1="14" x2="626" y1="24" y2="24" stroke="var(--border)" stroke-width="2"/><circle cx="14.0" cy="24" r="6.5" fill="var(--accent)"/><circle cx="482.6" cy="24" r="6.5" fill="var(--accent)"/><circle cx="518.5" cy="24" r="6.5" fill="var(--warm)"/><circle cx="626.0" cy="24" r="6.5" fill="var(--accent)"/><text x="14.0" y="56" text-anchor="start">23 Dec 2025</text><text x="626.0" y="56" text-anchor="end">19 Aug 2026</text><text x="482.6" y="56" text-anchor="middle">24 Jun 2026</text></svg>
<ol class="tl"><li class="key"><p class="tl-meta">23 December 2025<span class="tl-who">Me</span></p><p>Claude offers seven layouts for the cramped phone screen; I reject them and set:</p><p class="tl-q">“Everything should be fixed in place on the screen so impossible to scroll. The grid should continue to take up most of the space.”</p><p class="tl-out">→ The play screen stopped scrolling; the board fills the rest.</p></li><li class="key"><p class="tl-meta">24 June 2026<span class="tl-who">Me</span></p><p>For Gramlet Kids on a tablet held sideways, I ask for two columns:</p><p class="tl-q">“when Gramlet Kids is played in landscape orientation, let’s have the status bar … stacked on the left side, and the grid on the right side”</p><p class="tl-out">→ Kids got two columns sideways, board later on the left.</p></li><li class="claude key"><p class="tl-meta">8 July 2026<span class="tl-who">Claude</span></p><p>I ask for a full review of every mode; Claude proposes one layout for all:</p><p class="tl-q">“The vision – five zones, two postures, one spring. … Chrome folds progressively … only when the spring would hit its floor”</p><p class="tl-out">→ Every play screen became zones that fold only when needed.</p></li><li class="key"><p class="tl-meta">19 August 2026<span class="tl-who">Me</span></p><p>I see the board shrink while the bank below could still fold:</p><p class="tl-q">“we should prioritise folding the letter-selection-phase below-8x8-grid 3x3 letter bank grid into its single-row format before we compress the 8x8 grid above”</p><p class="tl-out">→ The bank drops to one row before the board shrinks.</p></li></ol>
<p class="tl-sum"><strong>Claude’s part:</strong> Claude designed the zone layout and its rule of folding only when room runs out; the no-scroll screen, the two columns and what folds first were mine.</p>

### The look of the app

#### The home page

The home page is a small grid spelling GRAMLET above mode cards in their own colours and fonts, with the menu top right.

<svg class="tl-strip" viewBox="0 0 640 64" role="img" aria-label="The home page: 5 steps from 22 March 2026 to 21 August 2026"><line x1="14" x2="626" y1="24" y2="24" stroke="var(--border)" stroke-width="2"/><circle cx="14.0" cy="24" r="6.5" fill="var(--warm)"/><circle cx="23.0" cy="24" r="6.5" fill="var(--accent)"/><circle cx="231.4" cy="24" r="6.5" fill="var(--accent)"/><circle cx="622.0" cy="24" r="6.5" fill="var(--warm)"/><circle cx="626.0" cy="24" r="6.5" fill="var(--accent)"/><text x="14.0" y="56" text-anchor="start">22 Mar</text><text x="626.0" y="56" text-anchor="end">21 Aug</text><text x="231.4" y="56" text-anchor="middle">15 May</text></svg>
<ol class="tl"><li class="claude key"><p class="tl-meta">22 March 2026<span class="tl-who">Claude</span></p><p>Claude had suggested a hero; I rejected its text-only one. It comes back with:</p><p class="tl-q">“The key insight: the 8x8 grid IS the visual identity – render a mini version of it.”</p><p class="tl-out">→ The home page hero became a small game grid.</p></li><li class="key"><p class="tl-meta">22 March 2026<span class="tl-who">Me</span></p><p>I dictate what the grid should spell:</p><p class="tl-q">“The user has selected the letters to form GRAMLET”</p><p class="tl-out">→ The hero grid spells GRAMLET.</p></li><li class="key"><p class="tl-meta">15 May 2026<span class="tl-who">Me</span></p><p>Reworking a mode-card spec from outside Claude Code, I pick each mode’s font:</p><p class="tl-q">“Voltage should use Staatliches font from Google, while Timeless should use Merriweather”</p><p class="tl-out">→ Each mode card has its own font and colour.</p></li><li class="claude key"><p class="tl-meta">20 August 2026<span class="tl-who">Claude</span></p><p>Asked for a better way to move around the app, Claude proposes:</p><p class="tl-q">“The header becomes the menu. Put the burger on every page, not just Home.”</p><p class="tl-out">→ The burger menu sits top right on every screen.</p></li><li class="key"><p class="tl-meta">21 August 2026<span class="tl-who">Me</span></p><p>Claude’s menu design moves my profile into it. I object; Claude shrinks the pill instead:</p><p class="tl-q">“losing one tap access to your user profile, which is itself the jumping off point for a number of other bits, feels bad”</p><p class="tl-out">→ Your profile stays one tap away, top right.</p></li></ol>
<p class="tl-sum"><strong>Claude’s part:</strong> Claude proposed the hero, making it a mini game grid and putting the menu on every screen; what the grid spells, the fonts and the one-tap profile were mine.</p>

#### The mode hub

Picking a mode shows an intro page the first time, a welcome-back screen later, and after you play, tabs for scorecard, friends and leaderboard.

<svg class="tl-strip" viewBox="0 0 640 64" role="img" aria-label="The mode hub: 5 steps from 6 February 2026 to 6 August 2026"><line x1="14" x2="626" y1="24" y2="24" stroke="var(--border)" stroke-width="2"/><circle cx="14.0" cy="24" r="6.5" fill="var(--warm)"/><circle cx="98.5" cy="24" r="6.5" fill="var(--accent)"/><circle cx="135.7" cy="24" r="6.5" fill="var(--accent)"/><circle cx="615.9" cy="24" r="6.5" fill="var(--accent)"/><circle cx="626.0" cy="24" r="6.5" fill="var(--accent)"/><text x="14.0" y="56" text-anchor="start">6 Feb</text><text x="626.0" y="56" text-anchor="end">6 Aug</text><text x="98.5" y="56" text-anchor="middle">3 Mar</text></svg>
<ol class="tl"><li class="claude key"><p class="tl-meta">6 February 2026<span class="tl-who">Claude</span></p><p>I ask whether the hub needs a leaderboard at all. Claude recommends:</p><p class="tl-q">“Make the hub personal-progress-centric by default”</p><p class="tl-out">→ Your own game comes first; the leaderboard is a tab.</p></li><li class="key"><p class="tl-meta">3 March 2026<span class="tl-who">Me</span></p><p>I set how the hub opens up once you have played:</p><p class="tl-q">“the global leaderboard link would be like a tab at the top, so you can toggle between scorecard and global leaderboard”</p><p class="tl-out">→ Scorecard and leaderboard became tabs, open once you have played.</p></li><li class="key"><p class="tl-meta">14 March 2026<span class="tl-who">Me</span></p><p>I design the Friends tab, a small panel per friend:</p><p class="tl-q">“they’d be ordered by who completed first, so it’s much less about competition and more about checking out what other people did”</p><p class="tl-out">→ Friends got a tab of panels, ordered by finish.</p></li><li class="key"><p class="tl-meta">3 August 2026<span class="tl-who">Me</span></p><p>Finding a stray ‘play to unlock’ screen, I press; Claude finds the last exception:</p><p class="tl-q">“I’m still not sure why we don’t either see the mode landing, mode returning or scorecard / friends views, in EVERY single case?”</p><p class="tl-out">→ The hub has exactly three screens, and no fourth.</p></li><li class="key"><p class="tl-meta">6 August 2026<span class="tl-who">Me</span></p><p>Five months on, I turn the Friends tab the other way:</p><p class="tl-q">“let’s remove the divide between your own score and your friends’ scores and have all in one ranked list”</p><p class="tl-out">→ Friends became one ranked list, you included.</p></li></ol>
<p class="tl-sum"><strong>Claude’s part:</strong> Claude recommended your own game first, with the leaderboard on a tab, and found the last stray screen; the tabs’ shape, Friends panels and ranked list were mine.</p>

### Everything around the game

#### Playing without an account

Every solo mode can be played signed out; an account keeps your history, ranks you and unlocks the head-to-head modes.

<svg class="tl-strip" viewBox="0 0 640 64" role="img" aria-label="Playing without an account: 5 steps from 21 January 2026 to 26 July 2026"><line x1="14" x2="626" y1="24" y2="24" stroke="var(--border)" stroke-width="2"/><circle cx="14.0" cy="24" r="6.5" fill="var(--accent)"/><circle cx="83.1" cy="24" r="6.5" fill="var(--accent)"/><circle cx="211.4" cy="24" r="6.5" fill="var(--warm)"/><circle cx="619.4" cy="24" r="6.5" fill="var(--warm)"/><circle cx="626.0" cy="24" r="6.5" fill="var(--accent)"/><text x="14.0" y="56" text-anchor="start">21 Jan</text><text x="626.0" y="56" text-anchor="end">26 Jul</text><text x="211.4" y="56" text-anchor="middle">22 Mar</text></svg>
<ol class="tl"><li class="key"><p class="tl-meta">21 January 2026<span class="tl-who">Me</span></p><p>Claude’s plan for profiles keeps anonymous play. I turn it down:</p><p class="tl-q">“Okay so no anonymous play. We do one-time device token score claiming. When a user plays, if they want to save their score they need to create an account.”</p><p class="tl-out">→ Saving a score needed an account.</p></li><li class="key"><p class="tl-meta">11 February 2026<span class="tl-who">Me</span></p><p>Signed-out players could replay Fog of War to save their best. I suggest:</p><p class="tl-q">“I was thinking maybe fog of war is locked behind authentication, while classic mode uses a different grid and is playable by whoever”</p><p class="tl-out">→ You had to sign in to start the daily game.</p></li><li class="claude key"><p class="tl-meta">22 March 2026<span class="tl-who">Claude</span></p><p>In a review I asked for, Claude flags the wall; I have it removed:</p><p class="tl-q">“The flagship mode gates behind authentication. New users who click the most prominent button hit a wall immediately.”</p><p class="tl-out">→ Play first, then sign in to save your score.</p></li><li class="claude key"><p class="tl-meta">24 July 2026<span class="tl-who">Claude</span></p><p>Asked how to bring players back, Claude finds a gap, and I pick its fixes:</p><p class="tl-q">“every single retention mechanism you’ve built is auth-gated, and the mode onboarding hands people into is the one that doesn’t need auth.”</p><p class="tl-out">→ Signed-out players got a streak and a scorecard.</p></li><li class="key"><p class="tl-meta">26 July 2026<span class="tl-who">Me</span></p><p>I open the other solo modes too:</p><p class="tl-q">“I’m planning to open Volt / Volt Mini up to non account holders, in the same way we’ve done Timeless. Volt Arena and Grambots stay closed”</p><p class="tl-out">→ Every solo mode plays signed out; head-to-head modes need accounts.</p></li></ol>
<p class="tl-sum"><strong>Claude’s part:</strong> Claude flagged the sign-in wall and found that every reason to come back needed an account; how much an account was needed was my call each time.</p>

#### Duels

Send someone your game and they play the same grid against you, watching your score unfold turn by turn.

<svg class="tl-strip" viewBox="0 0 640 64" role="img" aria-label="Duels: 5 steps from 13 December 2022 to 7 August 2026"><line x1="14" x2="626" y1="24" y2="24" stroke="var(--border)" stroke-width="2"/><circle cx="14.0" cy="24" r="6.5" fill="var(--accent)"/><circle cx="604.0" cy="24" r="6.5" fill="var(--warm)"/><circle cx="623.7" cy="24" r="6.5" fill="var(--accent)"/><circle cx="633.2" cy="24" r="6.5" fill="var(--accent)"/><circle cx="626.0" cy="24" r="6.5" fill="var(--accent)"/><text x="14.0" y="56" text-anchor="start">13 Dec 2022</text><text x="626.0" y="56" text-anchor="end">7 Aug 2026</text></svg>
<ol class="tl"><li class="key"><p class="tl-meta">13 December 2022<span class="tl-who">Me</span></p><p>In my 2022 game, before these transcripts, you play friends from a shared link:</p><p class="tl-q">“Re-styling Lobby page and adding shareable link”</p><p class="tl-out">→ Playing friends by link, which grew into VoltArena.</p></li><li class="claude key"><p class="tl-meta">20 June 2026<span class="tl-who">Claude</span></p><p>My January ‘beat X’ share was never merged. Asked about sharing, Claude proposes:</p><p class="tl-q">“Give it a “beat my score” deep link (date + score, or a challenge token) so the recipient lands on today’s same puzzle with your score to beat.”</p><p class="tl-out">→ A shared game became a playable challenge.</p></li><li class="key"><p class="tl-meta">2 August 2026<span class="tl-who">Me</span></p><p>After five card designs for showing a duel, I ask for:</p><p class="tl-q">“what we want is the tug of war two-colour bar we see in Volt Arena, that’s beautiful”</p><p class="tl-out">→ Duels show VoltArena’s tug-of-war bar.</p></li><li class="key"><p class="tl-meta">3 August 2026<span class="tl-who">Me</span></p><p>I want the other player’s score (Marlowe, a test player) to unfold:</p><p class="tl-q">“during game play, Marlowe’s score should increment turn by turn”</p><p class="tl-out">→ Their score climbs turn by turn as you play.</p></li><li class="key"><p class="tl-meta">7 August 2026<span class="tl-who">Me</span></p><p>I turn the friend-finished notification into a way in:</p><p class="tl-q">“on the friend finished notification if I haven’t played today when I receive maybe it can say take them on then when I click it can mint a duel automatically”</p><p class="tl-out">→ Tapping “take them on” starts a duel at once.</p></li></ol>
<p class="tl-sum"><strong>Claude’s part:</strong> Claude proposed putting the score in the share link, making it a playable challenge; friend play, the “beat X” idea, the tug-of-war bar and the unfolding score were mine.</p>

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
