const express = require('express');
const bodyparser = require('body-parser');
const api = require('./scr/api')

const app = express();
const PORT = 4000;


app.use(bodyparser.json());
app.use('/api/v1', api)

app.listen(PORT, ()=>
console.log(`server is on ${PORT}`))