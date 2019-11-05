const _ = require('lodash');

exports.structure = {
    'Letters': {
        type: 'letter',
        opcs: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    },
    'Alphabet': {
        type: 'key',
        opcs: _.concat(_.range(1,10), 'abcdefghijklmnopqrstuvwxyz'.split('')),
    },
    'Numbers': {
        type: 'number',
        opcs: _.range(1,10),
    },
}