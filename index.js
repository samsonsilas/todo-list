#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
const toDoList = [];
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    let title = await chalkAnimation.rainbow(`|||     Manage Your Tasks Here    |||`);
    await sleep();
    title.stop();
}
await welcome();
async function questions() {
    const userTask = await inquirer.prompt([
        {
            type: 'string',
            name: 'task',
            message: 'Enter Your Task',
        }
    ]);
    const { task } = userTask;
    if (task) {
        toDoList.push(task);
    }
    else {
        console.log(chalk.red('you Entered Nothing'));
    }
}
function showToDoList() {
    toDoList.map((item) => {
        console.log(chalk.red(item));
    });
}
async function again() {
    do {
        await questions();
        var restart = await inquirer
            .prompt({
            "type": "input",
            "name": "isRepeat",
            "message": chalk.gray(`Do you want to add  more task?  [Y/N] : `)
        });
    } while (restart.isRepeat === "Y" || restart.isRepeat === "y" || restart.isRepeat === "yes" || restart.isRepeat === "YES");
    showToDoList();
}
again();
