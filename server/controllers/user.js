import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

export const register = (req, res) => {
    const q = "SELECT * FROM tab_usuario WHERE txt_email_usuario = ? OR txt_usuario = ?";

    db.query(q, [req.body.txt_email_usuario, req.body.txt_usuario], (error, data) => {
        if (error) return res.json(error);
        if (data.length) return res.status(409).json('Usuario já possui cadastrado');

        //hash password
        const hashPassword = crypto.createHash('md5').update(req.body.txt_senha).digest('hex');

        const q = "INSERT INTO tab_usuario(`txt_email_usuario`, `txt_usuario`, `txt_senha`) VALUES (?)";

        const values = [
            req.body.txt_email_usuario,
            req.body.txt_usuario,
            hashPassword
        ];

        db.query(q, [values], (error, data) => {
            if (error) return res.json(error);
            return res.status(200).json("Usuario Cadastrado!");
        });
    });
};

export const login = (req, res) => {
    const q = `SELECT ud.txt_nome_completo, u.txt_email_usuario, u.idTipoUsuario, u.cod_usuario, u.txt_senha, ud.bln_sexo
                FROM tab_dados_usuario as ud, tab_usuario as u
                WHERE u.txt_email_usuario = ? or u.txt_usuario = ? and ud.cod_usuario = u.cod_usuario`;

    db.query(q, [req.body.txt_usuario, req.body.txt_usuario], (error, data) => {
        if (error) return res.json(error);
        if (data.length === 0) return res.status(404).json('Usuario não encontrado');

        const hashPassword = crypto.createHash('md5').update(req.body.txt_senha).digest('hex');

        if (hashPassword !== data[0].txt_senha) return res.status(400).json("Usuario ou senha incorretos");

        const token = jwt.sign({
            id: data[0].cod_usuario
        }, process.env.JWTPRIVATEKEY, { expiresIn: "12h" });

        const { txt_senha, ...user } = data[0];

        res
            .cookie('access_token', token, {
                httpOnly: true, 
                sameSite: 'None', 
                secure: true, 
                maxAge: 24 * 60 * 60 * 1000
            })
            .status(200)
            .json(user);

    });
}

export const getUser = (req, res) => {
    const q = `SELECT ud.txt_nome_completo,  ud.txt_endereco ,  ud.txt_bairro ,  c.cidade ,  e.nome ,  
            ud.txt_celular , ud.txt_cpf ,  ud.dte_nascimento , ud.txt_nome_pai , ud.txt_nome_mae ,  
            ec.dsc_estado_civil ,  ud.txt_observacao ,  ud.bln_sexo ,  ig.nomeIgreja ,  ud.outraIgreja ,  ud.bln_recebe_email
            FROM tab_dados_usuario as ud, cidade as c, estado as e, opc_estado_civil as ec, igreja as ig
            WHERE ud.cod_usuario = ? and ud.idCidade = c.idCidade and ud.idEstado = e.idEstado and 
            ud.cod_estado_civil = ec.cod_estado_civil and ud.idIgreja = ig.idIgreja`;

    db.query(q, [req.params.id], (error, data) => {
        if (error) return res.json(error);

        return res.status(200).json(data);
    });
};