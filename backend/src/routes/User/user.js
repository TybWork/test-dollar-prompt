import express from 'express'
import { createUser, deleteUser, getUsers, singleUser, updateuser } from '../../controllers/User/user.controller.js';
export const route = express.Router();

route.post('/user/login', createUser);
route.get('/user/get', getUsers);
route.get('/user/get/:id', singleUser);
route.put('/user/update/:id', updateuser);
route.delete('/user/delete/:id', deleteUser);