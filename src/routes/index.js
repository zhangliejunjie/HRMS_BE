const categoryRoute = require("./categories.route.js");
const campaignRoute = require("./campaigns.route.js");
const jobRoute = require("./jobs.route.js");
const express = require("express");
const authRoute = require("./auth.route.js");
const memberRoute = require("./member.route");
const staffRoute = require("./staff.route");
const staffAuthRoute = require("./staffAuth.route");
const router = express.Router();

const routesIndex = [
  {
    path: "/member-auth",
    route: authRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/campain",
    route: campaignRoute,
  },
  {
    path: "/job",
    route: jobRoute,
  },
  {
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
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
