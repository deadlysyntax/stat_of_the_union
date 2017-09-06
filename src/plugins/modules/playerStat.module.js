import { Observable } from 'rxjs/Observable';

import * as utilities from '../../libs/utilities'
import scrapers from '../../scrapers/manifest'

// Basic module information
export const meta = {
    type:          'playerStat',
    subWhitelist:  ['testingground4bots', 'rugbyunion'],
    commandString: "!playerstats"
}

// Used to determine if this module has been summond by the reddit comment
export function trigger(comment){
    return  comment.body.indexOf(meta.commandString) > -1
}

// Breaks the comment down into all the data the handler will need to do it's job
export function command(comment){

    let vars = utilities.processCommandIntoVariablesByComma(comment, meta.commandString)

    if( vars === null )
        return null

    return {
        meta,
        data: {
            name: vars[0],
            team: vars[1]
        }
    }

}





// The action taken if the module is triggered
export function handler(command, comment){


    return Observable.create( observer => {

        //console.log('Handling player stat request', command)
        scrapers.statbunker.doSearch(`${command.data.name}`).then( results => {
            // Dont need to do anything else
            if( results.length === 0 ){
                observer.next({
                    message: `No results from search for ${command.data.name}. Please check spelling or [read here](https://github.com/deadlysyntax/stat_of_the_union) for more info`
                })
            }
            // Try to find the player and get their id
            let result      = results[0]
            let playerID    = result.split('player_id=')[1]
            //
            scrapers.statbunker.getPlayerStats(playerID).then( response => {
                //
                let tableString = ''
                let stats       = response.filter(team => {
                    return team.type === command.data.team.toLowerCase()
                })
                // Check for data and convert if so
                if( typeof stats[0] !== 'undefined' ){
                    tableString  = utilities.convertListDataToMarkdownTable(stats[0].data, `${utilities.capitalize(command.data.name)} | ${utilities.capitalize(stats[0].type) }`) // use to lowercase to normalize
                } else {
                    observer.next({
                        message: `Unable to find stats for ${utilities.capitalize(command.data.name)} at this team unfortunately, please check spelling or [read here](https://github.com/deadlysyntax/stat_of_the_union) for more info`
                    })
                }
                // Success
                if( tableString !== null && tableString !== '' ){
                    observer.next({
                        message: tableString+ '\n ****** \n Please PM me with ideas, feedback, bot suggestions, qualms or just a bloody good story.'
                    })
                } else {
                    observer.next({
                        message: 'Unable to find any stats unfortunately, please check spelling or [read here](https://github.com/deadlysyntax/stat_of_the_union) for more info'
                    })
                }

            }).catch((error) => {
                observer.next({
                    message: 'Unable to find any stats unfortunately, this is my problem and I\'ve told my human to sort it out.'
                })
            })
        }).catch((error) => {
            observer.next({
                message: 'Unable to find any stats unfortunately, this is my problem and I\'ve told my human to sort it out.'
            })
        })
    })

}
