import express from 'express';
import UserController from '../controller/userController';

const userRoute = express.Router();

const userController = new UserController();

userRoute.get('/', userController.userByEmail);

userRoute.get('/:id', userController.userById);

userRoute.post('/create', userController.createUser);

export default userRoute;
