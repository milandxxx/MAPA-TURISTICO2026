CREATE DATABASE IF NOT EXISTS mapa_turistico;
USE mapa_turistico;

DROP TABLE IF EXISTS lugares;

CREATE TABLE lugares (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion TEXT,
    lat DOUBLE,
    lon DOUBLE,
    imagen TEXT
);

INSERT INTO lugares (nombre, descripcion, lat, lon, imagen) VALUES
('Parque Tayrona','Parque natural con playas y biodiversidad',11.300,-73.900,'https://picsum.photos/400?1'),
('El Rodadero','Zona turística con playa y hoteles',11.205,-74.225,'https://picsum.photos/400?2'),
('Playa Blanca','Playa de aguas cristalinas',11.213,-74.233,'https://picsum.photos/400?3'),
('Taganga','Pueblo pesquero turístico',11.263,-74.190,'https://picsum.photos/400?4'),
('Minca','Zona montañosa con cascadas',11.140,-74.120,'https://picsum.photos/400?5'),
('Bahía de Santa Marta','Bahía principal de la ciudad',11.240,-74.210,'https://picsum.photos/400?6'),
('Parque de los Novios','Zona social y gastronómica',11.241,-74.205,'https://picsum.photos/400?7'),
('Quinta San Pedro Alejandrino','Sitio histórico de Bolívar',11.220,-74.200,'https://picsum.photos/400?8'),
('Museo del Oro Tayrona','Museo cultural indígena',11.243,-74.208,'https://picsum.photos/400?9'),
('Catedral de Santa Marta','Catedral histórica',11.242,-74.206,'https://picsum.photos/400?10'),

('Playa Bello Horizonte','Zona tranquila con hoteles',11.140,-74.230,'https://picsum.photos/400?11'),
('Pozos Colorados','Sector turístico moderno',11.170,-74.230,'https://picsum.photos/400?12'),
('Acuario Rodadero','Centro marino turístico',11.210,-74.230,'https://picsum.photos/400?13'),
('Cabo San Juan','Playa icónica del Tayrona',11.310,-73.950,'https://picsum.photos/400?14'),
('Playa Cristal','Playa dentro del Tayrona',11.320,-73.980,'https://picsum.photos/400?15'),
('Bahía Concha','Playa natural protegida',11.280,-74.180,'https://picsum.photos/400?16'),
('Rio Don Diego','Río turístico ecológico',11.270,-73.850,'https://picsum.photos/400?17'),
('Quebrada Valencia','Cascada natural',11.260,-73.900,'https://picsum.photos/400?18'),
('Cerro Ziruma','Mirador panorámico',11.210,-74.210,'https://picsum.photos/400?19'),
('Centro Histórico','Zona colonial',11.240,-74.210,'https://picsum.photos/400?20'),

('Lugar 21','Sitio turístico en Santa Marta',11.21,-74.20,'https://picsum.photos/400?21'),
('Lugar 22','Sitio turístico en Santa Marta',11.22,-74.21,'https://picsum.photos/400?22'),
('Lugar 23','Sitio turístico en Santa Marta',11.23,-74.22,'https://picsum.photos/400?23'),
('Lugar 24','Sitio turístico en Santa Marta',11.24,-74.23,'https://picsum.photos/400?24'),
('Lugar 25','Sitio turístico en Santa Marta',11.25,-74.24,'https://picsum.photos/400?25'),
('Lugar 26','Sitio turístico en Santa Marta',11.26,-74.20,'https://picsum.photos/400?26'),
('Lugar 27','Sitio turístico en Santa Marta',11.27,-74.21,'https://picsum.photos/400?27'),
('Lugar 28','Sitio turístico en Santa Marta',11.28,-74.22,'https://picsum.photos/400?28'),
('Lugar 29','Sitio turístico en Santa Marta',11.29,-74.23,'https://picsum.photos/400?29'),
('Lugar 30','Sitio turístico en Santa Marta',11.30,-74.24,'https://picsum.photos/400?30'),

