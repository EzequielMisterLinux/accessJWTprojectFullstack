import express from 'express';
import connectDB from './database/mongodb.js';
import rutas from './routes/UserRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const server = express();

server.use(cors());

const PORT = process.env.PORT || 3000;

connectDB();
server.use(express.json());



server.use('/api', rutas);




server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
