const updatedRoleChoices = ['Director of Engineering', 'Front-end Developer', 'Back-end Developer', 'Director of Product Management', 'Product Manager', 'UX Designer', 'Director of Sales', 'Sales Representative', 'Digital Marketing Specialist', 'Director of HR', 'Recruitment Specialist', 'Employee Relations Specialist'];

const updatedManagerList = ['John Smith', 'Maria Garcia', 'Mohammed Abdul', 'Ling Chen'];

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

module.exports = { addEmployeePrompts, updatedRoleChoices, updatedManagerList };