('Lugar 31','Sitio turístico en Santa Marta',11.21,-74.19,'https://picsum.photos/400?31'),
('Lugar 32','Sitio turístico en Santa Marta',11.22,-74.18,'https://picsum.photos/400?32'),
('Lugar 33','Sitio turístico en Santa Marta',11.23,-74.17,'https://picsum.photos/400?33'),
('Lugar 34','Sitio turístico en Santa Marta',11.24,-74.16,'https://picsum.photos/400?34'),
('Lugar 35','Sitio turístico en Santa Marta',11.25,-74.15,'https://picsum.photos/400?35'),

('Lugar 36','Sitio turístico en Santa Marta',11.26,-74.14,'https://picsum.photos/400?36'),
('Lugar 37','Sitio turístico en Santa Marta',11.27,-74.13,'https://picsum.photos/400?37'),
('Lugar 38','Sitio turístico en Santa Marta',11.28,-74.12,'https://picsum.photos/400?38'),
('Lugar 39','Sitio turístico en Santa Marta',11.29,-74.11,'https://picsum.photos/400?39'),
('Lugar 40','Sitio turístico en Santa Marta',11.30,-74.10,'https://picsum.photos/400?40'),

('Lugar 41','Sitio turístico en Santa Marta',11.20,-74.25,'https://picsum.photos/400?41'),
('Lugar 42','Sitio turístico en Santa Marta',11.21,-74.26,'https://picsum.photos/400?42'),
('Lugar 43','Sitio turístico en Santa Marta',11.22,-74.27,'https://picsum.photos/400?43'),
('Lugar 44','Sitio turístico en Santa Marta',11.23,-74.28,'https://picsum.photos/400?44'),
('Lugar 45','Sitio turístico en Santa Marta',11.24,-74.29,'https://picsum.photos/400?45'),

('Lugar 46','Sitio turístico en Santa Marta',11.25,-74.30,'https://picsum.photos/400?46'),
('Lugar 47','Sitio turístico en Santa Marta',11.26,-74.31,'https://picsum.photos/400?47'),
('Lugar 48','Sitio turístico en Santa Marta',11.27,-74.32,'https://picsum.photos/400?48'),
('Lugar 49','Sitio turístico en Santa Marta',11.28,-74.33,'https://picsum.photos/400?49'),
('Lugar 50','Sitio turístico en Santa Marta',11.29,-74.34,'https://picsum.photos/400?50'),

('Lugar 51','Sitio turístico en Santa Marta',11.20,-74.05,'https://picsum.photos/400?51'),
('Lugar 52','Sitio turístico en Santa Marta',11.21,-74.06,'https://picsum.photos/400?52'),
('Lugar 53','Sitio turístico en Santa Marta',11.22,-74.07,'https://picsum.photos/400?53'),
('Lugar 54','Sitio turístico en Santa Marta',11.23,-74.08,'https://picsum.photos/400?54'),
('Lugar 55','Sitio turístico en Santa Marta',11.24,-74.09,'https://picsum.photos/400?55'),

('Lugar 56','Sitio turístico en Santa Marta',11.25,-74.05,'https://picsum.photos/400?56'),
('Lugar 57','Sitio turístico en Santa Marta',11.26,-74.06,'https://picsum.photos/400?57'),
('Lugar 58','Sitio turístico en Santa Marta',11.27,-74.07,'https://picsum.photos/400?58'),
('Lugar 59','Sitio turístico en Santa Marta',11.28,-74.08,'https://picsum.photos/400?59'),
('Lugar 60','Sitio turístico en Santa Marta',11.29,-74.09,'https://picsum.photos/400?60'),

('Lugar 61','Sitio turístico en Santa Marta',11.20,-74.15,'https://picsum.photos/400?61'),
('Lugar 62','Sitio turístico en Santa Marta',11.21,-74.16,'https://picsum.photos/400?62'),
('Lugar 63','Sitio turístico en Santa Marta',11.22,-74.17,'https://picsum.photos/400?63'),
('Lugar 64','Sitio turístico en Santa Marta',11.23,-74.18,'https://picsum.photos/400?64'),
('Lugar 65','Sitio turístico en Santa Marta',11.24,-74.19,'https://picsum.photos/400?65'),

