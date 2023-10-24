const {updatedRoleChoices, updatedManagerList} = require('./updateArrayFunctions');

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
        choices: updatedRoleChoices
    },
    {
        type: 'list',
        name: 'newEmpManager',
        message: 'Who is the new employee\'s manager?',
        choices: updatedManagerList
    }
];

module.exports = addEmployeePrompts;