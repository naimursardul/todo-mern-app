/*
 * Title: Single todo
 * Description: Single todo
 * Author: Naimur Rahman
 * Date: 2023-12-25
 *
 */

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faSquare,
  faSquareCheck,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  updateTodo,
  updateTodoDone,
} from "../features/slices/todoSlice";

const Todo = ({ todo }) => {
  const [text, setText] = useState(todo.data);
  const [toggleInput, setToggleInput] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
    dispatch(updateTodo([todo._id, text]));
    setToggleInput(!toggleInput);
  };

  return (
    <li className="list">
      {toggleInput ? (
        <form className="updateInput" onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
      ) : (
        <span onClick={() => dispatch(updateTodoDone(todo._id))}>
          <span className="pre_icon">
            <FontAwesomeIcon icon={todo.done ? faSquareCheck : faSquare} />
          </span>
          <span
            className="item"
            style={todo.done ? { textDecoration: "line-through" } : {}}
          >
            {todo.data}
          </span>
        </span>
      )}
      <span
        className="post_icon delete_icon"
        onClick={() => dispatch(deleteTodo(todo._id))}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </span>
      <span
        className="post_icon edit_icon"
        onClick={() => [
          todo.done
            ? setToggleInput(toggleInput)
            : setToggleInput(!toggleInput),
        ]}
      >
        {toggleInput ? (
          <FontAwesomeIcon
            icon={faCheck}
            onClick={() => dispatch(updateTodo([todo._id, text]))}
          />
        ) : (
          <FontAwesomeIcon icon={faEdit} />
        )}
      </span>
    </li>
  );
};

export default Todo;
