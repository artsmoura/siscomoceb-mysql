import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = (req, res) => {
    const q = "SELECT * FROM tab_usuario WHERE txt_email_usuario = ? OR txt_usuario = ?";

    db.query(q, [req.body.txt_email_usuario, req.body.txt_usuario], (error, data) => {
        if (error) return res.json(error);
        if (data.length) return res.status(409).json('Usuario já possui cadastrado');

        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.txt_senha, salt);

        const q = "INSERT INTO tab_usuario(`txt_email_usuario`, `txt_usuario`, `txt_senha`) VALUES (?)";

        db.query(q, [values], (error, data) => {
            if (error) return res.json(error);
            return res.status(200).json("Usuario Cadastrado!");
        });
    });
};

export const login = (req, res) => {
    const q = "SELECT * FROM tab_usuario WHERE txt_email_usuario = ? OR txt_usuario = ?";

    db.query(q, [req.body.txt_email_usuario, req.body.txt_usuario], (error, data) => {
        if (error) return res.json(error);
        if (data.length === 0) return res.status(404).json('Usuario não encontrado');

        const checkPassword = bcrypt.compare(req.body.txt_senha, data[0].txt_senha);

        if (!checkPassword) return res.status(400).json("Usuario ou senha incorretos");

        const token = jwt.sign({
            id: data[0].cod_usuario
        }, process.env.JWTPRIVATEKEY, { expiresIn: "12h" });

        const { txt_senha, ...other } = data[0];

        res
            .cookie('access_token', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
            .status(200)
            .json(other);

    });
};

export const getUsers = (_, res) => {

};