const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/MERNAUTH", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/Login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("success");
        } else {
          res.json("Incorrect Password");
        }
      } else {
        res.json("No record exists");
      }
    })
    .catch((err) => res.json(err));
});

// server.js
app.post("/register", (req, res) => {
  const { email } = req.body;

  // Check if a user with the same email already exists
  EmployeeModel.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        // User with the same email already exists
        res.status(409).json("User with this email already exists");
      } else {
        // Create a new user
        EmployeeModel.create(req.body)
          .then((newUser) => res.json(newUser))
          .catch((err) => res.status(500).json(err));
      }
    })
    .catch((err) => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
