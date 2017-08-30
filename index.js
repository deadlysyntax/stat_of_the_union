'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _snoowrap = require('snoowrap');

var _snoowrap2 = _interopRequireDefault(_snoowrap);

var _snoostorm = require('snoostorm');

var _snoostorm2 = _interopRequireDefault(_snoostorm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ silent: process.env.NODE_ENV === 'production' });

// These libraries are for reddit interaction


// Import configuration

// Initilize client
var client = new _snoostorm2.default(new _snoowrap2.default({
    userAgent: 'reddit-bot-example-node',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
}));

// Create a Snoostorm CommentStream with the specified options
var commentStream = client.CommentStream({
    subreddit: 'testingground4bots',
    results: 25
});

// On comment, perform whatever logic you want to do
commentStream.on('comment', function (comment) {

    // Process the commands
    //if(comment.body === 'boomfah') {
    //    comment.reply('bommfah found');
    //}


    // Process the url based on commands
    var url = 'https://rugby.statbunker.com/competitions/LeagueTable?comp_id=528';

    // Request the page for scraping
    (0, _request2.default)(url, function (error, response, html) {
        // Do nothing if there was an issue
        if (error) return;

        // Builds a json representation of a csv format file
        // headers are always in row 0
        // the rest of the rows come after
        // Create our traversable dom object
        var $ = _cheerio2.default.load(html);
        // Process html from url based on command
        var data = [[]]; // Initial with empty array as our first element to store our headers
        // Extract the data from the table
        var table = $('table.table');
        // Get the table description
        var caption = table.find('caption').first().find('h1').text();
        // Get stat table headers
        table.find('thead').find('tr').find('th').map(function (row, el) {
            var column = $(el);
            // Put column into our data structure
            data[0].push({
                title: column.attr('title'),
                label: column.text()
            });
        });
        // Get stat column rows
        table.find('tbody').find('tr').map(function (row, rowObject) {
            var rowData = [];
            // find columns
            $(rowObject).find('td').map(function (col, el) {
                rowData.push({
                    data: $(el).text()
                });
            });
            data.push(rowData);
        });

        // Convert the table data into reddit markdown
        // See tables here https://www.reddit.com/wiki/commenting
        var commentString = '### ' + caption + '\n';
        var dividerString = '';
        // Start with the header row ( row 0 is always header row )
        data[0].map(function (row, index) {
            var label = row.label === '#' ? 'Rank' : row.label;
            // The title row
            commentString += label + (index < data[0].length - 1 ? ' | ' : '\n');
            // The dividing row
            dividerString += '-' //label.split('').map(() => { return '-' }).join('') // We need the same number of hyphens as characters in the header
            + (index < data[0].length - 1 ? '|' : '\n');
        });
        // Need to combine the header row string and the dividing string before we add the data rows
        commentString += dividerString;
        // Now do the data rows
        // Start by hiding the header row
        var dataRows = data.filter(function (row, index) {
            return index > 0;
        });
        dataRows.map(function (row, index) {
            var rowString = '';
            // Each column
            row.map(function (column, key) {
                rowString += column.data + (key < row.length - 1 ? '|' : '\n');
            });
            // Add the row to the comment
            commentString += rowString;
        });

        if (comment.body === 'rc') {
            comment.reply(commentString);
            console.log('commented');
        }

        //console.log(commentString)
    });
});
