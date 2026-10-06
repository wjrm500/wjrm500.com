---
title: Behold! It’s the Road Network Visualisation Tool You’ve Been Waiting For
date: '2025-04-19T23:33:42Z'
updated: '2025-10-26T19:30:04Z'
description: '11 months have passed now since I last did you a post, and much has changed in that time. I’ve had a baby, for one thing. But onto more important matters: the other day, I released a new app! It’s called Streetscape, and you can find it here. What is it? Streetscape is my way…'
categories:
  - Python
  - Software Development
cover: ./f02b1f0e-ac0f-42a2-aecb-ea40d2d55c39.webp
---

11 months have passed now since I last did you a post, and much has changed in that time. I’ve had a baby, for one thing. But onto more important matters: the other day, I released a new app! It’s called **Streetscape**, and you can find it [here](https://streetscape.wjrm500.com/).

![](./image.png)

### **What is it?**

**Streetscape is my way of making my MSc research project interactive.**

I studied MSc Computer Science with the University of Bath between 2021 and 2024, bookending my tenure with a research project entitled “Using a Convolutional Neural Network to Predict Road Traffic Accident Risk from Geographic Data”. You can find the dissertation [here](/wp-content/uploads/2025/04/Using-a-Convolutional-Neural-Network-to-Predict-Road-Traffic-Accident-Risk-from-Geographic-Data.pdf) if you’re interested.

The chain of thought that powered the project can be expressed thus: that geographic factors such as road shape and topography affect the likelihood of a crash happening; that these factors exert their effects in complex ways, both individually and in interaction; that that complexity would be rejected by the heavy discretisation necessary to produce traditional machine-learnable input; that colourised map images, as high-dimensional encodings of spatial data, represent a compelling way to capture that complexity; and that convolutional neural networks (CNNs) can act as a bridge to connect the power of images with the power of machine learning.

By feeding a CNN tens of thousands of colourised map images representing the locations where crashes have and have not taken place in Great Britain, the hope was that the model would learn to distinguish dangerous visual motifs.

Generating these images was a big technical challenge. It meant integrating a variety of data sources, including the Department for Transport’s (DfT) road traffic accident (RTA) data, OpenStreetMap (OSM) road shape data, Shuttle Radar Topography Mission (SRTM) elevation data, and traffic data compiled by local authorities from around Great Britain. It also meant performance optimisation – I needed to generate tens of thousands of images, not just on a one-off basis, but again and again and again, with various parameters tweaked and innovations encoded, as part of a drive to optimise the model by optimising the training data.

At the core of the software solution was a tool for generating an image from a pair of geographic coordinates, using OSM and SRTM data. **Streetscape provides an interactive web interface to this tool.** Streetscape and my training data generation process both ride on the back of the same code under the hood; the difference is that in Streetscape, the user provides a single place name that is geocoded to a set of geographic coordinates; while in the training data generation process, those coordinates were either taken from real-world collisions (crashes) as per DfT, or my bespoke negative sampling algorithm, which aimed to produce a dataset representative of real-world driving patterns, to contrast the collision data.

### **What is it not?**

Streetscape is not a useful standalone tool. As mentioned above, the image generation software that it exposes was specifically designed for generating training data for a highly domain-specific machine learning model_._

### **How should you use it?**

If you’re looking for a good time, get yourself down to the local boozer, pay the barman £10 to sing “WE LIKE TO DRINK WITH {INSERT YOUR NAME HERE}” while you sink a pint of best bitter in record time, and then immediately return home as if nothing happened. But if you’re looking for a good time _while using Streetscape_, then try to think of a query that will generate an interesting visualisation. This might mean a place where the surrounding road network has an interesting shape, or with substantial elevation change. A query like “Edinburgh Castle” with elevation rendering enabled gives a relatively interesting result (hence why I used it for the screenshot above). Complex road networks by large bodies of water can also give interesting results if you zoom out far enough (try “Lake Windermere, Cumbria” with the extent value set to at least 500 m). “The White Cliffs of Dover” is an example of a place that combines the two.

### **A word of warning**

There are performance concerns that it helps to be aware of while using the app. Most importantly, **increasing the extent value increases the query time exponentially.** Elevation rendering and background smoothing have negligible effect when extent is limited, but can become blockers in their own right when extent is high. Including all roads can have an even more deleterious effect on performance given high extent, and this effect is exacerbated if feature extraction is enabled. To protect web server resources, there is a 30-second query timeout in place, and you are _very likely_ to bump up against this if you are not cautious with your parameter adjustments.

### **What comes next?**

I really ought to add the CNN and have it generate a crash risk index to return alongside the map image. This seems like a colossal oversight now, especially as the model itself is relatively lightweight.

And it might be cool to load a bunch of RTA data and allow users to select a random collision location, providing details of the collision along with the map image.

**With all of that said: happy generating!**
