const sha1 = require('sha1');
const { v4: uuidv4 } = require('uuid');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class AuthController {
  static async getConnect(req, res) {
    const [authScheme, authParam] = req.header('authorization').split(' ');
    if (authScheme === 'Basic') {
      const [email, password] = Buffer.from(authParam, 'base64').toString().split(':');
      const user = await dbClient.db.collection('users').findOne({ email });
      if (user && user.password === sha1(password)) {
        const token = uuidv4();
        await redisClient.set(`auth_${token}`, user._id.toString(), 60 * 60 * 24);
        return res.status(200).send({ token });
      }
    }
    return res.status(401).send({ error: 'Unauthorized' });
  }

  static async getDisconnect(req, res) {
    const token = req.header('X-Token');
    const id = await redisClient.get(`auth_${token}`);
    if (!id) return res.status(401).send({ error: 'Unauthorized' });
    await redisClient.del(`auth_${token}`);
    return res.status(204).send({});
  }
}

module.exports = AuthController;
