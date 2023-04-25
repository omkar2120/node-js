const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    phoneno: { type: String },
    status: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tbl_user", userSchema);
