// Including modules.
const fs = require('fs');



let graphQuestions, transportLineQuestions, data;




// graph qeustions 

graphQuestions = [
    {
        name: 'id',
        type: 'input',
        message: 'enter the Node\'s id',
        // TODO: validation
    },
    {
        name: 'name',
        type: 'input',
        message: 'enter node name',
        // TODO: validation
    },
    {
        name: 'type',
        type: 'list',
        message: 'chose node type',
        choices: ['other', 'city', 'station', 'route'],
        default: 'other'
    },
    {
        name: 'otherType',
        type: 'input',
        message: 'enter name',
        // TODO: validation
        when: function(answers) {
            return answers.type === 'other';
        }
    },
    {
        name: 'adjacents',
        type: 'input',
        message: 'enter adjacents IDs separated by a space'
        // TODO: validation
    }
];


// transport line qeustions 

transportLineQuestions = [];


module.exports = {graphQuestions, transportLineQuestions}