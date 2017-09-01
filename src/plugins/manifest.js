import * as utilities from '../libs/utilities'


// Import our plugin modules
import * as playerStat      from  './modules/playerStat.module'
import * as teamStat        from  './modules/teamStat.module'
import * as competitionStat from  './modules/competitionStat.module'
import * as gameVideo       from  './modules/gameVideo.module'


// Register handlers here
// Handlers are set in the handlers folder - one for each module
// A module is kindof like a plugin for stat_of_the_union - it can be used to add
// additional bot handlers to the framework
export default utilities.preparePlugins([
    {
        name:     'playerStat',
        provider: playerStat,
    },
    {
        name:     'teamStat',
        provider: teamStat
    },
    {
        name:     'competitionStat',
        provider: competitionStat
    },
    {
        name:     'gameVideo',
        provider: gameVideo
    }
])
