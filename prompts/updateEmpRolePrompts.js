const updatedRoleChoices = require('./addEmployeePrompts');
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'rootroot',
    database: 'employee_data_db'
  },
);

const updatedEmpChoices = [];
const updateEmployees = () => {
    db.query('Select CONCAT(first_name, " ", last_name) AS employee_name FROM employee ORDER BY employee.id ASC', function (err, results) {
        if (err) {
            console.log(err)
        } else {
            for(let i = 0; i < results.length; i++) {
                updatedEmpChoices.push(results[i].employee_name);
            };
        }
    })
};

const updateEmpRolePrompts = [
    {
        type: 'list',
        name: 'whichEmp',
        message: 'Which employee\'s role would you like to update?',
        choices: updatedEmpChoices
    },
    {
        type: 'list',
        name: 'whichRole',
        message: 'Which role would you like to assign to this employee?',
        choices: updatedRoleChoices
    }
];

module.exports = {updateEmployees, updateEmpRolePrompts};