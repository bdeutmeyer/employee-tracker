const { updatedRoleChoices, updatedEmpChoices} = require('./updatedArrays');



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

module.exports = updateEmpRolePrompts;