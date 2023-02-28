import express from "express";
import { getUser, login, register } from '../controllers/user.js';

const router = express.Router();

router.get('/:id', getUser);
router.post('/login', login);
router.post('/register', register);

export default router;