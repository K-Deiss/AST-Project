const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 0,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    refreshToken: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    cars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    ],
  },
  { timestamps: true, collection: "User" },
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
