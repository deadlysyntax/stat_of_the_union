import request from 'request'
import cheerio from 'cheerio'

const baseURL = 'https://rugby.statbunker.com'


export function doSearch(term) {
    // Process the url based on commands
    let url = `${baseURL}/usual/search?search=${encodeURIComponent(term)}`;

    return new Promise((resolve, reject) => {
        // Request the page for scraping
        return request(url, (error, response, html) => {
           // Do nothing if there was an issue
           if( error )
                reject(error)
            // This should return an array of urls of links found on the search page
            let results = []
            // Builds aan array
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
