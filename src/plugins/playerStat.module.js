export function handler(command, comment){
    console.log('Handling player stat request', command)
    comment.reply(`Retrieving stats for ${command.data.firstName} ${command.data.lastName} for ${command.data.year} ${command.data.competition.join(' ')}`)
    return null
}



export function trigger(comment){
    return  comment.body.indexOf('!playerstats') > -1
}



export function command(comment){
    // Cut the comment up into modifiers
    let commandParts = comment.body.split(/\s+/g)
    return {
        type:      'player',
        subs:      ['testingground4bots', 'rugbyunion'],
        data:      {
            'firstName':   commandParts[1],
            'lastName':    commandParts[2],
            'year':        commandParts[3],
            'competition': commandParts.slice(4)
        }
    }
}
