import express from 'express';
import dotenv from 'dotenv';
import { log } from 'node:console';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`Server is now live on http://localhost:${PORT}`);
})

