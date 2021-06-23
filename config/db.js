const monogoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await monogoose.connect("mongodb+srv://satyadev:guru3003@cluster0.t7ikj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
          , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;