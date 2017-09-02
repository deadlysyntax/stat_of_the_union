# Stat of the Union
### /r/rugbyunion statistics bot
stat_of_the_union is a reddit bot aimed at the /r/rugbyunion community to provide informative bots that respond to specific commands within a comment.

#### Player Stats
Add this line to your reddit comment:

```
!playerstats Jonah Lomu New Zealand
```

And stat_of_the_union will comment below your summoning comment with a list of stats for Jonah Lomu's matches with the All Blacks.

You can get stats for any team that person was a part of:

```
!playerstats Beauden Barrett Hurricanes
```
The first two words after `!playerstats` must be the first and last names of the player. Followed by the name of the team. It's pretty unforgiving at the moment, but I'm working on making it so that slight mistakes still get you the right results.


# Bot Management Framwework
Behind stat_of_the_union is an es6 nodejs-based framework that makes it relatively easy to create and run multiple bots that respond to many different types of commands. In creating stat_of_the_union I decided to abstract all common bot-building functionality into a system where bots could easily be 'plugged-in' without have to rewrite a lot of the boilerplate bot code.

The framework provides a plugin system so that each bot is defined in a single file and the framework provides common functionality to all bots that are plugged in to the system, including inbuilt functionality for scraping and common utilities such as formatting data into reddit tables which all bot plugins have common access to.

### Would you like to contribute?
If you're interested in contributing to these /r/rugbyunion bots, private message https://www.reddit.com/user/stat_of_the_union. I can guide you through everything and build up the documentation as I go. Contributions can be made via pull-requests, but all deployments need to be done by me at the central server.

If you're interested in building your own bots and using or contributing to the development of this framework, private message https://www.reddit.com/user/stat_of_the_union explaining you'd like to tinker yourself. I'll help get you started and we can discuss the direction of the framework. Or feel free to fork. It would be cool to collaborate though.

IMPORTANT NOTICE: If you would like to build your own bots using this framework, you can use the example plugins in the plugins/modules folder as reference only, these bots are currently under development and actively in use. In this case THEY ARE REFERENCE ONLY and should never be deployed in the /r/rugbyunion sub, you'll likely be banned, or just fuck people off, which is a waste of your precious time.

## Installation
You will need Nodejs stored on your local computer.

To install the library from the terminal using git:

```
git clone git@github.com:deadlysyntax/stat_of_the_union.git
```

Move into the new directory:

```
cd stat_of_the_union
```

Then install the dependencies:

```
npm install
```

Make a copy of configuration file example to link up with your own app account:

```
cp .env.example .env
```

Add your own Reddit configuration to the right spots in the .env file

As you code run the compiler:

```
npm run dev
```

To start the engine and make the bots run:

```
node index.js --sub=rugbyunion
```

Note that you can pass the sub as an argument to the CLI when you start running the bot. You can have multiple bots and set them to work in a particular sub. To deploy in multiple subs you need to run this script in multiple shells - one for each sub.

## Creating bots
The lifecycle of a bot goes like this:
* You start the bot as described above
* The bot listens to all the comments posted to the specified sub
* Our bot checks every comment for the particular text that should trigger a response.
* If the trigger text is found, a response is created and posted in reply to the comment that summoned it.

So there a several things here that our bot plugins need to specify.

* What string of text constitutes a summons - such as **!playerstats**
* What other data in the comment does our bot need to extract in order to formulate a response - such as **Richard Buckman** and **Highlanders**. These are the variables we need to take and pass to our response builder
* Handle the formulation of a response - this might require scraping or accessing of external data and processing it into a response string.

With this framework everything else is handled, the plugin only needs to specify these three things.

### Creating plugins
Plugins are created and plugged in by these two steps:

* Adding a new file to the /src/plugins/modules directory - one module file for each bot. These should have the .module.js extension. The file needs to contain a few methods and some metadata which will be explained below.
* Registering the plugin by importing it into and adding some meta data to the /src/plugins/manifest file. This lets the system know that we have a bot available.

A bot plugin is made by declaring a simple metadata object and three methods that must be exported from the module file:

#### Metadata
```
// Basic module information
export const meta = {
    type:         'playerStat',
    subWhitelist: ['testingground4bots', 'rugbyunion']
}
```

