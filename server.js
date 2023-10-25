const inquirer = require('inquirer');
const mysql = require('mysql2');
const initialPrompts = require('./prompts/initialPrompts');
const addDeptPrompt = require('./prompts/addDeptPrompt');
const { updateRoles, updateManagers, addEmployeePrompts } = require('./prompts/addEmployeePrompts');
const { updateDepts, addRolePrompts } = require('./prompts/addRolePrompts');
const { updateEmployees, updateEmpRolePrompts } = require('./prompts/updateEmpRolePrompts');

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
    console.log('Department added successfully.');
    });
    init();
  });
};

const addRole = () => {
  updateDepts();
  inquirer.prompt(addRolePrompts)
  .then((answer) => {
    let newRoleDeptId;
    let newRoleDeptName = answer.newRoleDept;
    db.query(`SELECT id FROM department WHERE name = '${newRoleDeptName}'`, function (err, results) {
      err ? console.log(err) : 
      newRoleDeptId = results[0].id;
      
      db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.addRole}', '${answer.newRoleSalary}', '${newRoleDeptId}')`, function (err) {
        err ? console.log(err) : 
        console.log('Role added successfully.')
      });
    });
    init();
  });
};

const addEmployee = () => {
  updateRoles();
  updateManagers();
  inquirer.prompt(addEmployeePrompts)
  .then((answer) => {
    let newEmpRoleId;
    let newEmpRoleName = answer.newEmpRole;
    db.query(`SELECT id FROM role WHERE title = '${newEmpRoleName}'`, function (err, results) {
      err ? console.log(err) : 
      newEmpRoleId = results[0].id;
      
      let newEmpMgrId;
      let newEmpMgrName = answer.newEmpManager;
      db.query(`SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = '${newEmpMgrName}'`, function (err, results) {
        err ? console.log(err) : newEmpMgrId = results[0].id;
        
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.newEmpFirstName}', '${answer.newEmpLastName}', ${newEmpRoleId}, ${newEmpMgrId})`, function (err) {
          err ? console.log(err) : console.log('Employee added successfully.')
        }); 
      }); 
    }); 
    init();
  }); 
}; 

const updateEmployeeRole = () => {
  updateEmployees();
  inquirer.prompt(updateEmpRolePrompts)
  .then((answer) => {
    let updatedRoleId;
    let updatedRoleName = answer.whichRole;
    db.query(`SELECT id FROM role WHERE title = '${updatedRoleName}'`, function (err, results) {
      err ? console.log(err) : updatedRoleId = results[0].id;
      
      let updatedEmpId;
      db.query(`SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = '${answer.whichEmp}'`, function (err, results) {
        err ? console.log(err) : updatedEmpId = results[0].id;
      

        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [updatedRoleId , updatedEmpId], function (err, results) {
        err ? console.log(err) : console.log('Employee role updated successfully.')
        })
      })
    });
  init();
  });
};

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
      console.log('Prompt couldn\'t be rendered in the current environment');
    } else {
      console.log(error);
    }
  })
}
updateDepts();
// updateRoles();
// updateEmployees();
// updateManagers();
init();