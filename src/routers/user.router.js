import express from 'express';
import * as userUseCases from '../useCases/user.use.js';
import { auth } from '../middlewares/auth.js'; // Auth
import { StatusHttp } from '../libs/statusHttp.js'; // StatusHttp


const router = express.Router();
// Endpoint -> Use cases -> Models

// GET/users
router.get('/', async (request, response, next) => {
    try {
        console.log('hola')
        let allUsers;
        const page = request.query.page;
        const limit = request.query.limit;
        if(page && limit) {
            allUsers = await userUseCases.getAllByPage(page, limit);
        } else {
            allUsers = await userUseCases.getAll();
        }
        response.json({
            success: true,
            data: allUsers
        })
    } catch (error) {
        next(new StatusHttp(error.message, error.status, error.name));
    }
});

// GET/users/:id
router.get('/:id', auth, async (request, response, next) => {
    try {
        const {id} = request.params;
        let user = await userUseCases.getById(id);
        if(!user) user = {}
        response.json({
            success: true,
            data: user
        });
    } catch (error) {
        next(new StatusHttp(error.message, error.status, error.name));
    }
});

// POST/users/
router.post('/', async (request, response, next) => {
    try {
       const {body: newUser} = request; // const newUser = request.body;
       await userUseCases.create(newUser);
       
       response.json({
        success: true,
        message: '¡Usuario creado!'
       });
    } catch (error) {
        next(new StatusHttp(error.message, error.status, error.name));
    }
});

// PATCH/users/:id
router.patch('/:id', auth, async (request, response, next) => {
    try {
        const {id} = request.params;
        const {body} = request;
        await userUseCases.update(id, body);

        response.json({
            success: true,
            message: '¡User actualizado!'
        });
    } catch (error) {
        next(new StatusHttp(error.message, error.status, error.name));
    }
});

// DELETE/users/:id
router.delete('/:id', auth, async (request, response, next) => {
    try {
        const { id } = request.params;
        await userUseCases.deleteById(id);

        response.json({
            success: true,
            message: '¡User eliminado!'
        });
    } catch (error) {
        next(new StatusHttp(error.message, error.status, error.name));
    }
});

export default router 