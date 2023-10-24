const inquirer = require('inquirer');
const mysql = require('mysql2');
const initialPrompts = require('./prompts/initialPrompts');
const addDeptPrompt = require('./prompts/addDeptPrompt');
const { addRolePrompts, updatedDeptChoices } = require('./prompts/addRolePrompts');
const { addEmployeePrompts, updatedRoleChoices } = require('./prompts/addEmployeePrompts');

// create the connection to database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'rootroot',
    database: 'employee_data_db'
  },
  console.log('Connected to the database'),
);

const viewAllDepts = () => {
  db.query('SELECT * FROM department ORDER BY department.id ASC', function (err, results) {
    err ? console.log(err) :  console.table(results);
    init();
    });
  };

const viewAllRoles = () => {
  db.query('SELECT title, salary, department.name AS department FROM role JOIN department ON department_id = department.id ORDER BY role.id ASC', function (err, results) {
    err ? console.log(err) : console.table(results);
    init();
  });
};

const viewAllEmpl = () => {
  db.query("SELECT e.first_name AS Employee_FirstName, e.last_name AS Employee_LastName,r.title AS Employee_Role, d.name AS Employee_Department,CONCAT(m.first_name, ' ', m.last_name) AS Manager_Name FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id", function (err, results) {
    err ? console.log(err) : console.table(results);
    init();
  });
};

const addDepartment = () => {
  inquirer.prompt(addDeptPrompt)
  .then((answer) => {
    db.query(`INSERT INTO department (name) VALUE ('${answer.addDept}')`, function (err) {
    err ? console.log(err) : 
    updatedDeptChoices.push(answer.addDept);
    console.log('Department added successfully.');
    });
    init();
  });
};

const addRole = () => {
  inquirer.prompt(addRolePrompts)
  .then((answer) => {
    //Fix department part - needs to be department id instead of name
    let newRoleDeptId;
    let newRoleDeptName = answer.newRoleDept;
    console.log(newRoleDeptName);
    db.query(`SELECT * FROM department WHERE name = '${newRoleDeptName}'`, function (err, results) {
      err ? console.log(err) : 
      newRoleDeptId = results;
    });
    console.log(newRoleDeptId);
    
    // console.log(newRoleDeptId);
    // db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.addRole}', '${answer.newRoleSalary}', '${newRoleDeptId}')`, function (err) {
    //   err ? console.log(err) : 
    //   updatedRoleChoices.push(answer.addRole);
    //   console.log('Role added successfully.')
    // });
    init();
  });
}

const addEmployee = () => {
  inquirer.prompt(addEmployeePrompts)
  .then((answer) => {
    //Fix department and role id and manager id parts - needs to be id instead of name
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('${answer.newEmpFirstName}', '${answer.newEmpLastName}', '${answer.newEmpRole}, '${answer.newEmpManager}')`, function (err) {
      err ? console.log(err) : console.log('Role added successfully.')
    })
    init();
  });
}

const updateEmployeeRole = () => {
  inquirer.prompt()
    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [])
}

const init = () => {
  inquirer  
  .prompt(initialPrompts)
  .then((answers) => {
    switch (answers.options) {
      case 'View all departments':
        viewAllDepts();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmpl();
        break;
      case 'Add a department':
        addDepartment();       
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;   
      case 'Update an employee role':
        updateEmployeeRole();
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