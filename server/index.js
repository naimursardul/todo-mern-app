/*
 * Title: Database execution file
 * Description: Database execution file
 * Author: Naimur Rahman
 * Date: 2023-12-23
 *
 */

import express from "express";
import Connection from "./database/db.js";
import cors from "cors";
import Routes from "./routes/routes.js";

const app = express();
const PORT = 5000;
// const router = express.Router();

app.use(cors());

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/", Routes);

// router.post("/todos", async (req, res) => {
//   try {
//     const newTodo = await Todo.create({
//       data: req.body.todo,
//       createdAt: Date.now(),
//     });

//     await newTodo.save();

//     return res.status(200).json(newTodo);
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// });

Connection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
