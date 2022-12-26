const express = require('express')
const app = express()
const port = 5000


const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://sw-lee:8479@cluster0.7axgnk7.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=> console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!~~안녕하세요'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

0