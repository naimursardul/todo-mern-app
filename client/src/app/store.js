/*
 * Title: store for redux
 * Description: store for redux
 * Author: Naimur Rahman
 * Date: 2023-12-21
 *
 */
import { configureStore } from "@reduxjs/toolkit";
import todo from "../features/slices/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todo,
  },
});
