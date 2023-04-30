<<<<<<< HEAD
=======
const key = require('./authen.js')
>>>>>>> 97317e051e89bc4def698f225fa4da2f7a62a486
const express = require('express')
const app = express()
const port = 3000

async function gg() {
    const { Configuration, OpenAIApi } = require("openai");

<<<<<<< HEAD
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Hello world",
    });
    console.log(completion.data.choices[0].text);
=======
  const configuration = new Configuration({
    apiKey: key,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Hello world",
  });
  console.log(completion.data.choices[0].text);
  
>>>>>>> 97317e051e89bc4def698f225fa4da2f7a62a486
}
app.get('/', (req, res) => {
    res.send('Hello World!')
    gg();
})



app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})