// routes/todoRoutes.js

import express from "express";
import { createTodo, getTodos, updateTodo, deleteTodo, toggleTodo } from "../controllers/todoController.js";

const router = express.Router();

router.post("/todos", createTodo);
router.get("/todos", getTodos);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);
router.patch("/todos/:id/toggle", toggleTodo);

export default router;