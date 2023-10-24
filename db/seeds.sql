INSERT INTO department (name)
VALUES ('Software Development'),
       ('Product Management'),
       ('Sales and Marketing'),
       ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('Director of Engineering', 200000, 1),
       ('Front-end Developer', 100000, 1),
       ('Back-end Developer', 110000, 1),
       ('Director of Product Management', 180000, 2),
       ('Product Manager', 140000, 2),
       ('UX Designer', 110000, 2),
       ('Director of Sales', 200000, 3),
       ('Sales Representative', 80000, 3),
       ('Digital Marketing Specialist', 100000, 3),
       ('Director of HR', 180000, 4),
       ('Recruitment Specialist', 80000, 4),
       ('Employee Relations Specialist', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, NULL),
       ('Maria', 'Garcia', 2, NULL),
       ('Mohammed', 'Abdul', 3, NULL),
       ('Ling', 'Chen', 4, NULL),
       ('Sven', 'Andersson', 1, 1),
       ('Léa', 'Dubois', 1, 1),
       ('David', 'Kim', 2, 2),
       ('Aisha', 'Al-Mansoori', 2, 2),
       ('Yuki', 'Nakamura', 3, 3),
       ('Elena', 'Ivanova', 3, 3),
       ('Carlos', 'Santos', 4, 4),
       ('Marta', 'Gomez', 4, 4);