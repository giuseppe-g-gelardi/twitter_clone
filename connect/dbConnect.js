const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const dbConnect = () => {
  const connectionString = process.env.DB
  mongoose.connect(
    connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => {
  console.log(`Could not connect to MongoDB. ERROR: ${err}`);
  process.exit(1);
  });
}

module.exports = dbConnect;
