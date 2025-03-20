const mongoose = require('mongoose')

async function connectDB(){
    try {
        const url = "mongodb+srv://tempeiro-certo:mfOZWUgBb8uDw7uX@cluster0.sidbo.mongodb.net/tempeiro-certo-db?retryWrites=true&w=majority";
        const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

        await mongoose.connect(url, clientOptions)
        console.log('MongoDB conectado')

    }catch (error) {
        console.error('Erro ao conectar com o banco de dados:',error)
        process.exit(1) // Encerra o processo em caso de erro de conexão
    }
}

module.exports = connectDB