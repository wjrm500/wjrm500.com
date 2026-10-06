---
title: Fun and Games with SQLAlchemy
date: '2021-11-10T05:20:42Z'
updated: '2022-08-17T14:37:54Z'
description: I’ve spent quite a bit of time over the past couple of days transforming the data access layer of one of my Flask applications from a purely psycopg2-based mess to an SQLAlchemy-based not-quite-such-a-mess, and I thought I’d share some thoughts on the process. Introduction As a former data analyst, my face has been permanently sootened…
categories:
  - Python
  - Software Development
cover: ./sqlalchemy-3.jpg
---

I’ve spent quite a bit of time over the past couple of days transforming the data access layer of one of my _Flask_ applications from a purely _psycopg2_\-based mess to an _SQLAlchemy_\-based not-quite-such-a-mess, and I thought I’d share some thoughts on the process.

#### **Introduction**

As a former data analyst, my face has been permanently sootened from long days spent at the SQL coalface, rattling off an endless succession of raw queries in the faint hope of unearthing something pertinent from the dark mine that is the database.

Then, when I became a web developer, I learned about database abstractions. These initially filled me with rage – we use a bastardised version of _Laravel_’s _Eloquent_ ORM at my place of work, and I remember thinking it was the _devil_ when I first heard about it. At that point, SQL was about all I had in my skills locker, and so the idea that it might be rendered practically redundant was a frightening one, luddite that I am.

I’ve grown more used to ORM over time, and no longer need convincing of its benefits. However, when I coded the data access layer for the _Flask_ app under discussion in this article six months ago, I simply used the _PostgreSQL_ database driver library _psycopg2_, which requires textual, relational database management system (RDBMS)-specific SQL to be passed to an _execute_ method. _SQLAlchemy_ felt unnecessary at the time, as I had no desire to impose an object-oriented architecture on the core algorithm, which lives or dies by the speed at which it is able to process input.

Recently, however, it became plain that layering _SQLAlchemy_ over _psycopg2_ was the way forward for the backend of the app. The three major motivators for this were:

1.  Not wanting to be tied down to a particular RDBMS
2.  Cleaner, more readable data access
3.  Database migrations – the _Flask-Migrate_ library seems to be the standard way to handle migrations for a _Flask_ app, and this library is built on top of _SQLAlchemy_. Therefore, to avoid reinventing the wheel by building my own migration logic, it seemed _SQLAlchemy_ was required

I should clarify that even after the transition to _SQLAlchemy_, the core algorithm is still for the most part free of complex, custom objects, as it should be – all that’s really changed is the way data is persisted to and loaded from the database.

#### **The transition to _SQLAlchemy_ – a short story**

Transitioning to _SQLAlchemy_ turned out to be a bit of a lesson in how little I know about databases – but having your lack of knowledge exposed is the best motivation to learn! I’ve divided up my notes on the experience into three separate parts. I hope that together they provide for a relatively interesting read.

**Part 1 – Why do they want everything in one file?!**

Being fairly familiar with the _Laravel_ _Eloquent_ ORM, setting up classes that map to database tables and defining fields and their datatypes in those classes was a fairly straightforward process. Defining relationships was a little trickier – I had gone out of my way to normalise the database when I revamped it a few months ago, and this meant I now had nine interconnecting tables, with one-to-many relationships galore. Initially I defined the one-to-many (and many-to-one) relationships on both parent and child classes using the _back\_populates_ parameter, but eventually abandoned that in favour of the more succinct _backref_ parameter, which when used in the parent class removes the requirement to define the relationship in the child class. I found the way one-to-one relationships work in _SQLAlchemy_ interesting – what you effectively have is a parent-child relationship under the hood, but by passing an argument _uselist = False_ to the _relationship_ method in the parent class, you effectively convert a method that would have returned a list of children into a method that returns only a single child; and of course, in object-oriented programming children tend to have only one parent (multiple inheritance aside!), so the _relationship_ method on the child returns a scalar value also – thus, you end up with a kind of pseudo-equality between the classes.

One thing I find odd about _SQLAlchemy_ is that it appears to be standard to define multiple data model classes in a single file. Call me old-fashioned, but that seems a bit wrong to me – I was brought up with the notion that each class should have its own file. The yuppies of today, honestly! And so, being belligerent, I stuck to my guns and put each of my data model classes in their own file. The programming gods immediately punished me for my disobedience, offering up a new problem for me to wrap my head around – because I was importing _declarative\_base_ and creating a separate _Base_ class variable in each file (to be extended from by the data model class in that file), database metadata was not being shared amongst classes, and attempting to create relationships between tables led to the _NoReferencedTableError_.

