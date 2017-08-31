import * as lexicon from './libs/lexicon'
import plugins from './plugins/manifest'



// Import configuration
import dotenv from 'dotenv'
dotenv.config({ silent: process.env.NODE_ENV === 'production' })




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
const commentStream = client.CommentStream({
    subreddit: 'testingground4bots',
    results:    25
});




// On comment, perform whatever logic you want to do
commentStream.on('comment', (comment) => {
    // Process the commands
    // Returns a data structure if trigger is detected otherwise null
    let lexicalData = lexicon.detectTrigger(comment)


    console.log(lexicalData);
    // Get outta here if the things went wrong
    if( lexicalData === null )
        return



    // This looks to the handler in libs/handler and if the method is returned from that module
    // it will be called
    //if( typeof plugins.meta[lexicalData.type].handler === 'function' ){
    //    plugins.meta[lexicalData.type].handler(lexicalData, comment)
    //}
});
