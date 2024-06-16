import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import blockchainRoutes from './routes/blockchainRoutes.mjs';
import transactionRoutes from './routes/transactionRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import { initializeNode } from './services/networkService.mjs';
import { connectDb } from './data/mongo.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5010;

app.use(morgan('dev'));
// app.use(bodyParser.json());
app.use(express.json());

app.use('/api', blockchainRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', userRoutes);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//       initializeNode();
//     });
//   })
//   .catch((err) => console.error('Could not connect to MongoDB', err));

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
