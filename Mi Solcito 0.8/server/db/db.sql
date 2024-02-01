DROP DATABASE IF EXISTS db_Mi_Solcito;
CREATE DATABASE db_Mi_Solcito;
USE db_Mi_Solcito;

CREATE TABLE IF NOT EXISTS sucursal (
    id_sucursal INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    codigo_postal VARCHAR(10),
    telefono VARCHAR(15),
    email VARCHAR(255),
    sitio_web VARCHAR(255),
    fecha_apertura DATE,
    tipo_de_local VARCHAR(50),
    descripcion TEXT,
    horario_apertura TIME,
    horario_cierre TIME
);

CREATE TABLE IF NOT EXISTS tipo_empleado (
    id_tipo_empleado INT AUTO_INCREMENT PRIMARY KEY,
    tipo_empleado VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS empleado (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    dni INT NOT NULL UNIQUE ,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE,
    direccion VARCHAR(255),
    telefono VARCHAR(15),
    salario DECIMAL(10, 2),
    tipo_empleado_id INT NOT NULL,
    sucursal INT,
    FOREIGN KEY (tipo_empleado_id) REFERENCES tipo_empleado(id_tipo_empleado),
    FOREIGN KEY (sucursal) REFERENCES sucursal(id_sucursal)
);

CREATE TABLE IF NOT EXISTS distribuidor (
    id_distribuidor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    codigo_postal VARCHAR(10),
    telefono VARCHAR(15),
    email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS materia_prima (
    id_materia_prima INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    unidad_medida VARCHAR(50),
    cantidad_en_stock DECIMAL(10, 2),
    proveedor_id INT,
    fecha_compra DATE,
    fecha_caducidad DATE,
    precio_unitario DECIMAL(10, 2),
    distribuidor_id INT,
    FOREIGN KEY (distribuidor_id) REFERENCES distribuidor(id_distribuidor)
);

CREATE TABLE IF NOT EXISTS tipo_producto (
    id_tipo_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (100)
);

CREATE TABLE IF NOT EXISTS contacto (
    id_contacto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (100),
    email VARCHAR (100),
    telefono VARCHAR (30),
    mensaje TEXT
);

CREATE TABLE IF NOT EXISTS producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50),
    precio DECIMAL(10, 2),
    cantidad_en_stock INT,
    materia_prima_id INT,
    tipo_producto_id INT,
    FOREIGN KEY (materia_prima_id) REFERENCES materia_prima(id_materia_prima),
    FOREIGN KEY (tipo_producto_id) REFERENCES tipo_producto(id_tipo_producto)
);

CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    correo VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL
);


CREATE TABLE IF NOT EXISTS pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    fecha_pedido DATE,
    cliente_id INT,
    producto_id INT,
    empleado_id INT,
    total_pedido DECIMAL(10, 2),
    estado_pedido VARCHAR(50),
    fecha_entrega DATE,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id_cliente),
    FOREIGN KEY (producto_id) REFERENCES producto(id_producto),
    FOREIGN KEY (empleado_id) REFERENCES empleado(id_empleado)
);


INSERT INTO sucursal(nombre, direccion, ciudad, codigo_postal, telefono, email, sitio_web, fecha_apertura, tipo_de_local, descripcion, horario_apertura, horario_cierre) VALUES
('Mi Solcito', 'Av. Lope de Vega 2150, C1417 CABA', 'Buenos Aires', '1417', '11 4567-5838', 'MiSolcitoCABA@gmail.com', 'www.MiSolcito.com', '2022-16-06', 'Cafeteria', 'La primera sucursal y por el momento unica de la empresa', '08:00:00', '20:00:00');

INSERT INTO tipo_empleado (tipo_empleado) VALUES
('Gerente'),
('Cocinero'),
('Barista'),
('Encargado de inventario'),
('Mesero/Limpieza');

