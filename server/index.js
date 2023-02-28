import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRouter from './routes/events.js';
import userRouter from './routes/users.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/events', eventRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Conectado ao servidor!");
});