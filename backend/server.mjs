import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'; // Import the cors package
import blockchainRoutes from './routes/blockchainRoutes.mjs';
import transactionRoutes from './routes/transactionRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import { initializeNode } from './services/networkService.mjs';
import { connectDb } from './data/mongo.mjs';
import errorHandler from './middlewares/errorHandler.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5010;

app.use(morgan('dev'));
app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use('/api', blockchainRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', userRoutes);

app.use(errorHandler);

let server;

connectDb()
  .then(() => {
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      initializeNode();
    });
  })
  .catch((err) => console.error('Could not connect to MongoDB', err));

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
