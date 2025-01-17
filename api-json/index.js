const express = require('express');
const { urlencoded, json } = require('express');
const router = require('./routes/signos.routes.js');
const cors = require('cors');
app.use(cors({ origin: '*' }));

const app = express();

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors())

app.get('/', async (req, res) => {
    res.rend("Horoscopo Back Allrg");
});

app.use('/v1/signos', router);

app.listen(4000, () => {
    console.log('listening at port 4000');
})