const updatedDeptChoices = ['Software Development', 'Project Management', 'Sales and Marketing', 'Human resources'];

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

module.exports = { updatedDeptChoices, addRolePrompts };
