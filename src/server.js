const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/index.js");
const connectDB = require("./dbconnect");
const cors = require("cors");
const app = express();
dotenv.config();

app.use(cors());
connectDB();

app.use(express.json()); // thg nay cho body parser ve JSON

app.use("/api", routes);

// const db = require('../models/index')
// app.get('/job', async (_req, res) => {
//   try {
//     const job = await db.Jobs.findAll();
//     res.send(job);
//   } catch (err) {
//     res.send(err);
//   }
// })

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
