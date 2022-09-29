import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import connectDB from "./dbconnect.js";
import cors from "cors";


const app = express();
dotenv.config();
connectDB();

//middleware
app.use(express.json()); // thg nay cho body parser ve JSON
app.use(express.urlencoded({ extended: true }));
app.use(cors())




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
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
