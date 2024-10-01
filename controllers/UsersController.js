const crypto = require('crypto');
const dbClient = require('../utils/db');

const sha1 = crypto.createHash('sha1');

class UsersController {
  static async postNew(data, res) {
    const { email, password } = data;
    if (!email) {
      res.status(400).send({ error: 'Missing email' });
      return;
    }
    if (!password) {
      res.status(400).send({ error: 'Missing password' });
      return;
    }
    const user = await dbClient.db.collection('users').findOne({ email });
    if (user) {
      res.status(400).send({ error: 'Already exist' });
      return;
    }
    const hashedPassword = sha1.update(password).digest('hex');
    await dbClient.db.collection('users').insertOne({ email, hashedPassword }, (error, result) => {
      if (error) {
        res.status(500).send({ error });
        return;
      }
      res.status(201).send({ id: result.insertedId, email });
    });
  }
}

module.exports = UsersController;
