const mysql = require('mysql2');
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'rootroot',
    database: 'employee_data_db'
  },
);

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
}

module.exports = { updatedDeptChoices, updateDepts };