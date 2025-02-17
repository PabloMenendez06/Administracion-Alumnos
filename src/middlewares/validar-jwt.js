import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {
    const token = req.header('x-token'); // Obtener el token del header

    if (!token) {
        return res.status(401).json({ message: 'No hay token en la solicitud' });
    }

    try {
        // Verificar el token y obtener el ID del usuario
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid; // Guardar el ID del usuario en la solicitud
        next(); // Continuar con la siguiente función
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido' });
    }
};
