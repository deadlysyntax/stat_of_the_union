import * as utilities from '../libs/utilities'

// Import our plugin modules
import * as playerStat      from  '../plugins/playerStat.module'
import * as teamStat        from  '../plugins/teamStat.module'
import * as competitionStat from  '../plugins/competitionStat.module'
import * as gameVideo       from  '../plugins/gameVideo.module'

// Register handlers here
// Handlers are set in the handlers folder - one for each module
// A module is kindof like a plugin for stat_of_the_union - it can be used to add
// additional bot handlers to the framework


// Here is where you register a plugin
const plugins = [
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
]

export default utilities.preparePlugins(plugins)
