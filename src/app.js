import request from 'request'
import cheerio from 'cheerio'

// Import configuration
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });


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
    //if(comment.body === 'boomfah') {
    //    comment.reply('bommfah found');
    //}


    // Process the url based on commands
    let url = 'https://rugby.statbunker.com/competitions/LeagueTable?comp_id=528';

   // Request the page for scraping
   request(url, (error, response, html) => {
       // Do nothing if there was an issue
       if( error )
            return


        // Builds a json representation of a csv format file
        // headers are always in row 0
        // the rest of the rows come after
        // Create our traversable dom object
        let $ = cheerio.load(html)
        // Process html from url based on command
        let data = [[]] // Initial with empty array as our first element to store our headers
        // Extract the data from the table
        let table = $('table.table')
        // Get the table description
        let caption = table.find('caption').first().find('h1').text()
        // Get stat table headers
        table.find('thead').find('tr').find('th').map((row, el) => {
            let column = $(el)
            // Put column into our data structure
            data[0].push({
                title: column.attr('title'),
                label: column.text()
            })
        })
        // Get stat column rows
        table.find('tbody').find('tr').map((row, rowObject) => {
            let rowData = []
            // find columns
            $(rowObject).find('td').map((col, el) => {
                rowData.push({
                    data: $(el).text()
                })
            })
            data.push(rowData)
        })




        // Convert the table data into reddit markdown
        // See tables here https://www.reddit.com/wiki/commenting
        let commentString = `### ${caption}\n`
        let dividerString = ''
        // Start with the header row ( row 0 is always header row )
        data[0].map( ( row, index ) => {
            let label = ( row.label === '#' ? 'Rank' : row.label )
            // The title row
            commentString +=  label + ( index < (data[0].length -1) ? ' | ' : '\n' )
            // The dividing row
            dividerString += '-' //label.split('').map(() => { return '-' }).join('') // We need the same number of hyphens as characters in the header
                + ( index < (data[0].length -1) ? '|' : '\n' )
        })
        // Need to combine the header row string and the dividing string before we add the data rows
        commentString += dividerString
        // Now do the data rows
        // Start by hiding the header row
        let dataRows = data.filter((row, index) => {
            return index > 0
        })
        dataRows.map( (row, index) => {
            let rowString = ''
            // Each column
            row.map( ( column, key ) => {
                rowString += column.data + ( key < (row.length -1) ? '|' : '\n' )
            })
            // Add the row to the comment
            commentString += rowString
        })



        if( comment.body === 'rc') {
            comment.reply(commentString);
            console.log('commented');
        }



        //console.log(commentString)
    })
});
