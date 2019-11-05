const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');
const _ = require('lodash');
const say = require('say');

const pjson = require('./package.json');
const menu = require('./modules/menu');


inquirer.registerPrompt('emoji', require('inquirer-emoji'))

clear();

console.log(
    chalk.yellow(
        figlet.textSync("eePC", { horizontalLayout: 'full' })
    ),
    chalk.white(
        `\n${pjson.description}`,
        `\nv${pjson.version}`,
        `\nAuthor: ${pjson.author}`,
    )
)

let inquiry = (choice) => {
    let answer = _.isNil(choice) ? _.sample(_.keysIn(menu.structure)) : choice
    say.speak(`Let's play ${answer}`, null, null, () => {
        let questionType = menu.structure[answer].type;
        let randomNumber = _.sample(menu.structure[answer].opcs);
        let instructions = `Type on the keyboard the ${questionType} ${randomNumber}`;
        clear();

        console.log(
            chalk.white(
                figlet.textSync(_.toUpper(randomNumber))
            )
        );
        say.speak(instructions, null, null, () => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'typed',
                    message: `Your guess:`
                }
            ])
                .then(answer => answer.typed)
                .then(typed => {
                    let result = {
                        state: _.isEqual(_.toString(typed), _.toString(randomNumber)),
                        text: _.isEqual(_.toString(typed), _.toString(randomNumber)) ? 'correct' : 'incorrect'
                    }
                    let response = `You typed ${typed}, which is ${result.text}`
                    console.log(
                        chalk.yellow(
                            figlet.textSync(_.toUpper(typed))
                        ),
                        chalk.white(
                            figlet.textSync('is')
                        ),
                        result.state ? chalk.green(
                            figlet.textSync(result.text)
                        ) : chalk.red(
                            figlet.textSync(result.text)
                        ),
                    )
                    say.speak(response, null, null, () => {
                        inquiry()
                    })
                })
        })
    })
}

// let menus = () => {
//     return inquirer.prompt([
//         {
//             type: 'list',
//             name: 'choice',
//             message: 'What do you want?',
//             choices: _.keysIn(menu.structure)
//         },
//     ]).then(answers => {
        
//     })
// }



inquiry()