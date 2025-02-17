import jwt from 'jsonwebtoken';

// Función para generar el JWT
export const generarJWT = (uid = ' ', expiresIn = '1h') => {
    return new Promise((resolve, reject) => {
        // Payload del JWT
        const payload = { uid };

        // Generando el JWT
        jwt.sign(
            payload, // Datos que queremos incluir en el token (en este caso el uid)
            process.env.SECRETORPRIVATEKEY, // Clave secreta que usaremos para firmar el token
            {
                expiresIn // Tiempo de expiración del token. Puede ser un valor por defecto ('1h') o uno pasado como argumento.
            },
            (err, token) => {
                // Manejo de errores en caso de que ocurra algo durante la firma
                if (err) {
                    console.error(err); // Imprimir error en consola
                    return reject(new Error('No se pudo generar el token')); // Rechazar la promesa con un mensaje de error
                }
                
                // Si todo es correcto, resolver la promesa con el token generado
                resolve(token);
            }
        );
    });
}
