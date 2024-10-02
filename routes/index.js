const express = require('express');
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');

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

routes.get('/connect', async (req, res) => {
  await AuthController.getConnect(req, res);
});

routes.get('/disconnect', async (req, res) => {
  await AuthController.getDisconnect(req, res);
});

routes.get('/users/me', async (req, res) => {
  await UsersController.getMe(req, res);
});

module.exports = routes;
