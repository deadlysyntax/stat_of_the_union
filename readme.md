# Stat of the Union
### /r/rugbyunion statistics bot
StatOfTheUnion is a reddit bot aimed at the /r/rugbyunion community to provide informative bots that respond to specific commands within a comment.

#### Player Stats
Add this line to your comment:

`
!playerstats Jonah Lomu New Zealand
`

And stat_of_the_union will comment below your summoning comment with a list of stats for Jonah Lomu's matches with the All Blacks.

You can get stats for any team that person was a part of:

`
!playerstats Beauden Barrett Hurricanes
`
The first two words after `!playerstats` must be the first and last names of the player. Followed by the name of the team. It's pretty unforgiving at the moment, but I'm working on making it so that slight mistakes still get you the right results.


# Bot Management Framwework
Behind stat_of_the_union is an es6 nodejs-based framework that makes it relatively easy to create and run multiple bots that respond to many different types of commands. In creating stat_of_the_union I decided to abstract all common bot-building functionality into a system where bots could easily be 'plugged-in' without have to rewrite a lot of the boilerplate bot code.

The framework provides a plugin system so that each bot is defined in a single file and the framework provides common functionality to all bots that are plugged in to the system, including inbuilt functionality for scraping and common utilities such as formatting data into reddit tables which all bot plugins have common access to.

### Would you like to contribute?
If you're interested in contributing to these /r/rugbyunion bots, private message https://www.reddit.com/user/stat_of_the_union. I can guide you through everything and build up the documentation as I go. Contributions can be made via pull-requests, all deployments need to be done at the central server.

If you're interested in building your own bots and using or contributing to the development of this framework, private message https://www.reddit.com/user/stat_of_the_union explaining you'd like to tinker yourself. I'll help get you started and we can discuss the direction of the framework. Or feel free to fork. It would be cool to collaborate though.

IMPORTANT NOTICE: If you would like to build your own bots using this framework, you can use the example plugins in the plugins/modules folder as reference only, these bots are currently under development and actively in use. In this case THEY ARE REFERENCE ONLY and should never be deployed in the /r/rugbyunion sub, you'll likely be banned, or just fuck people off, which is a waste of your precious time.

## Installation
You will need Nodejs stored on your local computer.

To install the library from the terminal using git:

`
git clone git@github.com:deadlysyntax/stat_of_the_union.git
`

Move into the new directory:

`
cd stat_of_the_union
`

Then install the dependencies:

`
npm install
`

Make a copy of configuration file example to link up with your own app account:

`
cp .env.example .env
`

Add your own Reddit configuration to the right spots in the .env file

As you code run the compiler:

`
npm run dev
`

To start the engine and make the bots run:

`
node index.js --sub=rugbyunion
`
