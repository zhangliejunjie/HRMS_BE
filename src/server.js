const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/index.js");
const connectDB = require("./dbconnect");
const cors = require("cors");
const { handleError, convertToApiError } = require("./middleware/apiError");
// const db = require("../models/index");
const app = express();
dotenv.config();

app.use(cors());
connectDB();

app.use(express.json()); // thg nay cho body parser ve JSON

app.use("/api", routes);
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});
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
