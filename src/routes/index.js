<<<<<<< HEAD
import express from "express";
import authRoute from "./auth.route.js";
import categoryRoute from "./categories.route.js";
import campaignRoute from "./campaigns.route.js";
import jobRoute from "./jobs.route.js";
=======
const express = require("express");
const authRoute = require("./auth.route.js");
const memberRoute = require("./member.route");
const staffRoute = require("./staff.route");
const staffAuthRoute = require("./staffAuth.route");
>>>>>>> SangTranBE
const router = express.Router();

const routesIndex = [
  {
    path: "/member-auth",
    route: authRoute,
  },
  {
<<<<<<< HEAD
    path: "/",
    route: categoryRoute,
  },
  {
    path: "/",
    route: campaignRoute,
  },
  {
    path: "/",
    route: jobRoute,
  }
=======
    path: "/member",
    route: memberRoute,
  },
  {
    path: "/staff",
    route: staffRoute,
  },
  {
    path: "/staff-auth",
    route: staffAuthRoute,
  },
>>>>>>> SangTranBE
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
