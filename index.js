const express = require('express')
const resources = require('./videos.json')
const stress = require('./stress.json')
const { Scrap } = require('./news.js')
const quote = require('./quotes.json')
const app = express();

const scrap = new Scrap()

function sendRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomItem = array[randomIndex];
    return randomItem
}

app.get('/', (req, res) => {
   res.send(sendRandomItem(quote))
})


app.get('/mentalhealth', (req, res) => {
    res.send(stress)
})

app.get('/resources', (req, res) => {
    res.send(resources)
})


app.get('/tech', async (req, res) => {
    res.send(await scrap.latest())

})

app.get('/ai', async (req, res) => {
    res.send(await scrap.latest('ai'))

})

app.get('/crypto', async (req, res) => {
    res.send(await scrap.latest('crypto'))

})



app.listen(3000)