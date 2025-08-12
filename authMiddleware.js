export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7) 
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}