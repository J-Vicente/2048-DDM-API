import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import userRouter from './routes/UserRoutes.js';
import recordRouter from './routes/RecordRoute.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Unable to synchronize the database:', err);
});

app.use('/api/user', userRouter);
app.use('/api/records', recordRouter);

app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Records/Users API funcionando!',
    timestamp: new Date().toISOString()
  });
});

sequelize.authenticate()
  .then(() => console.log('Banco conectado com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao banco:', err)
);


const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

