import connection from './db/db.mjs';

export async function obtenerTipoProducto(callback) {
    try {
        const [results] = await connection.query('SELECT * from tipo_producto');
        if (results.length === 0) {
          throw new Error('El tipo de producto no fue encontrado');
        }
        //console.log(results);
        callback(null, results);
      } catch (error) {
        callback(error, null);
      }
}

export async function obtenerProductosCatalogo(callback) {
  try {
      const [results] = await connection.query('SELECT * from producto');
      if (results.length === 0) {
        throw new Error('');
      }
      //console.log(results);
      callback(null, results);
    } catch (error) {
      callback(error, null);
    }
}


export async function newUser(nombre, apellido, Correo, contrasenia, telefono, fechaNacimiento) {
  try {
    await connection.query('BEGIN'); // Inicia la transacción

    // Inserta el nuevo Usuario en la tabla Usuario
    await connection.query('INSERT INTO Cliente(correo, nombre, apellido , contrasenia, telefono, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?)', [Correo,nombre, apellido, contrasenia, telefono, fechaNacimiento]);

    await connection.query('COMMIT'); // Confirma la transacción
    console.log('Registro exitoso');
  } catch (error) {
    await connection.query('ROLLBACK'); // Revierte la transacción en caso de error
    console.error('Error en el registro:', error.message);
  }
}
