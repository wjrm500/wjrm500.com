---
title: Download my homemade Catan game!
---

If you want to try out my Catan game and / or learn more about how to play it, you’re in the right place.

Windows users can download my Catan game by clicking on the “Windows Download” button below the next paragraph. I **highly recommend** following the “Getting set up” guide beneath the button, in order to enjoy as smooth a setup experience as possible.

MacOS users: unfortunately, I can’t offer you a working executable at this time, but the more tech-savvy among you may like to clone [the repository from GitHub](https://github.com/wjrm500/Catan), install dependencies from the _requirements.txt_ file (_pip install -r requirements.txt_) and run the game from the command line (_python client.py_). You’ll need Python version 3.8 or above installed – I make liberal use of the [Walrus operator](https://realpython.com/lessons/assignment-expressions/) in the code. Apologies!

[**Windows Download →**](/wp-content/uploads/2022/03/wjrm500_Catan.zip)

**Getting set up**

1.  Click the button above
2.  If you’re using Google Chrome, kindly ignore the warning message “_wjrm500\_Catan.zip is not commonly downloaded and may be dangerous_“: click on the upwards-pointing arrow, then click “keep”
3.  When it’s finished downloading, click on the zip file and you’ll open up a folder containing an application called “_wjrm500\_Catan_“
4.  If you’re on Microsoft Windows, you may see the message “_Windows protected your PC – Microsoft Defender SmartScreen prevented an unrecognised app from starting…_“. Click “More info” and then “Run anyway”
5.  When the application opens, click “New game”
6.  Enter your desired number of hexagons. Traditionally a Catan board comprises 19 hexagons
7.  When you click “Submit”, if you’re on Microsoft Windows you’ll get another pop-up – a “Windows Security Alert” that says “Windows Defender Firewall has blocked some features of this app”. In order to play the game over a local network, **you need to allow the application to communicate over “private networks”** (the application does _not_ need to communicate over public networks!). Starting a new game of Catan means allowing other computers on your local network to connect to your computer, which will act as a server and host the game
8.  In the lobby, note the IP address that appears in the little grey box below the Catan logo
9.  This game is made to be played by between two and four players. **It cannot be played by a single player**. Therefore, to play this game, you will need to find one to three participants with access to **different computers on the same network** as you. Have them follow steps 1 through 4 on their own device, but instead of clicking “New game”, have them click “Existing game”
10.  Have the other participant/s enter the IP address displayed on your screen, and click “Submit” on their own instances of the application
11.  You and the other participant/s are now all connected to the game, and ready to play!

**How to play the game**

If you’ve never played Catan before, you can learn how to play by watching [this YouTube video](https://www.youtube.com/watch?v=oiQ6SgBzfqY). You can also use [this rulebook](https://cdn.1j1ju.com/medias/7a/18/fd-catan-rulebook.pdf) for reference during gameplay. My digital version of Catan mimics the real-life board game in almost all major aspects; however, there are a number of differences…

-   In my version of the game, **settlements are known as “villages”**, to distinguish them from the more general term “settlement”, which in my version refers to either a village or a city
-   In my version of the game, you can spin up a game board comprising as few as 5 and as many as 61 hexagons. Smaller game boards may have no desert hexes; larger game boards may have multiple desert hexes. In the real-life, standard edition of the game, the game board always comprises exactly 19 hexagons, including one desert hex
-   In my version of the game, the number of items – villages, cities, roads and game tokens (which I’ll get onto in a second) – each player is granted at the beginning of play is scaled according to the number of hexagons on the board. More hexagons means more of each item, for a more expansive game format
-   In my version of the game, **the number of victory points required for victory is also scaled according to the number of hexagons on the board**
-   In order that you may be able to enjoy Catan in its original format, you should be aware that if you run the game with a 19-hexagon board, the number of items granted to each player, and the number of victory points required for victory, will correspond with the real-life game – five villages, four cities, 15 roads, and a victory point limit of 10
-   In my version of the game, ports are randomly generated and each occupies just a single coastal “node” – they do not extend across two, adjacent coastal “nodes”, as in the real-life game
-   Taking inspiration from an unofficial set of rules designed for two-player Catan, released around the start of the global Covid-19 pandemic, **“game tokens” have been introduced**. Each player begins with five game tokens (on a 19-hexagon board), and can spend their tokens on one of two, new actions…
-   The first new, game token-only action is “**Move robber to desert hex**“. On their turn, players may swap one of their game tokens (or two, if they have more victory points than any other player) in exchange for moving the robber from its current position to a random desert hex. This action is not available on smaller game boards where there is no desert hex
-   The second new, game token-only action is “**Swap two cards with opponent**“. On their turn, players may swap one of their game tokens (or two, if they have more victory points than any other player) in exchange for the ability to choose two resources cards from their hand (can be two resource cards of the same type, or two resource cards of different types) and force swap them with two random resource cards from a random opponent’s hand. This action is not available if no other player has at least two cards in their hand
-   Building a village either on the coast or on a desert hex will replenish your game token count by one
-   In my version of the game, when you place the robber on a hex, you are not able to actively select which player with a settlement on the robbed hex that you wish to rob; the player to be robbed will be selected randomly from the players with settlements on the robbed hex (excluding yourself)
-   In my version of the game, **you are not able to select which cards in your hand you keep when** **you are robbed**. This was a conscious design decision – I think it creates more fun and chaos when you lose random cards from your hand!
-   In my version of the game, **it is _not_ possible to trade with other players**. There is no good reason for this; I just never got round to implementing this functionality. Apologies for this! Trading with the bank _is_ still possible
-   In my version of the game, drawing a victory point development card will cause your publicly visible victory point tally to increment immediately – victory point development cards are not “playable”, and the victory points accrued from these cards are in no way latent or concealed from other players

The user interface consists primarily of the game board in the left-hand panel, and a set of four, collapsible sub-panels in the right-hand panel: “Play”, “Status”, “History” and “Chat”; the functions of each of which are described below:

-   The “Play” panel varies in its appearance depending on whether or not it’s currently your turn. If it’s not your turn, it is simply the place you go to view the contents of your hand, which is to say the number and type of resource cards and development cards you have, and the number of villages, cities, roads and game tokens you have remaining.
-   If it _is_ your turn, the “Play” panel is the place you go to actually _do stuff_. After rolling the dice, beneath the stuff mentioned in the bullet point above, you’ll also see a scrollable list of actions, with each action coloured either light grey if you cannot afford the action, or black if you _can_ afford the action. If you click an available action, then depending on that action, a variety of different things might happen – I won’t go into each action here, as there are quite a few, and the interface is designed to make doing each action feel intuitive. Suffice to say, **if you are ever in doubt over what you should be doing, look at the instruction written in the rectangular box in the bottom left corner of your user interface**!
-   The “Status” panel is what I like to think of as an analyst’s dream, displaying not only the number of victory points, army size and longest road for each player, but also a dice roll number distribution graph, so you can see how many times each dice roll number has appeared; each player’s “resource potential” (the higher a player’s resource potential, the more quickly they will accumulate resources); the number and type of resources each player has won; and the number and type of resources each player has lost to the robber. Most commonly, you will use this panel to check on the status of the game (hence the name) – you might want answers to questions such as: Who’s winning? If another player has the largest army, how many knights do you need to play to overtake them? How safe is your longest road? Or, if it’s not your turn, you might choose to flick onto this panel purely to investigate that nagging sensation that the gods of chance are against you!
-   The “History” panel is a colour-coded event log – a comprehensive guide to everything that has happened in the game so far. The textual descriptions of events that you’ll find in this panel also appear in real-time in the left-hand panel, above the game board, so that all players are able to keep up with proceedings no matter which of the right-hand sub-panels they are in the process of perusing
-   The “Chat” panel offers a simple, timestamped and colour-coded chat room, with a built-in profanity filter. Try out the profanity filter for a laugh – it’s not exactly watertight, put it that way! Just resist the urge to hurl too much abuse at your fellow players

**Conclusion**

Thanks very much for reading, and I hope you enjoy the game.

_For those interested in reading more about how I created the game, there’s an article with your name on it – find it [here](/2022/03/10/a-catan-love-story)._

_Please don’t hesitate to get in contact if you encounter any bugs in the game – I’m sure there’ll be a few lying in wait, and it’d help me out massively if you could report these to me as and when you find them. Contact me via email at [wjrm500@gmail.com](mailto:wjrm500@gmail.com), or via LinkedIn at [https://www.linkedin.com/in/william-may-6893371a3](https://www.linkedin.com/in/william-may-6893371a3)._

**DISCLAIMERS:**

-   No copyright infringement is intended. This game is purely a personal project, and even if my implementation was polished enough to monetise (which, sadly, it is not), that would not be my intention.
-   I discovered a little while after starting the project that my work here is hardly pioneering – from a quick search on GitHub, I found that numerous programmers have, with varying degrees of sophistication, created digital versions of Catan in the past; and, of course, there is [the all-singing, all-dancing official digital version of the game](https://www.catan.com/catan-universe), which puts mine wholly to shame!
