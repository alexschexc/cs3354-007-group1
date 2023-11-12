const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

var _db;
 
module.exports = {
  connectToServer: async function run() {
    await client.connect();

    _db = client.db("WorkFlow");

    if (_db) {
      console.log("Connected to Database.");
    }
  },

  getDb: function () {
    return _db;
  },
};