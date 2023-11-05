var express = require('express');
var router = express.Router();

router.get("/", (request, response) => {
    response.send("I am alive.");
});


module.exports = router;