const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://pantatejaswini2001:whJMjwG8u8e1cGRm@sai0.rgos2.mongodb.net/DevTinder')
}

module.exports = connectDB