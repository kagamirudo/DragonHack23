const key = require('./authen.js')
const express = require('express')
const app = express()
const port = 80

async function gg() {
    // console.log(key["key"])
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
        apiKey: key["key"],
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Hello world",
    });
    
    console.log(completion.data.choices);

}
app.get('/', (req, res) => {
    res.send('Hello World!')
    gg();
})





app.listen(port,"10.250.39.73")