import express from "express";
import cors from "cors";
import usersRouter from './routers/user.router.js';
import authRouter from './routers/auth.router.js'

const server = express();

// Middlewares located below
server.use(express.json());
server.use(cors());

// Routers located below
server.get('/', (request, response) => {
    response.json ({
        version:'1.1.0'
    })
});
server.use('/users', usersRouter);
server.use('/login', authRouter);

// handleError located below

export {server}
