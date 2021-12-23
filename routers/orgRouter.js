const { Router } = require('express');
const { orgController } = require('../controllers/orgController');
const orgRouter = new Router();

orgRouter.post('/login', orgController.login);
orgRouter.get('/', orgController.getOrgs);
orgRouter.get('/:id', orgController.getOrgById);
orgRouter.post('/', orgController.addOrg);
orgRouter.put('/:id', orgController.updateOrg);
orgRouter.delete('/:id', orgController.deleteOrg);
orgRouter.get('/:id/dogs', orgController.getDogs);
orgRouter.post('/:id/dogs', orgController.addDog);
orgRouter.get('/:id/dogs/:dogId', orgController.getDogById);
orgRouter.delete('/:id/dogs/:dogId', orgController.deleteDog);
orgRouter.put('/:id/dogs/:dogId', orgController.updateDog);

module.exports = { orgRouter };