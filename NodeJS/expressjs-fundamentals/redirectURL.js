
const express = require("express")

const app = express()

app.get('/check', (req, res) =>{
    res.redirect('/redirect-url')
})


app.get('/redirect-url', (req, res) =>{
    return res.status(200).json({message:"redirected to redirect-url"})
})

app.listen(3000, () => console.log('server runnig'))