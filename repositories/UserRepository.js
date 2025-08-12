import User from '../models/User.js';
import bcrypt from 'bcrypt';

async function findAll() {
  return await User.findAll({
    attributes: { exclude: ['password'] }
  });
}

async function findById(id) {
  return await User.findByPk(id, {
    attributes: { exclude: ['password'] }
  });
}

async function findByEmail(email) {
  return await User.findOne({ 
    where: { email } 
  });
}

async function create({ userName, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ 
    userName, 
    email, 
    password: hashedPassword 
  });
  
  const { password: _, ...userNoPassword } = user.toJSON();
  return userNoPassword;
}

async function remove(id) {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    const { password: _, ...userNoPassword } = user.toJSON();
    return userNoPassword;
  }
  return null;
}

async function update(id, { userName, email, password }) {
  const user = await User.findByPk(id);
  if (user) {
    user.userName = userName;
    user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    await user.save();
    
    const { password: _, ...userSempassword } = user.toJSON();
    return userSempassword;
  }
  return null;
}

async function validatePassword(email, password) {
  const user = await findByEmail(email);
  if (user && await bcrypt.compare(password, user.password)) {
    const { password: _, ...userSempassword } = user.toJSON();
    return userSempassword;
  }
  return null;
}

export default {
  findAll,
  findById,
  findByEmail,
  create,
  update,
  remove,
  validatePassword
};