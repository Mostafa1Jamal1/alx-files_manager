const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    this.dbName = process.env.DB_DATABASE || 'files_manager';

    this.client = new MongoClient(`mongodb://${host}:${port}`);
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const db = this.client.db(this.dbName);
    const users = await db.collection('users').countDocuments();
    return users;
  }

  async nbFiles() {
    const db = this.client.db(this.dbName);
    const files = await db.collection('files').countDocuments();
    return files;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
