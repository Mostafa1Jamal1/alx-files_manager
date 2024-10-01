const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class AppController {
  static async getStatus() {
    return {
      redis: await redisClient.isAlive(),
      db: await dbClient.isAlive(),
    };
  }

  static async getStats() {
    return {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
  }
}

module.exports = AppController;
