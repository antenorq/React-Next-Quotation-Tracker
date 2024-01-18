const mongoose = require("mongoose");

//connection
const dbUser = process.env.DB_USER;
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.stvnq4v.mongodb.net/tracker?retryWrites=true&w=majority`);

    console.log("Database Connected!!");

    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();

module.exports = conn;