What I needed to do was have a single _Base_ variable that could be accessed by all of my files. And intriguingly, the simplest solution seemed to be to put that variable inside the _\_\_init\_\_.py_ file in the directory containing all of the data model class files. Being an OOP acolyte, I had of course used _\_\_init\_\_.py_ files – for the uninitiated, they turn directories into Python packages – but I had never put any code into them before – heavens no! My _\_\_init\_\_.py_ files had always been virginal things, unsullied by my horrible code. Well, it turns out that the contents of the _\_\_init\_\_.py_ file are actually executed when its containing module is imported, and variables defined in the file can be conveniently grabbed from the module namespace – two facts which make the file a perfect candidate to host a shared _Base_ variable!

**Part 2 – As Matthew Crawley implored of Mary Crawley in season one of _Downton Abbey_: “_Just commit already!_”**

Another confusing aspect of the transition to _SQLAlchemy_ came courtesy of confrontation with the realities of database transactions, and attempting to understand the difference between the _Session_ methods _add_, _flush_ and _commit_. Despite using SQL day in, day out for almost two years whilst working in data, I’m ashamed to admit that I never really gained much of an appreciation for database transactions. After all, nobody at my company ever seemed to use them, and by the time I had found out all about their benefits, it all seemed rather academic – I felt I could already do everything I needed to do in the database, and the additional statements required to support transactional behaviour seemed rather unnecessary. In short, I was A Clod In Denial.

Even when working with database abstractions, I’d got used to writing statements like this…

```js
$user = User::create([
   'username' => $username,
   'password' => md5($password)
]);
```

…whereby the _id_ property on the _user_ variable is immediately available for usage in subsequent statements, indicating that the _User::create_ function is causing the query to be run against the database there and then – with all of the adding and the flushing and the committing apparently done behind the scenes.

Because of all this, the requirement to explicitly commit transactions in _SQLAlchemy_ threw me initially. And I did indeed require almost all of my transactions to be committed immediately, as I needed last insert IDs for building up foreign key relationships across tables.

As I’d been learning about decorators recently, I took this opportunity to get busy with them, creating a _@commit\_transaction_ decorator that I used to wrap _SQLAlchemy_ statements and append to them a _session.commit()_ statement, to save having to explicitly write out that statement multiple times. I’m still not sure I’m fully converted to the ways of the decorator – they do seem awfully unintuitive, and are probably misused in situations (like this one) where a simpler and cleaner solution might have been more appropriate – but clearly somebody thinks they are a good idea, so I’d better get used to them!

**Part 3 – Fixing a leak**

Getting to grips with _SQLAlchemy_ sessions was a bit of a nightmare. I wanted to avoid using _Flask-SQLAlchemy_ (“an extension for _Flask_ that adds support for _SQLAlchemy_ to your application”), primarily because I already felt I was operating at a sufficient level of abstraction, and didn’t want to learn a new API if it was not strictly necessary. But there is a price to avoiding _Flask-SQLAlchemy_, and that price is having to handle sessions yourself. And, as I didn’t have much of an idea of what sessions actually _were_, this proved somewhat painful.

Because I wasn’t handling sessions properly in my initial _SQLAlchemy_ code, I ended up leaking database connections. This meant that after several web requests had been processed by the app, it would just stop working completely, and the error “_psql: FATAL: too many connections for role ‘xyz’_” would present itself in the logs.

My eventual solution involved the use of built-in decorators provided by _Flask_ – specifically, _@app.before\_request_ and _@app.teardown\_request_. When you decorate a function with one of these decorators, you are basically instructing the _Flask_ app to execute the code inside the function at a specific point in the web request lifecycle – either before the request, or after the request. By creating a global _database_ variable in the _@app.before\_request_ function, passing this variable around the application, and then disposing of the _database_’s _Engine_ property in _@app.teardown\_request_ with _database.engine.dispose()_, I was able to prevent connection leakage. The nifty thing about _@app.teardown\_request_ is that it executes the decorated code regardless of whether or not an exception was raised during the handling of the request. And with that, the transition to _SQLAlchemy_ had been successful!
