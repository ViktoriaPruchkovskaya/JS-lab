const getForecast = require('./forecast/forecast');
const express = require('express');

const app = express();

const PORT = 3000;

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

