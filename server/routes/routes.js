/*
 * Title: Routes
 * Description: Server routes
 * Author: Naimur Rahman
 * Date: 2023-12-24
 *
 */

import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  toggleTodoDone,
  updateTodo,
} from "../todo-controller/todo-controller.js";

const route = express.Router();

route.post("/todos", createTodo);
route.get("/todos", getTodo);
route.get("/todos/:id", toggleTodoDone);
route.put("/todos/:id", updateTodo);
route.delete("/todos/:id", deleteTodo);

export default route;
