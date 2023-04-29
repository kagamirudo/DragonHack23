

async function myFunction(){
    
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Hello world",
    });
    console.log(completion.data.choices[0].text); 
    console.log("asdasd")  
}


var express = require('express');
var app = express();

app.use(express.static('public'));

const hostname = '127.0.0.1';
const port = 3000;

app.get('/index.html', function (req, res) {
    res.send('Hello GET');
    res.sendFile("index.html");
 })

app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    // res.send('Hello GET');

    res.sendFile( __dirname + "/" + "index.html" );
 })

app.get("/run2", function (req, res) {
    console.log("Got a GET request for the homepage");
    myFunction()
    // res.send('Hello GET');

    // res.sendFile( __dirname + "/" + "index.html" );
 })

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});