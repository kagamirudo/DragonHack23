// import fetch from "node-fetch";

const fetch = require("node-fetch");

fetch('https://catfact.ninja/fact', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //     key1: 'value1',
        //     key2: 'value2'
        // })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))