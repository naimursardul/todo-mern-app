/*
 * Title: Todo Controller
 * Description: Todo Controller
 * Author: Naimur Rahman
 * Date: 2023-12-24
 *
 */

import Todo from "../model/TodoSchema.js";

export const createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create({
      data: req.body.data,
      createdAt: Date.now(),
    });

    await newTodo.save();

    return res.status(200).json(newTodo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getTodo = async (req, res) => {
  try {
    const allTodos = await Todo.find({}).sort({ createdAt: -1 });

    return res.status(200).json(allTodos);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const toggleTodoDone = async (req, res) => {
  try {
    const todoRef = await Todo.findById(req.params.id);
    await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { done: !todoRef.done }
    );
    const updatedTodo = await Todo.findById(req.params.id);
    return res.status(200).json(updatedTodo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateTodo = async (req, res) => {
  try {
    await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { data: req.body.data }
    );
    const updatedTodo = await Todo.findById(req.params.id);
    return res.status(200).json(updatedTodo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedTodo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
