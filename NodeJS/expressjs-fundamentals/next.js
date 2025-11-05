const express = require("express")

const app = express()

app.get('/next', (req, res, next) => {
    console.log('step-1') 
    next()}, 
(req, res, next) =>{ console.log('setp-2')
    next()
}, 
(req, res, next) => {
    console.log('step-3') 
    return res.send("final step")})

app.listen(3000, () => console.log('server runnig'))