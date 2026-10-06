---
title: The Great Migration
date: '2024-01-09T13:14:47Z'
updated: '2024-01-10T08:56:08Z'
description: The other day I launched my very first AWS EC2 instance and migrated this website, and a couple of web apps, onto it. It was a long time coming – the annual cost of web hosting with Bluehost has increased from a discounted £51.72 in 2021 to £118.30 in 2023, while my Soccer Simulation app…
categories:
  - AWS
  - DevOps
  - PHP
  - Python
  - Software Development
cover: ./dall-e-2024-01-09-13.04.36-a-horizontal-banner-image-featuri.webp
---

The other day I launched my very first AWS EC2 instance and migrated this website, and a couple of web apps, onto it. It was a long time coming – the annual cost of web hosting with Bluehost has increased from a discounted £51.72 in 2021 to £118.30 in 2023, while my [Soccer Simulation app](https://soccer-sim.wjrm500.com/) has been inactive ever since Heroku [announced that it would no longer be offering free dynos](https://help.heroku.com/RSBRUH58/removal-of-heroku-free-product-plans-faq) in November 2022. The solution of hosting all of my stuff on my own server is something I’ve been toying with for a while, and thanks to ChatGPT and a bit of elbow grease, that dream has now become a reality. Doesn’t it feel great knowing that the web page you’re reading from right now was served to you by our benevolent masters at Amazon?

In this article, I’m going to describe the entire setup and migration process. It’s not thrill-a-minute stuff, but anyone interested in understanding how such a process works “under-the-hood” might find it interesting.

## Understanding WordPress

Firstly, we need to discuss how this website works. You’ve probably heard of WordPress before, even if you don’t know what it is. In a nutshell, WordPress is a PHP application that is installed onto and runs on a web server, providing (A) an admin portal to allow the website owner to create content, all of which is stored in a MySQL database, and (B) a mechanism to retrieve content from this database to display to users according to the specific request they make to the website.

So, let’s say I want to create a new “FAQ” page. I’d go into the admin portal, click “Add new page”, change the permalink or URL to “faq”, add some HTML content using WordPress’s easy-to-use Block Editor GUI, and hit “Save”. In the backend, the WordPress application would then create a new row in the `wp_posts` table, with `post_type` set to `page`, `post_name` set to `faq`, and all of the HTML content stored in one great blob of text in the `post_content` field.

Then, when a user makes a web request to `https://wjrm500.com/faq` in future, the web server will look for a physical file called `faq` at the root of its filesystem, be unable to find it (this is normal), and re-route the request to `index.php` (thanks to a rewrite rule in a config file called `.htaccess`), which is the entry point to the WordPress application. WordPress will then search the `wp_posts` table for the row with a `post_name` value matching `faq` and retrieve the HTML content to serve to the user from this row’s `post_content` field.

So that’s what WordPress is, and this is a WordPress website.

## How this website was hosted previously

Because of the popularity of WordPress as a means of creating and sharing web content (43% of all websites use WordPress, as of November 2023), many web hosting companies offer integrated WordPress solutions, whereby they not only provide the web server but also a WordPress installation on top of that. WordPress is free software but having it all set up and configured for you certainly makes life easier. When I was looking to get this website live back in 2021, an integrated WordPress solution made a lot of sense, especially considering the no-frills nature of the blog I had in mind. I also needed to register the no-doubt wildly-in-demand domain name wjrm500.com, and for that I required a certified domain name registrar. Fortunately, there were lots of companies that bundled together domain and web hosting services into straightforward packages; one such company was Bluehost, and that’s who I went with. Thus was wjrm500.com born.

## How my web apps were hosted previously

As well as maintaining this website, I’ve also deployed a few standalone web applications onto the internet over the past couple of years, including:

-   Soccer Simulation – this allows you to generate a custom football “simulation”, with the end product being a single season’s worth of league, club and player data from that simulation
-   WordleWise – this is what me and Kate use to record our Wordle scores every day! It aggregates scores by week and keeps track of a number of different records

Soccer Simulation is a server-side rendered application that was previously hosted on the Heroku platform at https://soccer-sim.herokuapp.com, until Heroku removed its server free tier. Heroku abstracted away the responsibilities of server management and through its GitHub integration made it very easy to deploy changes – all you had to do was push your local changes to origin. Heroku was free while I used it, with the frustrating but understandable compromise that your app would be put to sleep if it hadn’t been used for more than 30 minutes, which made load time _veeerrry_ slow.

WordleWise is an application whose React frontend and Python backend are deployed separately, in-keeping with the modern way of things. The React frontend was originally, and remains, deployed via the static web host GitHub Pages, which is suitable because a React application can be compiled into static files, which only “come to life” once transferred to the client. Meanwhile, the Python backend was previously deployed on a platform called Render, which is basically analogous to Heroku, the only difference being that it continues to offer a free server tier to this day. Like Heroku, Render puts temporarily inactive applications to sleep, and the resulting high load time has been a source of daily frustration over the past year and a bit.

## Setting up the EC2 instance

Launching an AWS EC2 instance was fairly straightforward, all conducted via the AWS Management Console, which is the browser interface for configuring and managing your AWS services. Originally I launched a `t2.micro` Ubuntu instance, with only 1 GiB of RAM and 8 GiB of storage, but ditched this post-migration after noticing poor performance. In its stead, I set up a more performant `t3.small` Ubuntu instance with 2 GiB of RAM and 24 GiB of storage, and configured an EC2 Instance Savings Plan worth £132.24 per year to avoid on-demand prices. EBS storage is billed separately, at ~£0.09 per GB-month – with my current storage usage of 4.8 GB, that works out at about £5.24 per year. So, assuming my requirements don’t change over the course of the year, I’m looking at a total cost of £137.48, an increase of £19.18 over the £118.30 I paid for basic web hosting on Bluehost in April 2023. But I’m now in control of my own server, and can deploy whatever I like on it. To get equivalent RAM and server access via Bluehost, I’d have to shell out £753 (!) per year for standard VPS hosting.

## Migrating Soccer Simulation and WordleWise

Figuring that migrating my WordPress website would be the most challenging aspect of this whole process, I opted first to migrate across the individual web applications Soccer Simulation and WordleWise. My idea was to have a web server running on the EC2 instance that directed requests from subdomains to Docker containers served via separate ports, with each Docker container housing a separate web application. This meant first Dockerising my web applications, a process that involved much troubleshooting, especially in the case of the old, rather complex Soccer Simulation app, which requires interplay between four separate services:

-   A Python Flask application to allow simulations to be configured for creation and to display simulation data from a cloud-hosted MongoDB instance, all via Jinja2 templates
-   A Redis instance serving as a queue for pending simulations
-   A Python worker process that reads from the Redis queue and processes the computationally-intensive simulations in the background, allowing the Flask app to focus on serving requests
-   A cron job that triggers a Python script to delete data from the MongoDB instance every 12 hours

Once Docker images had been built and pushed up to the container registry Docker Hub, I created a new git repository `AWSServer` on my local machine and cloned it on the EC2 instance, so that I could manage server configuration in VSCode and keep everything version-controlled. I added separate `docker-compose.yml` files for both the Soccer Simulation and WordleWise applications, to facilitate easy deployment, with exposed ports taken as environment variables from a central `.env` file to ensure no accidental port overlap across applications. The way ports work in this context is that each Docker container runs on a separate port on the EC2 instance (e.g., Soccer Simulation on port 5001, WordleWise on port 5002), but port mapping during container instantiation (as encoded by Docker-Compose) allows both web applications to be run on the Flask default port 5000 within their respective Docker containers. The Docker containers were then started on the instance using Docker-Compose – now they just needed to be exposed to the internet.

Next, I installed Nginx on the EC2 instance, created a new Nginx configuration (`nginx.conf`) inside my `AWSServer` repo, and [symlinked](https://en.wikipedia.org/wiki/Symbolic_link) this version-controlled configuration file to its expected location at `/etc/nginx`. The Nginx configuration was designed to redirect any subdomain requests (e.g., `soccer-sim.wjrm500.com`) to the ports of their corresponding containerised applications (e.g., port 5001 in the case of Soccer Simulation, or `localhost:5001`). I also needed to obtain and install an SSL certificate for the domain wjrm500.com and its subdomains using Certbot – SSL certificates are necessary to serve HTTPS requests, and HTTPS was necessary thanks to the [mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) web rule and the fact that GitHub Pages serves exclusively over HTTPS. Basically, a web page loaded over HTTPS can’t make AJAX requests for content over HTTP, for security reasons. Once the SSL certificate was installed, I needed to set up a cron to automatically renew the SSL certificate, which naturally expires after 90 days.

The final step was to modify the DNS settings of my domain wjrm500.com, which was and will continue to be managed by Bluehost – specifically, I needed to add new [A records](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-a-record/) for the subdomains `soccer-sim.wjrm500.com` and `wordlewise.wjrm500.com` and set their values to the Elastic IP address associated with my new EC2 instance.

With all of this done and my Nginx web server now running alongside the Docker containers, I was now able to access Soccer Simulation and WordleWise over the internet!

## Migrating my WordPress website

A WordPress website, as touched upon earlier, is really just a PHP application, a MySQL database and a bunch of media files – pictures and things like that you upload while creating your website. The PHP source code and media files are stored in a directory called `public_html` on the web server that runs the WordPress instance, and I was able to download this as a ZIP file from Bluehost without too much difficulty, thanks to Bluehost’s File Manager interface. As for the MySQL database, Bluehost, like many web hosting providers, stores your WordPress database on a shared MySQL server instance, alongside numerous other databases belonging to other Bluehost users. It’s all secure of course, thanks to permissions settings, but it meant that my database had the funky name `wjrmfivz_WPKKM`. Using the phpMyAdmin application offered by Bluehost, I was able to easily export this database as a `.sql` file.

I used SFTP to transfer `public_html.zip` and `localhost.sql` (which was the name automatically assigned to the SQL file on download) across to my EC2 instance. Then, I unzipped the `public_html` folder and moved it to `/var/www/html`, and created a new `docker-compose.yml` file for WordPress in my `AWSServer` directory, specifying two containers: one for WordPress, and one for MySQL. The `/var/www/html` folder was mounted into the WordPress container, while the MySQL container was configured with a new named volume `db_data` for persistent storage on my EC2 instance. I removed the `.htaccess` and `wp-config.php` files from the `/var/www/html` directory, recreated them in the `AWSServer` directory and then mounted these files as separate volumes to the WordPress container, for ease of management (symlinks couldn’t be used as they aren’t resolved properly inside Docker containers). Some tweaks had to be made to both of these configuration files, including changing the database credentials and telling the application to recognise the forwarded HTTPS protocol from Nginx to prevent a particularly annoying `TOO_MANY_REDIRECTS` error.

After all this had been done, I booted up the WordPress services using Docker-Compose, accessed the MySQL container with the `docker exec` command, and imported the `wjrmfivz_WPKKM` database. At this stage, both the WordPress and the MySQL instance were ready to go – but like before, I needed to modify the DNS settings to point `wjrm500.com` away from the old Bluehost IP address and towards my new AWS Elastic IP address. Once I’d done that, the migration process was complete!
