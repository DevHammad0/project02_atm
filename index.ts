#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import PasswordPrompt from "inquirer/lib/prompts/password.js";

interface ansType {
    userId: string;
    userPin: string;
    accountType: string;
    transactionType: string;
    amount: number
}

console.log(
    chalk.yellow(
        figlet.textSync('ATM', { horizontalLayout: 'full' })
    )
);

async function main() {
    const answers: ansType = await inquirer.prompt([
        {
            type: "input",
            name: "userId",
            message: chalk.cyan("Please enter your User ID: "),
            validate(input) {
                if (input == "") {
                    return "Enter valid ID";
                }
                return true;
            }
        },
        {
            type: "string",
            name: "userPin",
            message: chalk.cyan("Please enter your 4 character PIN: "),
            validate(input) {
                if (input.length !== 4) {
                    return "Pin should be 4 Character";
                }
                return true;
            }
        },

        {
            type: "list",
            name: "accountType",
            choices: ["Current", "Saving"],
            message: chalk.cyan("Please select your account type:"),

        },
        {
            type: "list",
            name: "transactionType",
            choices: ["Fast Cash", "Withdraw"],
            message: chalk.cyan("Please select your transaction type:"),
            when(answers) {
                return answers.accountType;
            },
        },
        {
            type: "list",
            name: "amount",
            choices: [1000, 2000, 5000, 10000, 20000],
            message: chalk.cyan("Please select your withdrawal amount (Fast Cash):"),
            when(answers) {
                return answers.transactionType == "Fast Cash"
            }
        },
        {
            type: "number",
            name: "amount",
            message: chalk.cyan("Please enter your withdrawal amount (Withdraw):"),
            when(answers) {
                return answers.transactionType == "Withdraw"
            }
        }
    ])

    if (answers.userId && answers.userId) {
        const balance: number = Math.floor(Math.random() * 100000 + 1)
        console.log(chalk.blue(`Your Current Balance is : ${chalk.yellow(balance)}`));
        if (balance >= answers.amount) {
            const remainingBalance: number = balance - answers.amount;
            console.log(chalk.green(`Your remaining balance is ${chalk.yellow(remainingBalance)}`));
            console.log(chalk.magenta("Thank you for your transaction."));
        } else {
            console.log(chalk.red("Insufficient balance!"));
        }
    }
}

main();

