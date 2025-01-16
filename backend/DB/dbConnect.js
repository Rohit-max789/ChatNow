

import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb+srv://garg2001rohit:Rohit123@cluster0.p7j7gct.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  }
};

export default dbConnect;

 



