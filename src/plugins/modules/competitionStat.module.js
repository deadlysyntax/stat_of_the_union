export const meta = {
    type:           'competitionStat',
    subWhitelist:   ['testingground4bots', 'rugbyunion']
}


export function handler(command, comment){
    console.log('Handling competition stat request', command)
    //getCompetitionTable((compiledReply) => {
    //    comment.reply(compiledReply)
    //    console.log('commented');
    //})
    return null
}


export function trigger(comment){
    return comment.body.indexOf('!compstats') > -1
}



export function command(comment){
    let commandParts = comment.body.split(/\s+/g)
    return {
        meta,
        data: {
            year: commandParts[1],
            competition: commandParts.slice(2)
        }
    }
}
