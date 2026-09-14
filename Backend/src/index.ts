import express from 'express';
import dotenv from 'dotenv';
import connect from './config/db';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api",authRoutes);


const PORT = process.env.PORT || 3000;

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is now live on http://localhost:${PORT}`);
  });
});
