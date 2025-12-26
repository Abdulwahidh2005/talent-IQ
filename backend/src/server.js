import express from 'express';
import dotenv from 'dotenv';
import { ENV } from './lib/env.js';

dotenv.config();

const app = express();

const PORT = ENV.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

app.listen(PORT,(res,req) => {
  console.log(`Server is running on port ${PORT}`);
});

