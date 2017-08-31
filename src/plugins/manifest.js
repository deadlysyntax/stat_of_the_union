import * as playerStat      from  '../plugins/playerStat.module'
import * as teamStat        from  '../plugins/teamStat.module'
import * as competitionStat from  '../plugins/competitionStat.module'
import * as gameVideo       from  '../plugins/gameVideo.module'

// Register handlers here
// Handlers are set in the handlers folder - one for each module
// A module is kindof like a plugin for stat_of_the_union - it can be used to add
// additional bot handlers to the framework

export default {
    list: [
        'playerStat',
        'teamStat',
        'competitionStat',
        'gameVideo'
    ],
    meta: {
        playerStat:      playerStat,
        teamStat:        teamStat,
        competitionStat: competitionStat,
        gameVideo:       gameVideo
    }
}
