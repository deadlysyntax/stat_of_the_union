export function detectTrigger(comment){
    // Check for player stats trigger
    if( comment.body.indexOf('!playerstats') > -1 ) {
        // Cut the comment up into modifiers
        let commandParts = comment.body.split(/\s+/g)
        console.log('Request for player stats discovered', comment.body, commandParts)
        //
        return {
            type:        'player',
            data:        {
                'firstName':   commandParts[1],
                'lastName':    commandParts[2],
                'year':        commandParts[3],
                'competition': commandParts.slice(4)
            }
        }
    }



    // Check for team stats trigger
    if( comment.body.indexOf('!teamstats') > -1 ) {
        console.log('Request for team stats discovered', comment.body);
        let commandParts = comment.body.split(/\s+/g)
        console.log(commandParts);
    }

    // Check for competition stat trigger
    if( comment.body.indexOf('!compstats') > -1 ) {
        console.log('Request for competition stats discovered', comment.body);
        let commandParts = comment.body.split(/\s+/g)
        console.log(commandParts);
    }

    return null;
}
