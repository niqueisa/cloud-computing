import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import sequelize from './config/database.js'; 
import booksRoute from './routes/booksRoute.js';

const app = express();
const PORT = process.env.PORT || 8080; 

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Backend is running!');
});

app.use('/books', booksRoute);

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('Connected to RDS MySQL and Database Synced');
  })
  .catch((error) => {
    console.error('DATABASE_CONNECTION_ERROR:', error);
  });