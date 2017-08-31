export function playerStatHandler(command, comment){
    console.log('Handling player stat request', command)
    comment.reply(`Retrieving stats for ${command.data.firstName} ${command.data.lastName} for the year ${command.data.year} ${command.data.competition.join(' ')}`)
}



export function teamStatHandler(command, comment){
    console.log('Handling team stat request', command)
}




export function competitionStatHandler(command, comment){
    console.log('Handling competition stat request', command)
    //getCompetitionTable((compiledReply) => {
    //    comment.reply(compiledReply)
    //    console.log('commented');
    //})
}
