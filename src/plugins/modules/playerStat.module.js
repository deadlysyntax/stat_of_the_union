import * as utilities from '../../libs/utilities'
import scrapers from '../../scrapers/manifest'

// Basic module information
export const meta = {
    type:         'playerStat',
    subWhitelist: ['testingground4bots', 'rugbyunion']
}

// Used to determine if this module has been summond by the reddit comment
export function trigger(comment){
    return  comment.body.indexOf('!playerstats') > -1
}

// Breaks the comment down into all the data the handler will need to do it's job
export function command(comment){
    // Cut the comment up into modifiers
    let commandParts = comment.body.split(/\s+/g)
    // Find where our command starts
    let commandIndex = commandParts.indexOf('!playerstats')

    console.log(commandIndex, commandParts);

    return {
        meta,
        data:      {
            'firstName':   commandParts[commandIndex+1],
            'lastName':    commandParts[commandIndex+2],
            'team':        commandParts.slice(commandIndex+3)
        }
    }
}


// The action taken if the module is triggered
export function handler(command, comment){
    //console.log('Handling player stat request', command)
    scrapers.statbunker.doSearch(`${command.data.firstName} ${command.data.lastName}`).then( results => {
        // Dont need to do anything else
        if( results.length === 0 ){
            console.log(`No results from search for ${command.data.firstName} ${command.data.lastName}`)
            comment.reply(`No results from search for ${command.data.firstName} ${command.data.lastName}. Please check spelling or [read here](https://github.com/deadlysyntax/stat_of_the_union) for more info`)
            return
        }
        // Try to find the player and get their id
        let result      = results[0]
        let playerID    = result.split('player_id=')[1]
        //
        scrapers.statbunker.getPlayerStats(playerID).then( response => {
            //
            let tableString = ''
            //console.log(command.data.team.join(' ').toLowerCase(), response);
            let stats = response.filter(team => {
                return team.type === command.data.team.join(' ').toLowerCase()
            })
            if( typeof stats[0] !== 'undefined' ){
                tableString  = utilities.convertListDataToMarkdownTable(stats[0].data, `${utilities.capitalize(command.data.firstName+' '+command.data.lastName)} | ${utilities.capitalize(stats[0].type) }`) // use to lowercase to normalize
            } else {
                console.log('Team not found')
                comment.reply('Unable to find the team info unfortunately, please check spelling or [read here](https://github.com/deadlysyntax/stat_of_the_union) for more info')
                return
            }
            // Success
            if( tableString !== null && tableString !== '' ){
                console.log('commented')
                comment.reply(tableString+ '\n ****** \n Please PM me with ideas, feedback, bot suggestions, qualms or just a bloody good story.')
            } else {
                console.log('Stats Not found')
                comment.reply('Unable to find any stats unfortunately, please check spelling or [read here](https://github.com/deadlysyntax/stat_of_the_union) for more info')
            }

        }).catch((error) => {
            console.log(error);
        })
    }).catch((error) => {
        console.log(error);
    })


    //comment.reply(`Retrieving stats for ${command.data.firstName} ${command.data.lastName} for ${command.data.year} ${command.data.competition.join(' ')}`)
    return null
}
