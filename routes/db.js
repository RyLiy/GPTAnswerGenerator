require("dotenv").config();
var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const app = express();


// Connection URL
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const dbName = 'ChatGPT_Evaluation';


//Connecting to Server
client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);


router.get("/", (request, response) => {
    response.send(router.stack);
});


//Post Method
router.post('/post', (req, res) => {
    res.send('Post API')
})

//Get all Method
router.get('/:collection', async (req, res) => {
    try {
        const collection = db.collection(req.params.collection);
        const findResult =  await collection.find({}).toArray();
        res.send(findResult);
        
    }
    catch (error) {
        res.send(error);
    }

})
//Computer_security

//Get by ID Method
router.get('/:collection/:id', async (req, res) => {
    
    const collection = db.collection(req.params.collection);
    var skipDocs = req.params.id - 1;
    
    res.send (await collection.findOne({}, { skip: skipDocs, limit: 1}));

    
})

//Update by ID Method
router.patch('/:collection/:id', async (req, res) => {
    var skipDocs = req.params.id - 1;
    await db.collection(req.params.collection).updateOne(
        { skip: skipDocs, limit: 1 },
        {
          $set: { 'gpt3': 'Blah, a great many words'},
          $currentDate: { lastModified: true }
        }
      );
    console.log (`Updated #${req.params.id} document`);
    res.send(await collection.findOne({}, { skip: skipDocs, limit: 1}))
})

//Delete by ID Method -  not really needed 
// router.delete('/delete/:id', (req, res) => {
//     res.send('Delete by ID API')
// })


module.exports = router;