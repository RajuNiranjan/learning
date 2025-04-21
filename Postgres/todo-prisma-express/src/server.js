import express from "express";
import { PORT } from "./utils/env.js";
import { todoRouter } from "./routes/todo.route.js";
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api/v1/todo', todoRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
