const express = require("express");

const routes = require("./routes/index.js");
const connectDB = require("./dbconnect.js");
import cors from "cors";
require("dotenv").config();
const { handleError, convertToApiError } = require("./middleware/apiError");
// const db = require("../models/index");
const app = express();
app.use(cors());
//middleware
app.use(express.json()); // thg nay cho body parser ve JSON
app.use(express.urlencoded({ extended: true }));

connectDB();

//routes
app.use("/api", routes);

// const db = require('../models/index');

// //get all member list
// (async () => {
//   const member = await db.Members.findAll({});
//   console.log(member);
// })();

//ve nha lam inner join 2 bang
// (async () => {
//   const job = await db.Jobs.findAll({ raw: true });
//   console.log(job);
// })();

//insert member into members table(database)
// ty ve nha thu lai status de trong xem no co tu set active ko??

// (async () => {
//   const newMember = await db.Members.create({
//     id: "ME-002",
//     email: "khanhphdse160477@fpt.edu.vn",
//     fullname: "Phạm Hồng Duyên Khánh",
//     password: "1",
//     current_resume_url: "#",
//     status: "Active"
//   });
//   console.log(newMember);
// })();

//port=8000
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
