import express from "express";
import { handleCreateNewCategory, handleGetAllCategory, handleUpdateCategory, handleDeleteCategory } from "../controller/category.controller.js";
const router = express.Router();


router.get('/category', handleGetAllCategory);
router.post('/category-add', handleCreateNewCategory);
router.put('/category-update', handleUpdateCategory);
router.delete('/category-delete', handleDeleteCategory);



export default router;
