const express = require('express');
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');

const routes = express.Router();
routes.use(express.json());

routes.get('/status', async (req, res) => {
  res.send(await AppController.getStatus());
});

routes.get('/stats', async (req, res) => {
  res.send(await AppController.getStats());
});

routes.post('/users', async (req, res) => {
  await UsersController.postNew(req.body, res);
});

module.exports = routes;
