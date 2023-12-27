/*
 * Title: Input section
 * Description: Input section
 * Author: Naimur Rahman
 * Date: 2023-12-21
 *
 */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../features/slices/todoSlice";

const Input = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTodo(text));
    setText("");
  };

  return (
    <form className="input" onSubmit={handleSubmit}>
      <input
        name="todo"
        placeholder="Enter your Todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
    </form>
  );
};

export default Input;
