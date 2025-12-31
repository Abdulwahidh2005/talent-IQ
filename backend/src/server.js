import express from 'express';
import dotenv from 'dotenv';
import { ENV } from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.get('/health', (req, res) => {
  res.status(200).json({msg:'Hello World!'});
});

app.get('/books', (req, res) => {
  res.status(200).json({msg:'this is book endpoint'});
});


//make our app ready for production
if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend','dist','index.html'));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
