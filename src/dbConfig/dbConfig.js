import mongoose from "mongoose";
export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongoose connected successfully");
    });
    connection.on("error", (err) => {
      console.log("mongodb connected Error" + err);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
}
