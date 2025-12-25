import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import sequelize from './config/database.js'; 
import booksRoute from './routes/booksRoute.js';

const app = express();
// Elastic Beanstalk looks for port 8080 by default
const PORT = process.env.PORT || 8080; 

app.use(express.json());
app.use(cors());

// Health Check route: This must return 200 OK for AWS to show "Green" health
app.get('/', (req, res) => {
  res.status(200).send('Backend is running!');
});

app.use('/books', booksRoute);

// 1. Start the server immediately so Nginx can find your app
app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

// 2. Attempt to sync with the database separately
// ADDED { alter: true } to automatically create the Books table in RDS
sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('Connected to RDS MySQL and Database Synced');
  })
  .catch((error) => {
    // If this fails, the server still runs, and you can see this error in AWS Logs
    console.error('DATABASE_CONNECTION_ERROR:', error);
  });