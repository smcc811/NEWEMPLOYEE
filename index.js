const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const employeeInfo = [];

const render = require("./lib/htmlRenderer");
const { Console } = require("console");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
const mgrQuestions = [
  { type: "input", name: "name", message: "what is your name" },

  {
    type: "input",
    name: "id",
    message: "what is your id",
  },

  {
    type: "input",
    name: "phone",
    message: "what is your phone number ",
  },

  {
    type: "input",
    name: "email",
    message: "what is your email address ",
  },
  {
    type: "input",
    name: "position",
    message: "what is your current position ",
  },
];

const engineerQuestions = [
  { type: "input", name: "name", message: "what is your name" },

  {
    type: "input",
    name: "id",
    message: "what is your id",
  },

  {
    type: "input",
    name: "email",
    message: "what is your email address ",
  },
  {
    type: "input",
    name: "github",
    message: "what is your github username ",
  },
  {
    type: "input",
    name: "answer",
    message: "do you want to add another Engineer ",
  },
];

const internQuestions = [
  { type: "input", name: "name", message: "what is your name" },

  {
    type: "input",
    name: "id",
    message: "what is your id",
  },

  {
    type: "input",
    name: "position",
    message: "what is your position  ",
  },

  {
    type: "input",
    name: "email",
    message: "what is your email address ",
  },
  {
    type: "input",
    name: "school",
    message: "where did you attend school ",
  },
  {
    type: "input",
    name: "answer",
    message:
      "do you want to add another Intern answer must be yes or YES to add",
  },
];

// get manager information

function managerInfo() {
  inquirer.prompt(mgrQuestions).then((response) => {
    const manager = new Manager(
    (this.name = response.name),
      (this.id = response.id),
      (this.email = response.email),
      (this.officeNumber = response.phone)
    )
    console.log(manager)
    employeeInfo.push(manager);
    chooseEmployeeType();
  }).catch(err => console.log(err))
}

function engineerInfo() {
  inquirer
    .prompt(engineerQuestions)
    .then((response) => {
      const engineer = new Engineer(
        (this.name = response.name),
        (this.github = response.github),
        (this.id = response.id),
        (this.email = response.email),
        response.answer
      );

      employeeInfo.push(engineer);
      if (response.answer === "yes" || response.answer === "YES") {
        engineerInfo();
      } else {
        chooseEmployeeType();
      }
    })
    .catch((err) => console.log(err));
}

function internInfo() {
  inquirer.prompt(internQuestions).then((response) => {
    const intern = new Intern(
      (this.name = response.name),
      (this.email = response.email),
      (this.id = response.id),
      (this.school = response.school),
      response.answer
    );
    employeeInfo.push(intern);
    if (response.answer === "yes" || response.answer === "YES") {
      internInfo();
    } else {
      chooseEmployeeType();
    }
  });
}

function chooseEmployeeType() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose which employee type to add.",
        name: "choice",
        choices: ["Engineer", "Intern", "Manager", "Build"],
      },
    ])
    .then((userChoice) => {
      switch (userChoice.choice) {
        case "Engineer":
          engineerInfo();
          break;
        case "Intern":
          internInfo();
          break;
        case "Manager":
          managerInfo();
          break;

        default:
          console.log("employee info is " + employeeInfo[0]);
          fs.writeFileSync(outputPath, render(employeeInfo), "utf-8");
      }
    });
}

chooseEmployeeType();
