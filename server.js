import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json()); // thg nay cho body parser ve JSON

app.use("/api", routes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
