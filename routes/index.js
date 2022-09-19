import express from "express";
import authRoute from "./auth.route.js";
const router = express.Router();

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
