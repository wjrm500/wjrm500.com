---
title: The Grand Unveiling of “Soccer Simulation”
date: '2021-08-13T08:48:53Z'
updated: '2024-01-10T08:59:01Z'
description: Good morning ladies and gentlemen! This is my first post from my new home of Singapore, where I am currently holed up for a period of two weeks in a “quarantine hotel”, with * only * my wife Kate for company. We’ve been fully locked down for four days now, and overall it’s been surprisingly…
categories:
  - Python
  - Software Development
cover: ./soccer_sim_screenshot.png
---

Good morning ladies and gentlemen! This is my first post from my new home of Singapore, where I am currently holed up for a period of two weeks in a “quarantine hotel”, with **\* only \*** my wife Kate for company. We’ve been fully locked down for four days now, and overall it’s been surprisingly okay, the occasional bout of yearning for fresh air aside. Like animals in a zoo, the scheduled deliveries of food to our room three times a day have become the highlights of our day. Anyway, I’ll stop digressing – there are more pressing matters at hand, because today is the day my Soccer Simulation Heroku app is officially unveiled to the world!

You can access the app via the button below, which I’ve also labelled to avoid any confusion

[**Go to the app →**](http://soccer-sim.wjrm500.com)

But before you click the nice, shiny button, the less impressionable among you might like to know what the app actually _is_. In a nutshell, it’s an interactive Python-based application that allows you to easily configure and run your own football league simulations, and then inspect the resultant data in a fancy UI with a dashboard-like feel. I recommend reading the app’s [about](https://soccer-sim.herokuapp.com/about) page before running your first simulation.

A couple of important things to note:

-   The app is best viewed on a laptop or desktop computer. When accessed on mobile devices, individual Club, Result and Player pages are not viewable
-   Any simulations you create in the app will be automatically deleted after 12 hours (to save storage space) – but you can persist your data indefinitely by downloading your simulation as a binary file, which you can then upload at a later point at [/existing-simulation](https://soccer-sim.herokuapp.com/existing-simulation) to view all of the data in the app

I was originally planning to release some supplementary articles around this release, with the following items being potential topics of discussion…

-   Using **HTML canvas** and JavaScript to create interactive team formation images
-   My experience using **Heroku**, including initial deployment, using a worker process and Redis queues for long-running processes, and using the “scheduler” add-on to periodically clear space on my MongoDB instance
-   Running **Redis queues** on my local Windows machine (overcoming “forking” issue)
-   **MongoDB**, and using the **GridFS** specification for storing large amounts of data
-   Using the **SendGrid API** for email sending
-   Simulation **algorithms** including team selection, match score and player rating, form, fatigue and injuries
-   Using **JavaScript** to create an interactive player data table, with row sort, row filter and column filter

… but I only ever got round to producing [an article for the first item on this list](/2021/11/26/soccer-simulation-creating-the-team-formation-graphics) in the end, owing to the fact I got carried away with new projects!

Thanks for reading, and I hope you enjoy using the app. Let me know if you have any questions, and please contact me [via LinkedIn](https://www.linkedin.com/in/william-may-6893371a3/) to report any bugs.
