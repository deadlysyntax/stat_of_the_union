import * as lexicon from './libs/lexicon'
import plugins from './plugins/manifest'



// Import configuration
import dotenv from 'dotenv'
dotenv.config({ silent: process.env.NODE_ENV === 'production' })

// Parse any CLI arguments
import parseArgs from 'minimist'
const args = parseArgs(process.argv);


// These libraries are for reddit interaction
import Snoowrap   from 'snoowrap'
import Snoostorm  from 'snoostorm'
// Initilize reddit client
const client = new Snoostorm(
    new Snoowrap({
        userAgent:    'stat_of_the_union',
        clientId:     process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        username:     process.env.REDDIT_USER,
        password:     process.env.REDDIT_PASS
    })
)


// Create a Snoostorm CommentStream with the specified options
let sub = args.sub || 'testingground4bots'

const commentStream = client.CommentStream({
    subreddit: sub,
    results:   25
});




// On comment, perform whatever logic you want to do
commentStream.on('comment', (comment) => {
    // Process the commands
    // Returns a data structure if trigger is detected otherwise null
    let lexicalData = lexicon.detectTrigger(comment)
    // Get outta here if the things went wrong
    if( lexicalData === null )
        return
    // See if module was set up correctly
    if( typeof lexicalData.meta.subWhitelist === 'undefined' ){
        console.error('Sub whitelist hasn\'t been set up properly in module')
        return
    }
    // Check if this sub is in the whitelist for the plugin,
    // plugins have to specify which subs they work in
    if( lexicalData.meta.subWhitelist.indexOf(sub) < 0 ){
        console.log('Command can\'t be run in this sub', sub, lexicalData )
        return
    }
    // This looks to the handler in libs/handler and if the method is returned from that module
    // it will be called
    if( typeof plugins.provider[lexicalData.meta.type].handler === 'function' ){
        plugins.provider[lexicalData.meta.type].handler(lexicalData, comment)
    }
});
