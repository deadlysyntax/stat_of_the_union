import * as competitionTable from './statbunker/competitionTable'
import * as searcher         from './statbunker/search'
import * as playerStats      from './statbunker/playerStats'

// Returns an interface of all the scrapers we have set up
export default {
    statbunker: {
        doSearch:            searcher.doSearch,
        getCompetitionTable: competitionTable.get,
        getPlayerStats:      playerStats.get
    }
}
