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
        type: 'competition',
        subs: ['testingground4bots', 'rugbyunion'],
        data: {
            year: commandParts[1],
            competition: commandParts.slice(2)
        }
    }
}
