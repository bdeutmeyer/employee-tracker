const mysql = require('mysql2');
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'rootroot',
    database: 'employee_data_db'
  },
);

const updateRoles = () => {
    const updatedRoleChoices = [];
    db.query('Select title FROM role ORDER BY role.id ASC', function (err, results) {
        if (err) {
            console.log(err)
        } else {
            for(let i = 0; i < results.length; i++) {
                updatedRoleChoices.push(results[i].title);
            };
        }
    })
    return updatedRoleChoices;
};

const updateEmployees = () => {
    const updatedEmpChoices = [];
    db.query('Select CONCAT(first_name, " ", last_name) AS employee_name FROM employee ORDER BY employee.id ASC', function (err, results) {
        if (err) {
            console.log(err)
        } else {
            for(let i = 0; i < results.length; i++) {
                updatedEmpChoices.push(results[i].employee_name);
            };
        }
    })
    return updatedEmpChoices;
};

const updateEmpRolePrompts = [
    {
        type: 'list',
        name: 'whichEmp',
        message: 'Which employee\'s role would you like to update?',
        choices: updateEmployees()
    },
    {
        type: 'list',
        name: 'whichRole',
        message: 'Which role would you like to assign to this employee?',
        choices: updateRoles()
    }
];

module.exports = {updateEmployees, updateEmpRolePrompts};