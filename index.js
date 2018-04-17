
const getForecast = require('./forecast/forecast');
const express = require('express');
const Promise = require('es6-promise').Promise;

const app = express();

const PORT = 3000;

let person = {
    name: "Sasha",
    age: 25
}

let str = JSON.stringify(person, undefined, 2);
console.log(str);


console.log('Promise start');

let data = 1;
let firstPromise = new Promise((resolve, reject) => {
    if(data){
        resolve('resolve');
    }
    else{
        reject('reject');
    }
});

firstPromise
.then(data => {
    return 'promise ' + data;
}, data => {
    return 'promise ' + data;
}).then(data => {
    console.log(data);
}, data => {
    console.log(data);
});


console.log('Promise with reject');

let rejectPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject (new Error ('Failed promise')), 100);
    setTimeout(() => resolve('Ignored'), 200);
});

rejectPromise
.then(
    result => console.log(result), 
    error => console.log(error) 
  ); 


getForecast().then( response => {
    console.log(response.data);
});

app.use(express.static(__dirname + '/frontend'));

app.get('/get-user/:id', (req, res) => {
    let id = req.params.id;
    console.log(`User requested ${id}`);
    res.status(200).send(JSON.stringify({
        "status": "approved",
        "id": id
    }));

});

app.get('/get-goods/:type/:ordering', (req, res) => {
    let type = req.params.type;
    if(type !== 'phones'){
        res.sendStatus(400);
    }
    else{
        res.send(JSON.stringify(`Type of requested goods ${type}`));
    }
});

app.get('/get-goods/', (req, res) => {
    let good = req.query.good;
    let ordering = req.query["price-order"];

    if(!good || !ordering){
        res.sendStatus(404);
        }
    res.send(JSON.stringify(`Type of requested goods ${good}, price-order ${ordering}`));
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

