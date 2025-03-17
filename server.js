const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/database')
const userRoutes = require('./routes/user_routes')
const receitasRoutes = require('./routes/recipe_routes')


const app = express()
const port = 3000

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


// const User = mongoose.model('User', userSchema);
// const Recipe = mongoose.model('Recipe', recipeSchema);


// //Rotas
// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     const user = new User({ username, password });
//     await user.save();
//     res.status(201).send('User registered');
// });

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username, password });
//     if (user) {
//         res.status(200).send('Login successful');
//     } else {
//         res.status(401).send('Invalid credentials');
//     }
// });

// app.post('/recipe', async (req, res) => {
//     const { title, type, ingredients, preparation } = req.body;
//     const recipe = new Recipe({ title, type, ingredients, preparation });
//     await recipe.save();
//     res.status(201).send('Recipe created');
// });

// app.get('/recipes', async (req, res) => {
//     const recipes = await Recipe.find();
//     res.status(200).json(recipes);
// });

// app.listen(port, () => {
//     console.log(`Servidor rodando na porta ${port}`);
// });
