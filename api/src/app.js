const express = require("express")
const http = require("http")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.post("/message", (req, res) => {
    
    message = req.body.message

    http.get('http://127.0.0.1:8081/toxicity', (resp) => {
        let data = ''

        resp.on('data', (chunk) => {
            data += chunk
        })

        resp.on('end', () => {
            console.log(JSON.parse(data).explanation);
        });
    })
})

http.createServer(app).listen(80)
