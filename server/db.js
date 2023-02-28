import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const db = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
    } else {
        console.log('Conectado ao Banco!');
    }
});