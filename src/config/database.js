const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://NirmalPandey:pg9dnOwhIsxUKnQ8@namastenode.35jho.mongodb.net/GOOGLE"
  );
};

module.exports = { connectDb };
