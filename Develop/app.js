const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let employees = []

addIntern = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's name?",
            name: "name",

        },
        {
            type: "input",
            message: "What is the employee's id?",
            name: "id",

        },
        {
            type: "input",
            message: "What is the employee's e-mail?",
            name: "email",
        },
        {
            type: "input",
            message: "What school did you attend?",
            name: "school",
        }
    ])
        .then(answers => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            employees.push(intern)
            selectEmployeeType()
        })
}

addManager = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's name?",
            name: "name",

        },
        {
            type: "input",
            message: "What is the employee's id?",
            name: "id",

        },
        {
            type: "input",
            message: "What is the employee's e-mail?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the office number?",
            name: "officenumber",
        }
    ])
        .then(answers => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officenumber);
            employees.push(manager)
            selectEmployeeType()
        })
}

addEngineer = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's name?",
            name: "name",

        },
        {
            type: "input",
            message: "What is the employee's id?",
            name: "id",

        },
        {
            type: "input",
            message: "What is the employee's e-mail?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your github?",
            name: "github",
        }
    ])
        .then(answers => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            employees.push(engineer)
            selectEmployeeType()
        })
}

selectEmployeeType = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What type of team member would you like to add?",
            name: "employeetype",
            choices: ["manager", "engineer", "intern", "None"]

        }])
        .then(answer => {
            switch (answer.employeetype) {
                case "engineer":
                    addEngineer()
                    break;
                case "manager":
                    addManager()
                    break;
                case "intern":
                    addIntern()
                    break;
                case "None":
                    writeOutput()
                    break;

            }
        })
}
writeOutput =() => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(employees), "utf-8")
}

selectEmployeeType()
