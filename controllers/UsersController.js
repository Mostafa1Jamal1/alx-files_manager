const sha1 = require('sha1');
const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class UsersController {
  static async postNew(data, res) {
    const { email, password } = data;
    if (!email) return res.status(400).send({ error: 'Missing email' });

    if (!password) return res.status(400).send({ error: 'Missing password' });

    const user = await dbClient.db.collection('users').findOne({ email });
    if (user) return res.status(400).send({ error: 'Already exist' });

    const hashedPassword = sha1(password);

    await dbClient.db.collection('users').insertOne({ email, password: hashedPassword },
      (error, result) => {
        if (error) return res.status(500).send({ error });

        return res.status(201).send({ id: result.insertedId, email });
      });
    return true;
  }

  static async getMe(req, res) {
    const token = req.header('X-Token');
    const id = await redisClient.get(`auth_${token}`);
    const user = await dbClient.db.collection('users').findOne({ _id: ObjectId(id) });
    if (!user) return res.status(401).send({ error: 'Unauthorized' });
    return res.status(200).send({ id: user._id, email: user.email });
  }
}

module.exports = UsersController;
