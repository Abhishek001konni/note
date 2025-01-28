const mongoose = require("mongoose");

const clientOptions = { serverApi: { version: "1", strict: true, deprecationErrors: true } };


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, clientOptions);

    //Connection error handling
    mongoose.connection.on(`error`, err => {
      console.error(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on(`disconnected`, () => {
      console.log(`MongoDB disconnected`);
    });

    console.log(`Connected to MongoDB`);
  } catch (err) {
    console.error(`Could not connect to MongoDB`, err);
    process.exit(1);
  }

}

module.exports = connectDB;
