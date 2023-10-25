-- "View all" queries 
SELECT * FROM department;

SELECT title, salary, department.name AS department FROM role JOIN department ON department_id = department.id ORDER BY role.id ASC;
-- This is the one from ChatGPT:
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

-- Add department:
INSERT INTO department (name) VALUES ('R&D');


SELECT * FROM department WHERE name = 'Human Resources';
-- Add role
INSERT INTO role (title, salary, department_id) VALUES ('Lawyer', 100000, 1);

Select title from role ORDER BY role.id ASC;
-- Select manager
SELECT CONCAT(first_name, " ", last_name) AS manager_name from employee WHERE manager_id IS NULL ORDER BY employee.id ASC;
-- Update employee
UPDATE employee SET role_id = 6 WHERE id = 1;

SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = 'Léa Dubois';