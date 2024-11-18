const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGO_URI
//const uri = 'mongodb+srv://rafaelguerrero01:<db_password>@cluster0.4op3q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

const validatedb = async  () => {
    try {
      await  client.connect()
      console.log('Conexion a mongodb exitosa!');
    } catch (error) {
      console.error(error);
    }
}


validatedb();


module.exports = client;