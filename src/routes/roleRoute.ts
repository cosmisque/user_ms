import express from 'express';
import RoleController from '../controller/roleController';

const roleRoute = express.Router();

const roleController = new RoleController();

roleRoute.put('/', roleController.updateRole);
roleRoute.post('/', roleController.createRole);
roleRoute.get('/user/:userId', roleController.getRole);

export default roleRoute;
