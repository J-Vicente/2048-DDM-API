import Record from '../models/Record.js';

async function findAll() {
  return await Record.findAll({
  attributes: ['id', 'score', 'date', 'higherBlock', 'userName','createdAt', 'updatedAt']
});
}

async function findById(id) {
  return await Record.findByPk(id, {
  attributes: ['id', 'score', 'date', 'higherBlock','userName', 'createdAt', 'updatedAt']
});
}

async function create({ score, date, higherBlock, userName }) {

  const record = await Record.create({ 
     score,
     date,
     higherBlock,    
     userName,
  });
}


export default {
  findAll,
  findById,
  create,
};