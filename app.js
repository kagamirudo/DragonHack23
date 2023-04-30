const key = require('./authen.js')
const express = require('express')
const app = express()
const port = 80
// const port = 3000

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
    var input = "Are '" + str;
    input += "' good for human consumption?";
    input += "Say only y/n.";
    return input
}

function get_prompt(list){
    let instruction = "Give me a list of dishes with these ingredients: '";
    instruction += list;
    instruction += "' and calculate the calories of each dish."
    instruction += " No need to use them all. Present in list of json object {name: ,ingredient: ,calories:}."
    return instruction
}

function get_recipe(list) {
    let instruction = "Give me a list of dishes with these ingredients: '";
    instruction += list;
    instruction += "' and calculate the calories of each dish."
    instruction += " No need to use them all. Present as javascript list of json object with keys: name, ingredient and calories."
    console.log(instruction)
    let meal = response(instruction);
    // return meal
}


app.get('/run', (req, res) => {
    res.send('Hello World!')
    let str = "salmon, rice, eggs, bacon";
    // if (food_check(str)) {
    console.log("ssss", get_recipe(str))
        // }
})

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/process_get', async function (req, res) {
// res.sendFile( __dirname + "/" + "index.html" );
    list = { ingredient: req.query.ingredients},
    console.log(typeof(list["ingredient"]));
    // let str = "salmon, rice, eggs, bacon";
    // console.log(str, typeof(str))
    let prompt = get_prompt(list["ingredient"])
    let good = await get_gpt(food_check(list["ingredient"]))
    if (good[0] == "N"){
        res.status(200).send(list["ingredient"]+" contains stuff not for human consumption")    
    } else {
        result = await get_gpt(prompt)
        // get_recipe(list["ingredient"])
        let data = JSON.parse(JSON.stringify(result))
        console.log(typeof(data))
        // for (let i = 0; i<data.length; i++){
        //     res.status(200).send("result a: "+data[i])    
        // }
        res.status(200).send("result: "+JSON.parse(JSON.stringify(result)))
        // res.status(200).send(JSON.stringify(list));
    }
    
    // console.log("succ")
})



app.listen(port,"10.250.39.73")
// app.listen(port, () => {
//     console.log(`Example app listening on http://localhost:${port}`)
// })
