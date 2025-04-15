
const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log("🛡️ Token recebido:", token);

  if (!token) {
    console.log("❌ Token não fornecido");
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, 'seuSegredoJWT', (err, user) => {
    if (err) {
      console.log("❌ Token inválido:", err.message);
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    console.log("✅ Token verificado com sucesso:", user);
    next();
  });
};

module.exports = autenticarToken;
