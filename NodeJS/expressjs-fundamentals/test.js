const express = require("express")

const app = express()

app.get('/', (req, res) =>{
    return res.status(200).json({message:"Hello World"})
})

app.listen(3000, ()=>console.log('server running at port number 3000'))