import request from 'request'
import cheerio from 'cheerio'

import { convertTabularDataToMarkdownTable } from '../../libs/utilities.js'


export function get(callback){
    // Process the url based on commands
    let url = 'https://rugby.statbunker.com/competitions/LeagueTable?comp_id=528';

   // Request the page for scraping
    return request(url, (error, response, html) => {
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

        return callback(convertTabularDataToMarkdownTable(data, caption))

    })
}
