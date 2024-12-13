import dotenv from "dotenv";
import { app } from "./src/app.js";
import connectDB from "./src/db/connect.js";

// Load environment variables
dotenv.config();

// Define the port from environment variables or use a default
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