('Lugar 66','Sitio turístico en Santa Marta',11.25,-74.20,'https://picsum.photos/400?66'),
('Lugar 67','Sitio turístico en Santa Marta',11.26,-74.21,'https://picsum.photos/400?67'),
('Lugar 68','Sitio turístico en Santa Marta',11.27,-74.22,'https://picsum.photos/400?68'),
('Lugar 69','Sitio turístico en Santa Marta',11.28,-74.23,'https://picsum.photos/400?69'),
('Lugar 70','Sitio turístico en Santa Marta',11.29,-74.24,'https://picsum.photos/400?70'),

('Lugar 71','Sitio turístico en Santa Marta',11.30,-74.25,'https://picsum.photos/400?71'),
('Lugar 72','Sitio turístico en Santa Marta',11.31,-74.26,'https://picsum.photos/400?72'),
('Lugar 73','Sitio turístico en Santa Marta',11.32,-74.27,'https://picsum.photos/400?73'),
('Lugar 74','Sitio turístico en Santa Marta',11.33,-74.28,'https://picsum.photos/400?74'),
('Lugar 75','Sitio turístico en Santa Marta',11.34,-74.29,'https://picsum.photos/400?75'),

('Lugar 76','Sitio turístico en Santa Marta',11.35,-74.30,'https://picsum.photos/400?76'),
('Lugar 77','Sitio turístico en Santa Marta',11.36,-74.31,'https://picsum.photos/400?77'),
('Lugar 78','Sitio turístico en Santa Marta',11.37,-74.32,'https://picsum.photos/400?78'),
('Lugar 79','Sitio turístico en Santa Marta',11.38,-74.33,'https://picsum.photos/400?79'),
('Lugar 80','Sitio turístico en Santa Marta',11.39,-74.34,'https://picsum.photos/400?80'),

('Lugar 81','Sitio turístico en Santa Marta',11.10,-74.20,'https://picsum.photos/400?81'),
('Lugar 82','Sitio turístico en Santa Marta',11.11,-74.21,'https://picsum.photos/400?82'),
('Lugar 83','Sitio turístico en Santa Marta',11.12,-74.22,'https://picsum.photos/400?83'),
('Lugar 84','Sitio turístico en Santa Marta',11.13,-74.23,'https://picsum.photos/400?84'),
('Lugar 85','Sitio turístico en Santa Marta',11.14,-74.24,'https://picsum.photos/400?85'),

('Lugar 86','Sitio turístico en Santa Marta',11.15,-74.25,'https://picsum.photos/400?86'),
('Lugar 87','Sitio turístico en Santa Marta',11.16,-74.26,'https://picsum.photos/400?87'),
('Lugar 88','Sitio turístico en Santa Marta',11.17,-74.27,'https://picsum.photos/400?88'),
('Lugar 89','Sitio turístico en Santa Marta',11.18,-74.28,'https://picsum.photos/400?89'),
('Lugar 90','Sitio turístico en Santa Marta',11.19,-74.29,'https://picsum.photos/400?90'),

('Lugar 91','Sitio turístico en Santa Marta',11.10,-74.10,'https://picsum.photos/400?91'),
('Lugar 92','Sitio turístico en Santa Marta',11.11,-74.11,'https://picsum.photos/400?92'),
('Lugar 93','Sitio turístico en Santa Marta',11.12,-74.12,'https://picsum.photos/400?93'),
('Lugar 94','Sitio turístico en Santa Marta',11.13,-74.13,'https://picsum.photos/400?94'),
('Lugar 95','Sitio turístico en Santa Marta',11.14,-74.14,'https://picsum.photos/400?95'),

('Lugar 96','Sitio turístico en Santa Marta',11.15,-74.15,'https://picsum.photos/400?96'),
('Lugar 97','Sitio turístico en Santa Marta',11.16,-74.16,'https://picsum.photos/400?97'),
('Lugar 98','Sitio turístico en Santa Marta',11.17,-74.17,'https://picsum.photos/400?98'),
('Lugar 99','Sitio turístico en Santa Marta',11.18,-74.18,'https://picsum.photos/400?99'),
('Lugar 100','Sitio turístico en Santa Marta',11.19,-74.19,'https://picsum.photos/400?100');