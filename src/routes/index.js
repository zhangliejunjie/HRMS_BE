import express from "express";
import authRoute from "./auth.route.js";
import categoryRoute from "./categories.route.js";
const router = express.Router();

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/",
    route: categoryRoute,
  }
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
