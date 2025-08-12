import express from 'express';
import userRepository from '../repositories/UserRepository.js';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

function generateToken(userId, userName) {
  return jwt.sign(
    { userId, userName },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}


userRouter.post('/registration', async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        error: 'Nome, email e senha são obrigatórios'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'A senha deve ter pelo menos 6 caracteres'
      });
    }

    const userExists = await userRepository.findByEmail(email);
    if (userExists) {
      return res.status(400).json({
        error: 'Email já está em uso'
      });
    }

    const user = await userRepository.create({ userName, email, password });
    const token = generateToken(user.id, user.userName);

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user,
      token
    });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email e senha são obrigatórios'
      });
    }

    const user = await userRepository.validatePassword(email, password);
    if (!user) {
      return res.status(401).json({
        error: 'Email ou senha incorretos'
      });
    }

    const token = generateToken(user.id, user.userName);

    console.log(token);

    res.json({
      message: 'Login realizado com sucesso',
      user,
      token
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


userRouter.get('/', async (req, res) => {
  try {
    const users = await userRepository.findAll();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


userRouter.get('/:id', async (req, res) => {
  try {
    const user = await userRepository.findById(req.params.id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


userRouter.put('/:id', async (req, res) => {
  try {
    const user = await userRepository.update(req.params.id, req.body);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


userRouter.delete('/:id', async (req, res) => {
  try {
    const user = await userRepository.remove(req.params.id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;