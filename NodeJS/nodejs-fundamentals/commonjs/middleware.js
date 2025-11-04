/*
middleware in Node.js is Function that sits betweeen request and response in Node.js mainly used in Express.js

it can modify, log, handle errors before request reaches to final route
*/

const express = require("express")

const app = express()

// Middleware
app.use((req, res, next) =>{
    console.log("Request executed", req.url)
    next()
})

// buit-in middleware
app.use(express.json())     // automatically parse the JSON request bodies, imcomming JSON request body and make them available on req.body

// Route
app.get("/", (req, res)=>{
    return res.status(200).json({message:"Hello world!"})
})

app.listen(3000 , () =>console.log("server running at 3000 port"))