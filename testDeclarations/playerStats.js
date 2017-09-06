import { Observable } from 'rxjs/Observable';
import * as lexicon from '../dist/libs/lexicon'
import { handler } from '../dist/plugins/modules/playerStat.module'


import chai from 'chai'

describe('Lexicon', () => {

  describe('detectTrigger', () => {





    it('should fail because of a missing comma', () => {

        let response = lexicon.detectTrigger({
            body: "!playerstats Jonah Lomu New Zealand"
        })
        chai.assert.isNull(response)
    })




    it('should handle single word teams', () => {

        let response = lexicon.detectTrigger({
            body: "!playerstats Simon Shaw, England"
        })
        chai.assert.deepEqual(
        {
            'name':  "Simon Shaw",
            'team':  "England"
        },
            response.data
        )
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




    it('should fail if command isnt on one line', () => {

        let response = lexicon.detectTrigger({
            body: "first I was afraid, I was pertified \n !playerstats Jonah Lomu, New Zealand hey now hey now"
        })

        chai.assert.deepEqual(
        {
            'name':  "Jonah Lomu",
            'team':  "New Zealand hey now hey now"
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


    it('should return an observable', () => {

        let command = lexicon.detectTrigger({
            body: "!playerstats Dan Carter, New Zealand"
        })

        handler(command, {
            body: "!playerstats Dan Carter, New Zealand"
        }).subscribe( result => {
            console.log(result);
            //chai.assert.
        })
        
    })



  })

})
