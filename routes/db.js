var express = require('express');
var router = express.Router();
const { MongoClient, ObjectId  } = require('mongodb');
const app = express();


// Connection URL
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const dbName = 'ChatGPT_Evaluation';


//Connecting to Server
client.connect();
console.log("Connection to mongoDB server established.");
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
        const findResult = await collection.find({}).toArray();
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
    //var skipDocs = req.params.id - 1;
    // Get document based on position in DB collection
    //var document = await collection.findOne({}, { skip: skipDocs, limit: 1 })

    // Get document based on unique ID in DB
    var document = await collection.findOne({ _id: new ObjectId(req.params.id) })
   
    res.send(document);
})

// router.patch('/:collection/:id/:field', async (req, res) => {
//     var skipDocs = req.params.id - 1;
//     const collection = db.collection(req.params.collection);

//     // Find the nth document
//     var document = await collection.findOne({ _id: new ObjectId(req.params.id) });

//     //Get the id of the nth document
//     const filter = { _id: document._id };

//     var field = req.params.field;
//     console.log("Value of field in post body: " + req.body[field]);

//     //Set the field to be updated with a specific value in req body
//     var jsonDBFields = { };
//     jsonDBFields[field] = req.body[field];

//     const update = { $set: jsonDBFields };

//     //Perform the update.
//     await collection.updateOne(filter, update);

//     console.log(`Updated ${req.params.id}th document`);
//     var updateDoc = await collection.findOne({ _id: new ObjectId(req.params.id) })
//     res.send(updateDoc);
// })


router.patch('/:collection/:id/', async (req, res) => {
    var skipDocs = req.params.id - 1;
    const collection = db.collection(req.params.collection);

    // Find the nth document
    var document = await collection.findOne({ _id: new ObjectId(req.params.id) });

    //Get the id of the nth document
    const filter = { _id: document._id };


    const update = { $set: req.body };

    //Perform the update.
    await collection.updateOne(filter, update);

    console.log(`Updated ${req.params.id}th document`);
    var updateDoc = await collection.findOne({ _id: new ObjectId(req.params.id) })
    res.send(updateDoc);
})

//Delete by ID Method -  not really needed 
// router.delete('/delete/:id', (req, res) => {
//     res.send('Delete by ID API')
// })


module.exports = router;