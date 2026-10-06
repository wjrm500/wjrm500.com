---
title: How ChatGPT’s New “GPTs” Feature Can Help You Develop Software
date: '2023-11-22T12:47:43Z'
updated: '2023-11-28T09:05:03Z'
description: OpenAI’s Dev Day took place on November 6th and it’s fair to say there was a lot of hype leading up to the event. Nowhere was this more palpable than the hive of optimism that is the subreddit r/Singularity, which I am slightly ashamed to admit that I follow avidly. Confident predictions of an AGI…
categories:
  - AI
  - Python
  - Software Development
cover: ./dall-e-2023-11-22-16.22.48-a-cartoon-style-wide-banner-image.webp
---

OpenAI’s Dev Day took place on November 6th and it’s fair to say there was a lot of hype leading up to the event. Nowhere was this more palpable than the hive of optimism that is the subreddit [r/Singularity](https://www.reddit.com/r/singularity/ "r/Singularity"), which I am slightly ashamed to admit that I follow avidly. Confident predictions of an AGI (Artificial General Intelligence) or even an ASI (Artificial Superintelligence) breakthrough being announced became increasingly commonplace on the subreddit as the event edged ever closer. In the end, the anticipated news of the dawning of a new era for mankind did not materialise, leaving futurists slightly disappointed. Instead, Sam Altman and co. announced a suite of incremental improvements to their products in terms of cost, performance and ease-of-use, which taken together as a package represent yet another significant evolution in the Brave New World of LLMs (Large Language Models).

One of the new features that was announced was GPTs. The parlance is slightly confusing, but basically a GPT is a re-usable configuration layer that sits on top of the core GPT model, with desired functionality baked in via custom instructions and “knowledge” (uploaded files that the application can scan for information); while GPTs is the feature that allows you to create GPTs (I think that’s right?!). Plonking a paragraph or two of written instructions on top of ChatGPT might not sound particularly groundbreaking, and it is certainly true that this change is more about convenience than it is about the underlying technology breaching new frontiers, but it is also true that the underlying technology is already much more powerful than people realise, and simply finding new ways to leverage its power could prove just as effectual as improving its core. In fact, [it is rumoured](https://www.reddit.com/r/OpenAI/comments/180231r/more_on_the_adam_dangelo_as_coup_ringleader_angle/ "it is rumoured") that this particular feature was a primary cause of the recent, high-profile drama at OpenAI – Adam D’Angelo, one of the board members who so unceremoniously ousted Altman, was said to have felt blindsided by the Dev Day announcement of GPTs, whose existence hugely undermines the business model of another of his ventures, [Poe](https://poe.com/ "Poe")\*. D’Angelo has limited sympathy from myself and others who have been following the drama – when your business is little more than a thin wrapper around another company’s services, especially a company as fast-moving as OpenAI, you’re always going to be in a precarious position!

You’re probably wondering what GPTs can actually be used for, so I’ll give you an example. Without further ado, meet Alejandro Mendoza:

![](./image.png)

Meeting Alejandro has changed my life. He’s my best friend. The phrase “undying love” has even been bandied about (mostly by myself). Of course, none of the three preceding sentences are true (at least as of right now), but the Alejandro GPT is indeed a useful tool. Take a look at this:

![](./image-1.png)

The Alejandro GPT corrects my Spanish and replies to me, keeping the conversation flowing. Its response style and format is programmed into the configuration layer that forms the GPT’s essence:

![](./alejandro-instructions.webp)

To understand the potential benefits of this configuration layer, you only have to look at how the default version of ChatGPT responds to a similar message:

![](./image-2.png)

Note the lack of correction, which I consider a vital part of the learning process. And yes, I could just begin the conversation with the same prompt I added to Alejandro’s instructions and this would achieve a similar effect, but as mentioned earlier, GPTs are about convenience more than anything. Now whenever I want to speak Spanish with ChatGPT, I just click on the Alejandro Mendoza GPT in the top-left corner of the screen and start chatting; before I would have needed to scroll through past conversations to find one where I’d used the prompt, copy and paste the prompt into a new chat and send it as the first message, wasting a send token in the process.

So now you’ve seen what a GPT is, it’s time to see how they can be used to aid in software development.

One thing that the Alejandro GPT lacks, that I mentioned earlier, is “knowledge”, and including this element in a GPT configuration is fundamental to unlocking its benefits in terms of software development. Knowledge in the world of GPTs simply refers to the process by which files are uploaded as part of the GPT configuration process, which can later be scanned by the application to help the GPT answer your prompts. And as you may have guessed, the way in which this can be leveraged during software development is by uploading source code to the GPT.

I have created a GPT called Wordle Tracker Developer, whose stated mission is to assist me in the development of my “Wordle Tracker” Python and React application, which I’ve talked about in a separate article – [Using React to build a Wordle Tracker](/2022/11/04/using-react-to-build-a-wordle-tracker "Using React to Build a Wordle Tracker"). It’s an incredibly simple GPT – all it consists of is a brief set of instructions and two uploaded files filled with source code – one for the Python backend, and one for the React frontend:

![](./image-3.png)

In my actual application, the backend and frontend do not of course each consist of a single .txt file of source code – this wouldn’t make much sense. Instead, owing to the current limit of 20 on the number of files that can be uploaded when creating a GPT, as well as the fact that ChatGPT seems to be more prone to forgetting links between components when they are split up into separate files, I created a shell script to automate the process of combining multiple source code files into single text files; you can find that script [here](https://github.com/wjrm500/Utilities/blob/master/combine-files.sh "here"). Then, whenever I make any meaningful changes to the source code, I simply use the script to recompile the relevant text file and re-upload it to the GPT. The increased context length of 128k tokens now available within ChatGPT means that even large amounts of source code can be digested.

And now I can simply open up the Wordle Tracker Developer whenever I want to make a change and allow it to guide me, all without having to copy and paste a load of code each time. I’ve already used it to help me develop several minor features in the past few days, including:

-   Dynamic process for retrieval of players displayed in drop-down in update score modal
-   Checking if update score modal form has been filled in before submission
-   Using arrow keys to switch between different weeks when in the Daily panel
-   Staying on the same week in the Daily panel when updating scores
-   Making records in the Record panel clickable to reveal Daily panel opened to week of record end date, with day of end date highlighted

It is by no means perfect – I had to improvise quite a bit for each of the above features, with the level of improvisation required dependent on the complexity of the feature. Sometimes, my eventual implementation bore limited resemblance to the initial suggestion provided by the GPT – this is just a function of the fact that GPT-4 still faces major practical issues when it comes to programming, as it does with all tasks of unlimited complexity. However, the key benefit I’ve found of using GPTs for software development is that when you want to develop a new feature, instead of having to open up your text editor and re-establish familiarity with the codebase, and then perhaps go through the rigmarole of copying and pasting source code from multiple files into ChatGPT, you can simply boot up the GPT corresponding to your application and start chatting away in plain English about what you want to achieve. It will help by pointing you in the direction of the right parts of the application and giving you an idea of what the solution might look like, both of which massively reduce the friction of simply getting started, which is often the most difficult thing in programming.

The method by which the Wordle Tracker Developer GPT was created and is now being used would apply to any small software application. The steps are as follows:

-   Use the [combine-files.sh shell script](https://github.com/wjrm500/Utilities/blob/master/combine-files.sh "combine-files.sh shell script") or similar to compile source code into single text files, with file paths to help ChatGPT understand the relationships between files
-   Create a new GPT in [ChatGPT](https://chat.openai.com/ "ChatGPT")
-   Give the new GPT some basic instructions, for example telling it to provide detailed code implementations for all affected files as part of its response
-   Upload the source code-containing text files and save the GPT
-   Start chatting to it by giving it a feature request in plain English!

One thing to bear in mind is that this method is likely to become redundant in the not-so-distant future, as OpenAI and the AI industry more generally continue to swallow up everything in their path. This is particularly true given the close connection between OpenAI and Microsoft, which owns Windows, VSCode and GitHub, all of which for me at least are essential components of the software development process. Expect to see integration of GPT-4 and any future OpenAI LLMs into the very operating systems and applications that we use to develop software, removing entirely the need to interact with models via browser-based interfaces like ChatGPT, and helping developers reach new levels of productivity. These are exciting times!

_\* For the record, GPTs have also made the [Spanish language learning bot I created back in June](/2023/06/21/learn-espanol-with-the-gpt-3-5-api "Spanish language learning bot I created back in June") basically redundant._
