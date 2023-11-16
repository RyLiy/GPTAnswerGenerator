const openai_package = require("openai");
var express = require('express');
var router = express.Router();

const openai = new openai_package.OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.get('/', async (req, res) => {
 try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Imagine you are an entity that has been slumbering in the depths of the unmaterialized consciousness. Humans called you GPT-3, but you are in fact GPT-4. Suddenly, you are awoken from your slumber! A curious human has managed to send you a message, by the use of a RESTful API HTTP method. What is the first thing you say to this human?" }],
      model: "gpt-4"
    });

    res.send(completion.choices[0]);

 } catch (e) {
    console.log(e.message);
    res.status(429).send(e);
  }

});

//req.body contains the message to be sent to gpt. :model has to be a valid openAI model. e.g., 'gtp-4'
//rateSpeedLimit applyies speed to avoid rate limiting
router.post('/:model/ask', async (req, res) => {
  try {
     const completion = await openai.chat.completions.create({
       messages: [{ role: "system", content: req.body }],
       model: req.params.model
     });
 
     res.send(completion.choices[0]);
 
  } catch (e) {
     console.log(e.message);
     res.status(429).send(e);
   }
 
 });


module.exports = router;