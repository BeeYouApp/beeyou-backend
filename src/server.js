import express from "express";
import cors from "cors";

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

// handleError located below

export {server}
