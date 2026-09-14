import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.MONGODB_URI;

if (!URI) {
  throw new Error('MONGODB_URI is not set. Check your .env file.');
}

const connect = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Database connection is successful.');
  } catch (err) {
    console.log('Error while connecting to Database: ', err);
    process.exit(1);
  }
};

export default connect;
