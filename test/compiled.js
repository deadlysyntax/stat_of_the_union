'use strict';

var _Observable = require('rxjs/Observable');

var _lexicon = require('../dist/libs/lexicon');

var lexicon = _interopRequireWildcard(_lexicon);

var _playerStat = require('../dist/plugins/modules/playerStat.module');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Lexicon', function () {

    describe('detectTrigger', function () {

        it('should fail because of a missing comma', function () {

            var response = lexicon.detectTrigger({
                body: "!playerstats Jonah Lomu New Zealand"
            });
            _chai2.default.assert.isNull(response);
        });

        it('should handle single word teams', function () {

            var response = lexicon.detectTrigger({
                body: "!playerstats Simon Shaw, England"
            });
            _chai2.default.assert.deepEqual({
                'name': "Simon Shaw",
                'team': "England"
            }, response.data);
        });

        it('should seperate variables by comma', function () {

            var response = lexicon.detectTrigger({
                body: "!playerstats Jonah Lomu , New Zealand"
            });

            _chai2.default.assert.deepEqual({
                'name': "Jonah Lomu",
                'team': "New Zealand"
            }, response.data);
        });

        it('should ignore all other words in comment', function () {

            var response = lexicon.detectTrigger({
                body: "first I was afraid, I was pertified \n !playerstats Jonah Lomu, New Zealand \n hey now hey now"
            });

            _chai2.default.assert.deepEqual({
                'name': "Jonah Lomu",
                'team': "New Zealand"
            }, response.data);
        });

        it('should fail if command isnt on one line', function () {

            var response = lexicon.detectTrigger({
                body: "first I was afraid, I was pertified \n !playerstats Jonah Lomu, New Zealand hey now hey now"
            });

            _chai2.default.assert.deepEqual({
                'name': "Jonah Lomu",
                'team': "New Zealand hey now hey now"
            }, response.data);
        });

        it('shouldnt find a non-invoking string', function () {

            var response = lexicon.detectTrigger({
                body: "!nothing Jonah Lomu New Zealand"
            });

            _chai2.default.assert.isNull(response);
        });

        it('should return an observable', function () {

            var command = lexicon.detectTrigger({
                body: "!playerstats Dan Carter, New Zealand"
            });

            (0, _playerStat.handler)(command, {
                body: "!playerstats Dan Carter, New Zealand"
            }).subscribe(function (result) {
                console.log(result);
                //chai.assert.
            });
        });
    });
});
