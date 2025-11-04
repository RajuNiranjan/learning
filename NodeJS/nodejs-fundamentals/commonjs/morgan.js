const express = require("express")
const morgan = require("morgan")

const app = express()


app.use(morgan('dev'))

app.get('/', (req, res) =>{
    return res.status(200).json({message:"Hello World"})
})


app.listen(3000, ()=>console.log('server runnig at 3000 port'))