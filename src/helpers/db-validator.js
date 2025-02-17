import mongoose from 'mongoose';
import Rol from '../rol/rol.model.js';
import User from '../users/user.model.js';

// Validar si el rol existe en la base de datos
export const esRolValido = async (rol = '') => {
    rol = rol.trim(); // Asegurarse de eliminar espacios extra
    const existeRol = await Rol.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe en la base de datos`);
    }
}

// Validar si el correo electrónico ya está registrado en la base de datos
export const existenteEmail = async (correo = '') => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Validación de correo
    if (!regex.test(correo)) {
        throw new Error('El correo no es válido');
    }

    const existeEmail = await User.findOne({ email: correo });

    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe en la base de datos`);
    }
}

// Validar si el ID del usuario existe en la base de datos
export const existeUsuarioById = async (id = '') => {
    const isValidId = mongoose.Types.ObjectId.isValid(id); // Validar formato de ID
    if (!isValidId) {
        throw new Error(`El ID ${id} no es válido`);
    }

    const existeUsuario = await User.findById(id);

    if (!existeUsuario) {
        throw new Error(`El ID ${id} no existe`);
    }
}
