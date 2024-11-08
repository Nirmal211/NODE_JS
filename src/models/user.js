// Defining a User Schema

const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    // customerId: {
    //   type: Number,
    //   unique: true,
    // },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email Address isn't valid");
        }
      },
    },
    Password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Set The Strong Password");
        }
      },
    },
    PhoneNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 10,
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz68b1g8MSxSUqvFtuo44MvagkdFGoG7Z7DQ&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is Invalid");
        }
      },
    },
    DOB: {
      type: String,
    },
    PinCode: {
      type: Number,
    },
    Address: {
      type: String,
      lowercase: true,
      max: 50,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "other", "female"].includes(value)) {
          throw new Error("Enter The Valid Gender");
        }
      },
      lowercase: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
