const express = require("express")

const app = express()

app.use(express.json())

app.get("/api/get", (req, res) =>{
    return res.status(200).json({message:"Hello World"})
})

app.post("/api/post", (req, res) =>{
    console.log(req.body)
})

app.put('/api/put/:id', (req, res) =>{
    console.log(req.params.id, req.body)
})

app.patch('/api/patch/:id', (req, res) =>{
    console.log(req.params.id, req.body)
})

app.delete('/api/delete/:id', (req, res) =>{
    console.log(req.params.id)
})

app.get('/api', (req, res) =>{
    console.log(req.query.search)
})

app.listen(3000, () => console.log('server running'))