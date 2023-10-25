const mysql = require('mysql2');
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'rootroot',
    database: 'employee_data_db'
  },
);
//Updates department list
const updatedDeptChoices = [];
const updateDepts = () => {
    db.query('Select name from department ORDER BY department.id ASC', function (err, results) {
        if (err) {
            console.log(err)
        } else {
            for(let i = 0; i < results.length; i++) {
                updatedDeptChoices.push(results[i].name);
            };
        }
    })
};
//Prompts for adding a role
const addRolePrompts = [
    {
        type: 'input',
        name: 'addRole',
        message: 'What is the title of the role would you like to add?'
    },
    {
        type: 'input',
        name: 'newRoleSalary',
        message: 'What is the salary of this new role?'
    },
    {
        type: 'list',
        name: 'newRoleDept',
        message: 'Which department is this new role a part of?',
        choices: updatedDeptChoices
    }
];

module.exports = {updateDepts, addRolePrompts};