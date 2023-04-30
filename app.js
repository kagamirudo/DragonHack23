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
        temperature: 1.0,
        model: "text-davinci-003",
        max_tokens: 1000,
        prompt: input,
    });

    let res = completion.data.choices[0].text;
    // while (res.replace("\n", '') != res) {
    //     res = res.replace("\n", '')
    // }
    res = res.replace("\n", '')
    res = res.replace("\n", '')
    console.log("res:", res);
    return res;
}

function validation(rep) {
    // if (rep[0] == "Y") {
    //     return
    // } else {
    //     return false;
    // }
    return rep
}

function response(input) {
    let rep
    let promise = new Promise(function(resolve, reject) {
        rep = get_gpt(input);
        resolve(rep);
        reject("Not Response");
    });
    promise.then(
        function(value) { return value },
        function(error) { console.log("eee", error) }
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
    let instruction = "Give me a list of recipes with this ingredients: '";
    instruction += list;
    instruction += "' and calculate the calories."
    instruction += " No need to use them all."
    console.log(instruction)
    let meal = response(instruction);
    return meal
}

app.get('/', (req, res) => {
    res.send('Hello World!')
    let str = "salmon, rice, eggs, bacon";
    // if (food_check(str)) {
    console.log("ssss", get_recipe(str))
        // }
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})