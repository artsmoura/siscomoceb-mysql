import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRouter from './routes/events.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/events', eventRouter);

const PORT = process.env.PORT;

app.listen(PORT);