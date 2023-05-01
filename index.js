const express = require('express');
const BodyParser = require("body-parser");
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require("mongodb").ObjectID;
const app = express();
const port = 8000;

const CONNECTION_URL = "mongodb+srv://user:123@cluster0.jbabamn.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_NAME = "Mydb";

var database, collection;
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const client = new MongoClient(CONNECTION_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
     await client.connect();
        database = client.db(DATABASE_NAME);
        collection = database.collection("users");
        console.log("Connected to `" + DATABASE_NAME + "`! You successfully connected to MongoDB!");
        
  } catch (err) {
    console.log(err.stack);
  } 
}

app.listen(port, () => {
    run();
});



// create
app.post('/create', async (req, res) => {
    try {
        const result = await collection.insertOne(req.body);
        res.json(result);
      } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message: err.message });
      }
  });
  
  // read all
  app.get('/', async (req, res) => {
    try {
        const result = await collection.find().toArray();
        res.json(result);
      } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message: err.message });
      }
  });
  
   
  // update
  app.put('/update/:id', async (req, res) => {
    try {
        const result = await collection.updateOne({ _id: req.params.id }, { $set: req.body });
        res.json(result);
      } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message: err.message });
      }
  });
  
  // delete
  app.delete('/delete/:id', async (req, res) => {
    try {
        const result = await collection.deleteOne({ _id: req.params.id });
        res.json(result);
      } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message: err.message });
      }
  });