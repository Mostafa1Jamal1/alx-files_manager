const express = require('express');
const AppController = require('../controllers/AppController');

const routes = express.Router();

routes.get('/status', async (req, res) => {
  res.send(await AppController.getStatus());
});

routes.get('/stats', async (req, res) => {
  res.send(await AppController.getStats());
});

module.exports = routes;
