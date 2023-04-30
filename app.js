const key = require('./authen.js')
const express = require('express')
const app = express()
const port = 3000

async function get_gpt(input) {
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
        apiKey: key["key"],
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
    });

    let res = completion.data.choices[0].text;
    while (res.replace("\n", '') != res) {
        res = res.replace("\n", '')
    }
    return res;
}

function validation(rep) {
    if (rep[0] == "Y") {
        return true;
    } else {
        return false;
    }
}

function response(input) {
    let rep
    let promise = new Promise(function(resolve, reject) {
        rep = get_gpt(input);
        resolve(rep);
        reject("Not Response");
    });
    promise.then(
        function(value) { validation(value) },
        function(error) { console.log(error) }
    ).catch(() => {
        console.log("Error thrown to catch!")
    });
}

function food_check(str) {
    var input = "Is a list '" + str;
    input += "' good for human consumption?";
    input += "Say only y/n.";
    if (response(input)) {
        return true;
    } else {
        return false
    }
}

function get_recipe(list) {
    let instruction = "Give me a recipe with this ingredients: '";
    instruction += list;
    instruction += "' and calculate the calories."
    console.log(instruction)
    let meal = response(instruction);
    return meal
}

app.get('/', (req, res) => {
    res.send('Hello World!')
    let str = "salmon, rice, eggs";
    // if (food_check(str)) {
    console.log(get_recipe(str))
        // }
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})