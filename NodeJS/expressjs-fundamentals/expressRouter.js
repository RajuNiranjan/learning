const express = require("express")

const app = express()

app.use(express.json())

const router = express.Router()

app.use('/', router)

router.get("/api/get", (req, res) =>{
    return res.status(200).json({message:"Hello World"})
})

router.post("/api/post", (req, res) =>{
    console.log(req.body)
})

router.put('/api/put/:id', (req, res) =>{
    console.log(req.params.id, req.body)
})

router.patch('/api/patch/:id', (req, res) =>{
    console.log(req.params.id, req.body)
})

router.delete('/api/delete/:id', (req, res) =>{
    console.log(req.params.id)
})

router.get('/api', (req, res) =>{
    console.log(req.query.search)
})

app.listen(3000, () => console.log('server running'))