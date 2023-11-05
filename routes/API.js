var express = require('express');
var router = express.Router();

router.get("/", (request, response) => {
    response.send("API list");
});


module.exports = router;