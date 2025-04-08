const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY || '12345678', (err, user) => {
        if (err) return res.sendStatus(403);
        req.userId = user.userId; // Supondo que o ID do usuário esteja na propriedade 'userId' do payload do token
        next();
    });
};

module.exports = authenticateToken;