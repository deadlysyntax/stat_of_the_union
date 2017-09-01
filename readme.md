# Stat of the Union
### /r/rugbyunion statistics bot
StatOfTheUnion is a reddit bot aimed at the /r/rugbyunion community to provide informative bots that respond to specific commands within a comment.

### Bot Management Framwework
Behind StatOfTheUnion is an es6 javascript-based framework that makes it relatively easy to create and run multiple bots that respond to many different types of commands.

The framework provides a plugin system so that each bot is defined in a single file and the framewor provides common functionality to all bots that are plugged in to the system. including scraping tools and common utilities.

## Installation
You will need Nodejs stored on your local computer.

To install the library from the terminal using git:
`git clone git@github.com:deadlysyntax/stat_of_the_union.git`

Move into the new directory:
`cd stat_of_the_union`

Then install the dependencies:
`npm install`

Make a copy of configuration file example to link up with your own app account:
`cp .env.example .env`

Add your own Reddit configuration to the right spots in the .env file

As you code run the compiler:
`npm run dev`

To start the engine and make the bots run:
`node index.js --sub=rugbyunion`

### BEWARE
