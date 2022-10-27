const express = require("express");
const authRoute = require("./auth.route.js");
const memberRoute = require("./member.route");
const staffRoute = require("./staff.route");
const staffAuthRoute = require("./staffAuth.route");
const categoryRoute = require("./categories.route");
const campaignRoute = require("./campaigns.route");
const jobRoute = require("./jobs.route.js");
const candidateRoute = require("./candidate.route");
const interviewRoute = require("./interview.route");
const reportRoute = require("./report.route");
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
    path: "/campaign",
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
  {
    path: "/candidate",
    route: candidateRoute,
  },
  {
    path: "/interview",
    route: interviewRoute,
  },
  {
    path: "/report",
    route: reportRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
