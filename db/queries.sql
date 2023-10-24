SELECT * FROM department;

SELECT title, salary, department.name AS department FROM role JOIN department ON department_id = department.id ORDER BY role.id ASC;

SELECT 
    e.first_name AS Employee_FirstName,
    e.last_name AS Employee_LastName,
    r.title AS Employee_Role,
    d.name AS Employee_Department,
    CONCAT(m.first_name, ' ', m.last_name) AS Manager_Name
FROM employee e
INNER JOIN role r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;

INSERT INTO department (name) VALUES ('R&D');

SELECT * FROM department WHERE name = 'Human Resources';

INSERT INTO role (title, salary, department_id) VALUES ('Lawyer', 100000, 1);

UPDATE employee SET role_id = 6 WHERE id = 1;