import request from 'request'
import cheerio from 'cheerio'

const baseURL = 'https://rugby.statbunker.com'


export function get(playerID) {
    // Process the url based on commands
    let url = `${baseURL}/players/getPlayerStats?player_id=${playerID}`;

    return new Promise((resolve, reject) => {
        // Request the page for scraping
        return request(url, (error, response, html) => {
           // Do nothing if there was an issue
           if( error )
                reject(error)
            // This should return an array of urls of links found on the search page
            // Builds aan array
            let $       = cheerio.load(html)
            //
            let teams = []
            // Build the data structure
            $('.breadcrumb').find('li')
                .map( ( row, rowObject ) => {
                    teams.push($(rowObject).find('a').attr('id').toLowerCase().replace('_', ' '))
                })
            //
            let results = teams.map( team => {
                    return {
                        type: team,
                        data: convertTableHtmlToArray( $, `table.${team}` )
                    }
                })
            // Done
            resolve(results)
        });
    });
}




// expects a cherrio object
export function convertTableHtmlToArray($, tableClass) {
    let data    = []
    //
    $(tableClass).find('tr').map( ( row, rowObject ) => {
        // There's two columns in each data row
        let columnOne = $(rowObject).find('th').first()
        let dataOne   = columnOne.next()
        let columnTwo = dataOne.next()
        let dataTwo   = columnTwo.next()
        //
        if( columnOne === 'undefined' || columnOne.text() == '')
            return
        // Add the fields
        data.push({
            key:   columnOne.text(),
            value: dataOne.text()
        })
        //
        if( columnTwo === 'undefined' || columnTwo.text() == '')
            return
        //
        data.push({
            key:  columnTwo.text(),
            value: dataTwo.text()
        })
    })
    return data
}
