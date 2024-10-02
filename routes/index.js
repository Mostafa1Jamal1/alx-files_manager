const express = require('express');
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');
const FilesController = require('../controllers/FilesController');

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

routes.post('/files', async (req, res) => {
  await FilesController.postUpload(req, res);
});

routes.get('/files/:id', async (req, res) => {
  await FilesController.getShow(req, res);
});

routes.get('/files', async (req, res) => {
  await FilesController.getIndex(req, res);
});

routes.put('/files/:id/publish', async (req, res) => {
  await FilesController.putPublish(req, res);
});

routes.put('/files/:id/unpublish', async (req, res) => {
  await FilesController.putUnpublish(req, res);
});

routes.get('/files/:id/data', async (req, res) => {
  await FilesController.getFile(req, res);
});

module.exports = routes;
