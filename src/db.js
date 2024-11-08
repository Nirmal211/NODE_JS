const express = require("express");
const app = express();
const User = require("./models/user");
const { connectDb } = require("./config/database");
const { validateRegisterData } = require("./utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { responseInterceptor } = require("http-proxy-middleware");
app.use(express.json());
app.use(cookieParser());
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:7000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, Email, Password, PhoneNumber } = req?.body;
    // Validate the data
    validateRegisterData(req);

    // Encrypt the password
    const passwordHash = await bcrypt.hash(Password, 10);

    // Creating a new instance of user model
    const user = new User({
      firstName,
      lastName,
      Email,
      PhoneNumber,
      Password: passwordHash,
    });

    const userEmail = req.body.Email;
    const userResponse = await User.findOne({ Email: userEmail });

    if (userResponse) {
      throw new Error("User Already Exists");
    } else {
      // store the user into the database
      await user.save();
      return res.status(200).send("User added successfully");
    }
  } catch (err) {
    return res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!validator.isEmail(Email)) {
      throw new Error("Invalid Credentials");
    }

    const user = await User.findOne({ Email: Email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (isPasswordValid) {
      // Create JWT Token
      const token = jwt.sign({ _id: user._id }, "GOOGLE$7000&0216");
      console.log(token);

      res.cookie("JWTToken", token);

      res.send("Login Successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    return res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.findOne({});
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: "something went wrong" });
  }
});

// delete the user from database

app.delete("/deleteUser", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    // const user = await User.findByIdAndDelete(userId);
    res.send({ message: "user deleted successfully " });
  } catch (err) {
    res.status(422).send({ error: "user id isn't available" });
  }
});

// Update data of the user

app.patch("/update/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  //   {
  //     "firstName":"Ankit",
  //     "lastName":"Joshi",
  //     "Email":"Ankit@gmail.com",
  //     "Password":"ankitjoshi@001",
  //     "PhoneNumber":8956256858
  //   }

  try {
    const ALLOW_UPDATES = [
      "photoUrl",
      "Password",
      "Address",
      "gender",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOW_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }

    const user = await User.findByIdAndUpdate(
      { _id: req.params?.userId },
      data,
      {
        returnDocument: "before",
        runValidators: true,
      }
    );
    res.send({ message: "user updated successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

connectDb()
  .then(() => {
    console.log("Database Connection established");
    app.listen(7000, () => {
      console.log("Server is running 7000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
