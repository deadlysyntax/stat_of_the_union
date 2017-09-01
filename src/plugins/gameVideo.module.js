export const meta = {
    type:           'gameVideo',
    subWhitelist:   ['testingground4bots', 'rugbyunion']
}



export function handler(command, comment){
    console.log('Handling game mention', command)
    //getCompetitionTable((compiledReply) => {
    //    comment.reply(compiledReply)
    //    console.log('commented');
    //})
}





export function command(comment){
    // Cut the comment up into modifiers
    let commandParts = comment.body.split(/\s+/g)

    // Only respond until the end of the line
    //let lineStrip = commandParts.filter((item) => {
    //    item.indexOf('\n') > -1
    //})

    //console.log(lineStrip);

    return {
        meta,
        data:     {
            parts: commandParts
        }
    }
}





export function trigger(comment){
    return comment.body.indexOf('!gameVideo') > -1
}
