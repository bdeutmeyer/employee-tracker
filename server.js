const inquirer = require('inquirer');
const mysql = require('mysql2');
const initialPrompts = require('./prompts/initialPrompts');
const addDeptPrompt = require('./prompts/addDeptPrompt');
const { addRolePrompts, updatedDeptChoices } = require('./prompts/addRolePrompts');
const { addEmployeePrompts, updatedRoleChoices } = require('./prompts/addEmployeePrompts');
// const { allDeptsQuery, allRolesQuery, allEmployeesQuery, addDeptQuery, addRoleQuery, AddEmpQuery, updateEmpRoleQuery } = require('./queries/allQueries');

// create the connection to database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'rootroot',
    database: 'employee_data_db'
  },
  console.log('Connected to the database'),
  );


const init = () => {
  inquirer  
  .prompt(initialPrompts)
  .then((answers) => {
    switch (answers.options) {
      case 'View all departments':
        db.query('SELECT * FROM department', function (err, results) {
          err ? console.log(err) : console.table(results);
          init();
        });
        break;
      case 'View all roles':
        db.query('SELECT * FROM role', function (err, results) {
          err ? console.log(err) : console.table(results);
          init();
        });
        break;
      case 'View all employees':
        db.query('SELECT * FROM employee', function (err, results) {
          err ? console.log(err) : console.table(results);
          init();
        });
        break;
      case 'Add a department':
        inquirer.prompt(addDeptPrompt)
        .then((answer) => {
          db.query(`INSERT INTO department (name) VALUE ('${answer.addDept}')`, function (err) {
            err ? console.log(err) : 
            updatedDeptChoices.push(answer.addDept);
            console.log('Department added successfully.');
          })
          init();
        });
        break;
      case 'Add a role':
        inquirer.prompt(addRolePrompts)
        .then((answer) => {
          //Fix department part - needs to be department id instead of name
          db.query(`INSERT INTO role (title, salary, department_id) VALUE ('${answer.addRole}', '${answer.newRoleSalary}', '${answer.newRoleDept}')`, function (err) {
            err ? console.log(err) : 
            updatedRoleChoices.push(answer.addRole);
            console.log('Role added successfully.')
          })
          init();
        });
        break;
      case 'Add an employee':
        inquirer.prompt(addEmployeePrompts)
        .then((answer) => {
          //Fix department and role id and manager id parts - needs to be id instead of name
          db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('${answer.newEmpFirstName}', '${answer.newEmpLastName}', '${answer.newEmpRole}, '${answer.newEmpManager}')`, function (err) {
            err ? console.log(err) : console.log('Role added successfully.')
          })
          init();
        });
        break;   
      case 'Update an employee role':
        //function
        
        break;
      case 'Quit':
        console.log('Exited Employee Tracker');
        break;       
    } 
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  })
}

module.exports = db;
init();