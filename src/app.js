import { getCompetitionTable } from './scrapers/statbunker/competitionTable'

// Import configuration
import dotenv from 'dotenv'
dotenv.config({ silent: process.env.NODE_ENV === 'production' })


// These libraries are for reddit interaction
import Snoowrap   from 'snoowrap'
import Snoostorm  from 'snoostorm'
// Initilize client
const client = new Snoostorm(
    new Snoowrap({
        userAgent:    'reddit-bot-example-node',
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
    if(comment.body === 'rc') {
        getCompetitionTable((compiledReply) => {
            comment.reply(compiledReply)
            console.log('commented');
        })
    }



});
