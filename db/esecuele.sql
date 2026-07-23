-- BASE DE DATOS LEFONDE
CREATE DATABASE lefonde;
-- BASE DE DATOS LEFONDE

-- TABLA USUARIOS
CREATE TABLE
    lefonde.usuarios (
        idusuario INT NOT NULL AUTO_INCREMENT
        nivel INT NOT NULL,
        nombre VARCHAR(45) NOT NULL,
        apellido VARCHAR(45) NULL,
        puesto VARCHAR(45) NOT NULL,
        contraseña VARCHAR(100) NOT NULL,
        PRIMARY KEY (idusuario)
    );
-- TABLA USUARIOS

-- TABLA MESA
CREATE TABLE
    lefonde.mesa (
        idmesa INT NOT NULL AUTO_INCREMENT
        numero INT NOT NULL,
        estado BOOLEAN NOT NULL,
        PRIMARY KEY (idmesa)
    );
-- TABLA MESA

-- TABLA PRODUCTOS
CREATE TABLE
    lefonde.productos (
        idproducto INT NOT NULL AUTO_INCREMENT
        nombre VARCHAR(45) NOT NULL,
        precio DECIMAL(10, 2) NOT NULL,
        descripcion varchar(100) NULL,
        categoria VARCHAR(45) NULL,
        PRIMARY KEY (idproducto)
    );
-- TABLA PRODUCTOS

-- TABLA ORDENES
CREATE TABLE
    lefonde.ordenes (
        idorden INT NOT NULL AUTO_INCREMENT
        idmesa INT NOT NULL,
        idusuario INT NOT NULL,
        fecha TIMESTAMP NOT NULL,
        hora TIME NOT NULL,
        finalizada BOOLEAN NOT NULL,
        notificacion BOOLEAN NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        PRIMARY KEY (idorden),
        FOREIGN KEY (idmesa) REFERENCES lefonde.mesa(idmesa),
        FOREIGN KEY (idusuario) REFERENCES lefonde.usuarios(idusuario)
    );
-- TABLA ORDENES

-- TABLA DETALLE DE ORDENES
CREATE TABLE
    lefonde.detalle (
        iddetalle INT NOT NULL AUTO_INCREMENT
        idorden INT NOT NULL,
        idproducto INT NOT NULL,
        cantidad INT NOT NULL,
        precio DECIMAL(10, 2) NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        PRIMARY KEY (iddetalle),
        FOREIGN KEY (idorden) REFERENCES lefonde.ordenes(idorden),
        FOREIGN KEY (idproducto) REFERENCES lefonde.productos(idproducto)
    );
-- TABLA DETALLES DE ORDENES

-- TABLA PAGOS
CREATE TABLE
    lefonde.pagos (
        idpago INT NOT NULL AUTO_INCREMENT
        idorden INT NOT NULL,
        fecha TIMESTAMP NOT NULL,
        hora TIME NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        tipo_pago VARCHAR(45) NOT NULL,
        PRIMARY KEY (idpago),
        FOREIGN KEY (idorden) REFERENCES lefonde.ordenes(idorden)
    );
-- TABLA PAGOS