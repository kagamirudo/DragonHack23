const key = require('./authen.js')
const express = require('express')
const app = express()
const port = 3000

async function gg(prompt = "Hello world"){
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: key,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
  });
  console.log(completion.data.choices[0].text);
  
}
app.get('/', (req, res) => {
  res.sendFile( __dirname + "/" + "index.html" );
  
})

app.get('/process_get', function (req, res) {
  // Prepare output in JSON format
  response = {
    ingredients:req.query.ingredients    
  };
  console.log(response);
  res.end(JSON.stringify(response));
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})