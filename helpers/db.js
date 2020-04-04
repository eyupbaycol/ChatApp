const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.DB_STRING);
  mongoose.connection.on("open", () => {
    console.log("Mongodb connected");
  });
  mongoose.connection.on("error", err => {
    console.log("mongodb error");
  });

  mongoose.Promise = global.Promise;
};
