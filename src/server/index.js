const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')

const app = express()

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)

// API
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
console.log(`API Key is ${process.env.API_KEY}`);
let userUrl = []

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/postData', async function(req, res) {
    userUrl = req.body.url;
    const meaningUrl = `${baseURL}key=${apiKey}&url=${userUrl}&lang=en`

    const response = await fetch(meaningUrl)
    const allData = await response.json()
    console.log(allData)
    res.send(allData)

})

// Port that listens to incoming events
app.listen(8000, function () {
    console.log('App listening on port 8000')
})