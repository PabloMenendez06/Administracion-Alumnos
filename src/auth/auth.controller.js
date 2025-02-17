import bcrypt from 'bcryptjs';
import User from '../users/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';

// Registro de usuario
export const registerUser = async (req, res) => {
    const { name, surname, username, email, password, phone, rol } = req.body;

    try {
        // Verificar si el correo ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Crear nuevo usuario
        const newUser = new User({
            name,
            surname,
            username,
            email,
            password: hashedPassword,
            phone,
            rol,
        });

        // Guardar el usuario
        await newUser.save();

        // Generar el JWT
        const token = await generarJWT(newUser._id);

        // Responder con el token y los datos del usuario
        res.status(201).json({
            user: newUser,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
};

// Login de usuario
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        // Verificar si la contraseña es correcta
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        // Generar JWT
        const token = await generarJWT(user._id);

        // Responder con el token
        res.status(200).json({
            user,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};
