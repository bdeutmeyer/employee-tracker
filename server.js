const inquirer = require('inquirer');
const mysql = require('mysql2');
const initialPrompts = require('./prompts/initialPrompts');

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
        //function

        break;
      case 'Add a role':
        //function

        break;
      case 'Add an employee':
        //function

        break;   
      case 'Update an employee role':
        //function

        break;
      case 'Quit':
        //function
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