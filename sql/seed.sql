
INSERT INTO authors (name, email, bio) VALUES
('Juan Pérez', 'juan@example.com', 'Escribe sobre tecnología.'),
('Ana Gómez', 'ana@example.com', 'Apasionada por la literatura.'),
('Luis Torres', 'luis@example.com', 'Desarrollador y escritor.');

INSERT INTO posts (author_id, title, content, published) VALUES
(1, 'Mi primer post', 'Introducción a mi blog.', TRUE),
(1, 'Aprendiendo PostgreSQL', 'Mis primeras consultas SQL.', TRUE),
(2, 'El hábito de leer', 'Por qué leer todos los días.', TRUE),
(3, 'Borrador de API', 'Ideas para una API REST.', FALSE);

INSERT INTO comments (post_id, author_id, content) VALUES
(1, 2, '¡Muy buen artículo!'),
(1, 3, 'Espero la próxima entrega.'),
(2, 2, 'PostgreSQL es muy interesante.'),
(3, 1, 'Me gustó esta reflexión.');
