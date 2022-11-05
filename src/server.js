import express from "express";
import cors from "cors"


const server = express()
// middlewares
server.use(express.json())
server.use(cors())

// aqui irán los routers
server.get('/', (request, response) => {
    response.json ({
        version:'1.1.0'
    })
} )

// handleError

export {server}

