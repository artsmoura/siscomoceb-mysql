import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Auth = (req, res, next) => {
    try {
        const token = req.cookies.access_token
        const user = jwt.verify(token, process.env.JWTPRIVATEKEY)
        req.userId = user.id
        next();        
    } catch (error) {
        console.log('entrou aqui?')
        res
            .clearCookie('access_token')
            .status(400)
            .redirect("http://localhost:5173/login")
    }
};