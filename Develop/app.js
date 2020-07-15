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
            choices: ["manager", "intern", "engineer", "None"]

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



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
