import express from 'express';
import { registerUser, loginUser } from './auth.controller.js';

const router = express.Router();

// Ruta para registro de usuario
router.post('/register', registerUser);

// Ruta para login de usuario
router.post('/login', loginUser);

export default router;
