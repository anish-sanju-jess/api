import express from 'express';
import resources from './videos.json' //assert { type: 'json' };
import stress from './stress.json' //assert { type: 'json' };
import { Scrap } from './news.js'
// const express = require('express')
// const resources = require('./videos.json')
// const stress = require('./stress.json')
// const { Scrap } = require('./news.js')
const app = express();

const scrap = new Scrap()


app.get('/', (req, res) => {
    fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
        .then(response => response.json())
        .then(data => {

            res.send(data);

        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal server error');
        });
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