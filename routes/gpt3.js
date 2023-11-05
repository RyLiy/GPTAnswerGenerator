var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.send("Getting GPT3 index");
});


module.exports = router;