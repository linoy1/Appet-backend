const { Router } = require('express');
const { userController } = require('../controllers/userController');
const userRouter = new Router();

userRouter.post('/login', userController.login);
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.addUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.get('/:id/dogs', userController.getAllDogs);
userRouter.get('/:id/myInterests', userController.myInterests);
userRouter.get('/:id/dogs/:dogId', userController.getDogById);
userRouter.put('/:id/dogs/:dogId/startAdoption', userController.startAdoption);
userRouter.put(
    '/:id/dogs/:dogId/completeAdoption',
    userController.completeAdoption
);
userRouter.put(
    '/:id/dogs/:dogId/cancelAdoption',
    userController.cancelAdoption
);

module.exports = { userRouter };