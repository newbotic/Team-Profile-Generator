// Importing necessary modules and classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Setting up output directory and file path for generated HTML
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Importing the function to render the HTML template
const render = require("./src/page-template.js");

// Array to store information about the development team members
const teamMembers = [];

// Question prompts for manager, engineer, and intern
const managerQuiz = [
  {
    type: "input",
    name: "name",
    message: "Enter the team manager's name:",
  },
  {
    type: "input",
    name: "id",
    message: "Enter the team manager's employee ID:",
  },
  {
    type: "input",
    name: "email",
    message: "Enter the team manager's email address:",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Enter the team manager's office number:",
  },
];

const engineerQuiz = [
  {
    type: "input",
    name: "name",
    message: "Enter the engineer's name:",
  },
  {
    type: "input",
    name: "id",
    message: "Enter the engineer's employee ID:",
  },
  {
    type: "input",
    name: "email",
    message: "Enter the engineer's email address:",
  },
  {
    type: "input",
    name: "github",
    message: "Enter the engineer's GitHub username:",
  },
];

const internQuiz = [
  {
    type: "input",
    name: "name",
    message: "Enter the intern's name:",
  },
  {
    type: "input",
    name: "id",
    message: "Enter the intern's employee ID:",
  },
  {
    type: "input",
    name: "email",
    message: "Enter the intern's email address:",
  },
  {
    type: "input",
    name: "school",
    message: "Enter the intern's school:",
  },
];

// Function to add a manager to the team
function addManager() {
  inquirer.prompt(managerQuiz).then((response) => {
    const manager = new Manager(
      response.name,
      response.id,
      response.email,
      response.officeNumber
    );
    teamMembers.push(manager);
    // After adding a manager, prompt the user for the next action
    promptMenu();
  });
}

// Function to add an engineer to the team
function addEngineer() {
  inquirer.prompt(engineerQuiz).then((response) => {
    const engineer = new Engineer(
      response.name,
      response.id,
      response.email,
      response.github
    );
    teamMembers.push(engineer);
    // After adding an engineer, prompt the user for the next action
    promptMenu();
  });
}

// Function to add an intern to the team
function addIntern() {
  inquirer.prompt(internQuiz).then((response) => {
    const intern = new Intern(
      response.name,
      response.id,
      response.email,
      response.school
    );
    teamMembers.push(intern);
    // After adding an intern, prompt the user for the next action
    promptMenu();
  });
}

// Function to prompt the user for the next action (add engineer, add intern, or finish building the team)
function promptMenu() {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: ["Add an Engineer", "Add an Intern", "Finish building the team"],
    })
    .then((response) => {
      switch (response.choice) {
        case "Add an Engineer":
          addEngineer();
          break;
        case "Add an Intern":
          addIntern();
          break;
        case "Finish building the team":
          // When the user chooses to finish building the team, generate the HTML
          generateHTML();
          break;
      }
    });
}

// Function to generate the HTML using the rendered template and write it to a file
function generateHTML() {
  const htmlContent = render(teamMembers);

  // Check if the output directory exists, if not, create it
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  // Write the HTML content to the specified file path
  fs.writeFileSync(outputPath, htmlContent);

  console.log(`Team HTML generated at ${outputPath}`);
}

// Start the process by adding the manager
addManager();
