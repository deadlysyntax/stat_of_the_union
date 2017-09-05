import * as lexicon from '../dist/libs/lexicon'
import chai from 'chai'

describe('Lexicon', () => {

  describe('detectTrigger', () => {





    it('should fail because of a missing comma', () => {

        let response = lexicon.detectTrigger({
            body: "!playerstats Jonah Lomu New Zealand"
        })
        chai.assert.isNull(response)
    })





    it('should seperate variables by comma', () => {

        let response = lexicon.detectTrigger({
            body: "!playerstats Jonah Lomu , New Zealand"
        })

        chai.assert.deepEqual(
        {
            'name':  "Jonah Lomu",
            'team':  "New Zealand"
        },
            response.data
        )
    })





    it('should ignore all other words in comment', () => {

        let response = lexicon.detectTrigger({
            body: "first I was afraid, I was pertified \n !playerstats Jonah Lomu, New Zealand \n hey now hey now"
        })

        chai.assert.deepEqual(
        {
            'name':  "Jonah Lomu",
            'team':  "New Zealand"
        },
            response.data
        )
    })






    it('shouldnt find a non-invoking string', () => {

        let response = lexicon.detectTrigger({
            body: "!nothing Jonah Lomu New Zealand"
        })

        chai.assert.isNull(response)
    })




  })

})
