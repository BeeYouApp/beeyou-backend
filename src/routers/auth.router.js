import express from 'express';
import * as authUseCases from '../useCases/auth.use.js';

const router = express.Router();

router.post('/user', async (request, response, next) => {
    try {
        const {email, password} = request.body;
        const token = await authUseCases.loginUser(email, password);
        response.json({
            success: true,
            token
        });
    } catch (error) {
        response.status(400);
        next(error);
    }
})

router.post('/company', async (request, response, next) => {
    try {
        const {email, password} = request.body;
        const token = await authUseCases.loginCompany(email, password);
        response.json({
            success: true,
            token
        });
    } catch (error) {
        response.status(400);
        next(error);
    }
})

export default router
