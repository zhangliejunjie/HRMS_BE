// import { createRequire } from "module";

// const require = createRequire(import.meta.url);


import { Sequelize } from "sequelize";
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("hrms", "root", "12072002", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
};

export default connectDB;
