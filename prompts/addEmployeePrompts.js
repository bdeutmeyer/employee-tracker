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

const updateManagers = () => {
    const updatedManagerChoices = [];
    db.query('SELECT CONCAT(first_name, " ", last_name) AS manager_name FROM employee WHERE manager_id IS NULL ORDER BY employee.id ASC', function (err, results) {
        if (err) {
            console.log(err)
        } else {
            for(let i = 0; i < results.length; i++) {
                updatedManagerChoices.push(results[i].manager_name);
            };
        }
    })
    return updatedManagerChoices;
};

const addEmployeePrompts = [
    {
        type: 'input',
        name: 'newEmpFirstName',
        message: 'What is the first name of the new employee?'
    },
    {
        type: 'input',
        name: 'newEmpLastName',
        message: 'What is the last name of the new employee?'
    },
    {
        type: 'list',
        name: 'newEmpRole',
        message: 'What is the role of the new employee?',
        choices: updateRoles()
    },
    {
        type: 'list',
        name: 'newEmpManager',
        message: 'Who is the new employee\'s manager?',
        choices: updateManagers()
    }
];

module.exports = { updateRoles, updateManagers, addEmployeePrompts };