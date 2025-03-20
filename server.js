const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/database')
const userRoutes = require('./routes/user_routes')
const receitasRoutes = require('./routes/recipe_routes')


const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.json())


// Rotas
app.use('/users', userRoutes)
app.use('/recipe', receitasRoutes)


async function startServer() {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`)
        })
    } catch (error) {
        console.error('Erro ao iniciar servidor', error)
    }
}

startServer()

