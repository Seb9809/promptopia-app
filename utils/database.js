import mongoose from "mongoose";

let isConnected = false; // Track the connection status

// Function to establish a connection to the MongoDB database
export const connectToDb = async () => {
  mongoose.set("strictQuery", true); // Enable strict query mode

  if (isConnected) {
    console.log("MongoDb is already connected");
    return;
  }

  try {
    // Connect to the MongoDB database using the provided URI and options
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true; // Update the connection status

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
