const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const port = 4000;

const uri = "mongodb+srv://voluenteer:voluenteer6060@cluster0.ok6kl.mongodb.net/volunteerNetwork?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(cors());
app.use(bodyParser.json());

//connecting mongo db server
client.connect(err => {
  const collection = client.db("volunteerNetwork").collection("event");
  console.log("database connected sucessfully");
  
  // Adding req data or registered data to the server
  app.post('/addRegisteredEvent', (req,res) => {
    const registeredEvent = req.body;
    collection.insertOne(registeredEvent)
    .then (result => {
      res.send(result.insertedCount > 0)
    })

  })

  // fetching data from mongodb 

  app.get('/events', (req,res) => {
    collection.find({email: req.query.email})
    .toArray((err, documents) => {
      res.send(documents);
    })
  });

  app.get('/users', (req,res) => {
    collection.find({})
    .toArray((err, documents) => {
      res.send(documents);
    })
  });

  // deleting the data from database
  app.delete('/delete/:id', (req,res) => {
    console.log(req.params.id);
  })

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
