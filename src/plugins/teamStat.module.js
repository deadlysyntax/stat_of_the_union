export function handler(command, comment){
    console.log('Handling team stat request', command)
    //getCompetitionTable((compiledReply) => {
    //    comment.reply(compiledReply)
    //    console.log('commented');
    //})
    return null
}




export function trigger(comment){
    return comment.body.indexOf('!teamstats') > -1
}





export function command(comment){
    let commandParts = comment.body.split(/\s+/g)
    return {
        type:   'team',
        'subs': ['testingground4bots', 'rugbyunion'],
        data:   {
            year: commandParts[1],
            team: commandParts.slice(2)
        }
    }
}
