const key = require('./authen.js')
const express = require('express')
const app = express()
const port = 3000

async function gg(){
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: key,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Hello world",
  });
  console.log(completion.data.choices[0].text);
  
}
app.get('/', (req, res) => {
  res.send('Hello World!')
  gg();
})



app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})