The type is just a unique name for the plugin in camelcase. It should be reflected in the name of the file. So this plugin file should be name `playerStat.module.js` and the type field of the metadata would therefore be **playerStat**.

The **subWhitelist** property is an array listing the subs that this bot is allowed to operate in.

#### A Trigger
This is the text the bot will look out for in all the comments posted to the sub, in order to trigger a response.

So in the plugin file we export a method called 'trigger':

```
// Used to determine if this module has been summond by a reddit comment
export function trigger(comment){
    return  comment.body.indexOf('!playerstats') > -1
}
```
This would search every comment for the string `!playerstats` and if it finds one it triggers the response.

#### A Command
This method is used to extract any additional data we need from the comment in order to formulate a response.

```
export function command(comment){
    // Cut the comment up into modifiers
    let commandParts = comment.body.split(/\s+/g)
    return {
        meta,
        data:      {
            'firstName':   commandParts[1],
            'lastName':    commandParts[2],
            'team':        commandParts.slice(3)
        }
    }
}
```
This very basic example will just look for certain variables to be in certain places after the trigger. Note: This simple example would fail if there was more text in the comment. Fortunately you can add any processing logic you like in this function as long as the return object follows the correct data-structure.

If the comment was `!playerstats Ngani Laumape Hurricance`, this function would set firstName and lastName assuming they were the two words following the trigger, it then assumes the rest of the words in the string make up the team name.

This function must return the data structure
```
{
    meta,
    data:      {
        // The variables needed to formulate a response
    }
}
```
The `data` is a passed into the bot handler.

#### A Handler
This method is responsible for formulating and posting a response (or doing anything you like actually).

````
export function handler(command, comment){

    // You can do whatever you want in here using the variables passed in fromt the command.
    // Such as...

    let replyString = ''

    // Find player info by accessing an api or using a scraper library

    // Convert the data into a reddit table using our utility functions

    comment.reply(replyString)
    return
}
````

In your plugin files you can import whatever functionality you need. Create you own or use our pre-built ones:

```
import * as utilities from '../../libs/utilities'
import scrapers from '../../scrapers/manifest'
````

* The utilities library provides our common helper functions.
* The scapers gives us access to all the web scrapers you have registered in /src/scrapers/

### Scrapers
Scraper files can be created and added to /src/scrapers/{domain} this is a place to store individual scraper functions under a particular web domain.

All scrapers must be registered in `/src/scrapers/mainfest.js`. They are then available to all bot plugins that import the scrapers manifest. as mentioned above.

```
import request from 'request'
import cheerio from 'cheerio'

const baseURL = 'https://dataSource.com'


export function doSearch(term) {
    // Process the url based on commands
    let url = `${baseURL}/search?search=${encodeURIComponent(term)}`;

    return new Promise((resolve, reject) => {
        // Request the page for scraping
        return request(url, (error, response, html) => {
           // Do nothing if there was an issue
           if( error )
                reject(error)
            // This should return an array of urls of links found on the search page
            let results = []
            // Builds an array of the search results
            let $       = cheerio.load(html)
            // Process results
             $('table.search').find('tbody').find('tr').map( ( row, rowObject ) => {
                // Build a fully formed url to add to the list.
                // The callback method will recieve these
                results.push( `${baseURL + $(rowObject).first('td').find('a').attr('href')}` )
            })
            resolve(results)
        });
    });
}
```

Each scraper file can export as many methods as it likes but for clarity, are generally placed into individual files under the same domain. Scrapers are expected to return a promise.

To register a scraper add it's info to the manifest file `/src/scrapers/manifest.js`

```
// Relative to the manifest file
import * as playerStats      from './statSource/playerStats'

// Returns an interface of all the scrapers we have set up
export default {
    statSource: {
        nameOfMethodAvaliableToPlugin:     playerStats.doSearch, // The value here is the actual method name exported from the scraper
    }
}

```
As noted, each web domain has it's own namespace, in this example I used the fictional `statSource`. On each domain you add a key which is the name by which this method will be accessed from the plugin's handler function. An example:

In `/src/plugins/modules/playerStat.module.js` handler() function.
```
scrapers.statSource.nameOfMethodAvaliableToPlugin( data ).then( response => {
    // the data returned from the scraper is available here
});
```

This data can then be used by our handler to in it's process of formulating a reply.
