import dotenv from 'dotenv';
// import { RateLimiterMongo } from 'rate-limiter-flexible';
import mongoose from 'mongoose';
import ip from 'ip';

dotenv.config();

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!uri) {
      throw new Error('MONGO_URI must be defined');
    }
    // const conn = await mongoose.connect(uri);
    await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${ip.address()}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
