const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const PORT = 3001;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userReq = req.body;
  const user = new User(userReq);
  try {
    await user.save();
    res.status(201).send("User Created Successfully");
  } catch (err) {
    res.status(400).send("User not created Successfully");
  }
});

app.get("/user", async (req, res) => {
  const emailId = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: emailId });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Something Went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const updateData = req.body
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.body._id },
      updateData,
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send("Something Went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("DB Connection Established");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database Cannot be Connected");
  });
