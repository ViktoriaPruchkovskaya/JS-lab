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

})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

