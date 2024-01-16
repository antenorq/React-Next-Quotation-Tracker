require("dotenv").config();

const express = require("express");
const path = require("path"); // to use later for directories of images
const cors = require("cors");

const port = process.env.PORT;

const app = express();

//config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Solve Cors
//app.use(cors({ credentials: true, origin: "http://192.168.10.71:3000" }));
app.use(cors({ credentials: true, origin: ["http://192.168.10.71:3000", "http://localhost:3000", "https://react-quotation-tracker.vercel.app"] }));

//DB connection
require("./config/db.js");

//routes
const router = require("./routes/Router.js");

app.use(router);

app.listen(port, () => {
  console.log("App running port " + port);
});
