const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const mongodbUrl = process.env.DB_URL.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);

if (!mongodbUrl) {
  console.log(
    "\x1b[33m%s\x1b[0m",
    'Please set the mongodb connection first in -> "server/models/mongo.config.js"\n'
  );
  return;
}

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to Database Video Requests");
});

module.exports = mongoose;
