export function detectTrigger(comment){



    // Check for player stats trigger
    if( comment.body.indexOf('!playerstats') > -1 ) {
        // Cut the comment up into modifiers
        let commandParts = comment.body.split(/\s+/g)
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
        let commandParts = comment.body.split(/\s+/g)
        return {
            type: 'team',
            data: {
                year: commandParts[1],
                team: commandParts.slice(2)
            }
        }

    }




    // Check for competition stat trigger
    if( comment.body.indexOf('!compstats') > -1 ) {
        let commandParts = comment.body.split(/\s+/g)
        return {
            type: 'competition',
            data: {
                year: commandParts[1]
                competition: commandParts.slice(2)
            }
        }
    }

    return null;
}
