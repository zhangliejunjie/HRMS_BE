import express from "express";
import {
  handleCreateNewCategory,
  handleGetAllCategory,
  handleUpdateCategory,
  handleDeleteCategory,
} from "../controller/category.controller.js";
const router = express.Router();

router.get("/", handleGetAllCategory);
router.post("/add", handleCreateNewCategory);
router.patch("/update", handleUpdateCategory);
router.patch("/delete/:id", handleDeleteCategory);

module.exports = router;
