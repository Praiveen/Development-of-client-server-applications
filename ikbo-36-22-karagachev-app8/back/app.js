const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

const initializeDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    await sequelize.sync({ force: false });
    console.log('Database synchronized.');

    const User = require('./models/user');
    const adminExists = await User.findOne({ where: { role: 'admin' } });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        password: '12345',
        role: 'admin'
      });
      console.log('Admin user created.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initializeDb();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