INSERT INTO empleado (dni, nombre, apellido, fecha_nacimiento, direccion, telefono, salario, tipo_empleado_id, sucursal) VALUES
(11854908, 'Juan', 'Gómez', '1985-05-10', 'Calle Florida 123, Buenos Aires, Argentina', '11 9876-5432', 3500.00, 1, 1),
(22112338, 'Maria', 'López', '1990-08-15', 'Avenida Corrientes 456, Córdoba, Argentina', '11 4567-8901', 2800.00, 2, 1),
(23768774, 'Carlos', 'Martínez', '1992-04-20', 'Calle San Martín 789, Rosario, Argentina', '11 5555-5555', 2400.00, 3, 1),
(24098451, 'Luisa', 'González', '1993-07-25', 'Avenida Libertador 101, Mendoza, Argentina', '11 1234-5678', 2400.00, 3, 1),
(24956212, 'Diego', 'Pérez', '1994-10-30', 'Calle Mitre 234, La Plata, Argentina', '11 8765-4321', 2400.00, 3, 1),
(30227950, 'Laura', 'Ramírez', '1988-03-05', 'Avenida Belgrano 567, Salta, Argentina', '11 2345-6789', 3200.00, 4, 1),
(33221100, 'María', 'Rodríguez', '1992-07-18', 'Av. San Martín 123, CABA, Argentina', '11 1234-5678', 2500.00, 4, 1);

INSERT INTO distribuidor (nombre, direccion, ciudad, codigo_postal, telefono, email) VALUES 
('Distribuidor de Café A', '123 Calle Principal', 'Ciudad Café', '12345', '+1234567890', 'cafea@distribuidor.com'),
('Distribuidor de Café B', '456 Avenida Cafetera', 'Otra Ciudad Café', '54321', '+9876543210', 'cafeb@distribuidor.com'),
('Café Expresso Distribución', '789 Calle del Café', 'Ciudad Café', '67890', '+1357924680', 'cafee@distribuidor.com'),
('Distribuidor de Granos de Café', '2468 Calle Cafetera', 'Otro Lugar Café', '98765', '+9871234560', 'cafef@distribuidor.com'),
('Café y Más', '1357 Avenida del Café', 'Ciudad del Café', '56789', '+1239876540', 'cafeg@distribuidor.com');

INSERT INTO materia_prima (nombre, descripcion, unidad_medida, cantidad_en_stock, proveedor_id, fecha_compra, fecha_caducidad, precio_unitario, distribuidor_id) VALUES 
('Café en Grano', 'Granos de café arábica premium', 'Kilogramo', 100.00, 1, '2023-01-15', '2023-12-31', 10.99, 1), 
('Leche Entera', 'Leche fresca pasteurizada', 'Litro', 50.00, 2, '2023-02-10', '2023-11-30', 1.99, 2),
('Azúcar Blanca', 'Azúcar granulada refinada', 'Kilogramo', 30.00, 3, '2023-03-05', '2024-02-28', 2.49, 3),
('Chocolate en Polvo', 'Cacao en polvo de alta calidad', 'Kilogramo', 20.00, 4, '2023-04-20', '2023-10-15', 6.99, 4);


INSERT INTO tipo_producto (nombre) VALUES
("Cafes"), 
("Licuados"), 
("Pasteles"), 
("Facturas"), 
("Macarrons"), 
("Cookies"), 
("Cupcakes"), 
("Especialidades");

-- Insertar producto 1
INSERT INTO producto (nombre, descripcion, categoria, precio, cantidad_en_stock, materia_prima_id, tipo_producto_id)
VALUES ('Café Espresso Doble', 'Doble shot de café espresso', 'Cafes', 3.99, 50, 1, 1);

-- Insertar producto 2
INSERT INTO producto (nombre, descripcion, categoria, precio, cantidad_en_stock, materia_prima_id, tipo_producto_id)
VALUES ('Latte de Vainilla', 'Latte con sabor a vainilla', 'Cafes', 4.49, 30, 2, 1);

-- Insertar producto 3
INSERT INTO producto (nombre, descripcion, categoria, precio, cantidad_en_stock, materia_prima_id, tipo_producto_id)
VALUES ('Pastel de Chocolate', 'Delicioso pastel de chocolate', 'Pasteles', 24.99, 10, 4, 3);

-- Insertar producto 4
INSERT INTO producto (nombre, descripcion, categoria, precio, cantidad_en_stock, materia_prima_id, tipo_producto_id)
VALUES ('Licuado de Fresa-Banana', 'Licuado refrescante de fresa y banana', 'Licuados', 5.99, 40, 3, 2);
