const express = require("express");
const authRoute = require("./auth.route.js");
const memberRoute = require("./member.route");
const router = express.Router();

const routesIndex = [
  {
    path: "/member-auth",
    route: authRoute,
  },
  {
    path: "/member",
    route: memberRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
