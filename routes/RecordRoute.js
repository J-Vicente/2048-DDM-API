import express from 'express';
import recordRepository from '../repositories/RecordRepository.js';

const recordRouter = express.Router();


recordRouter.post('/newRecord', async (req, res) => {
  try {
    const { score, date, higherBlock, userName} = req.body;

    if (!score || !date || !higherBlock || !userName) {
      return res.status(400).json({ error: 'Informe todos os campos' });
    }

    const record = await recordRepository.create({
      score,
      date,
      higherBlock,
      userName
    });

    res.status(201).json({
      message: 'Novo recorde cadastrado',
      record,
    });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


recordRouter.get('/', async (req, res) => {
  try {
    const records = await recordRepository.findAll( {raw : true});
    res.json({ records });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


recordRouter.get('/:id', async (req, res) => {
  try {
    const user = await recordRepository.findById(req.params.id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ error: 'Record não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default recordRouter;