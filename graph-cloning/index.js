// Including modules.
const inquirer = require('inquirer');
const fs = require('fs');

// importing qeustions
let {graphQuestions, transportLineQuestions} = require('./questions');
let data = require('./graph.json');


// reading data
/*
fs.readFileSync('./graph.json', (err, dataChunk) => {
    if(err)
        data = [];
    else
        data = JSON.parse(dataChunk) || [];
});

console.log(data);


*/

// setting qeustions for the inguirer prompt session

let questions = [
    {
        name: 'opType',
        type: 'list',
        message: 'what you want to do next',
        choices: [
            {
                name: 'Graph filling',
                value: graphQuestions
            },
            {
                name: 'Transport lines filling',
                value: transportLineQuestions
            }
        ],
        default: graphQuestions
    }
];


let ask = () => {
    inquirer.prompt(questions).then( answers => {

        // chosing which questions to ask
        if(answers.opType) {
            questions = answers.opType;
            ask();
        }

        // processing input data
        


        // checking to ask again
        if(answers.askAgain)
            ask();
    });
};


// start the session
ask();

// write to file
console.log(data);
fs.writeFile('./graph.json', data, (err) => {
    if(err)
        throw err;
    
        console.log('file saved !!')
})