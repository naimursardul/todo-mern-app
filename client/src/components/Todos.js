/*
 * Title: Todo List
 * Description: Todo List
 * Author: Naimur Rahman
 * Date: 2023-12-24
 *
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodo } from "../features/slices/todoSlice";
import Todo from "./Todo";
import Loader from "./Loader/Loader";
import Tabs, { allTabs } from "./Tabs";

const Todos = () => {
  const dispatch = useDispatch();
  const { todos, loading, selectedTab } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const tabTodos = () => {
    if (selectedTab === allTabs[1]) {
      return todos.filter((todo) => !todo.done);
    } else if (selectedTab === allTabs[2]) {
      return todos.filter((todo) => todo.done);
    } else {
      return todos;
    }
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <article>
        <Tabs />
        <div className="box">
          {tabTodos() &&
            tabTodos().map((todo) => <Todo todo={todo} key={todo._id} />)}
        </div>
      </article>
    );
  }
};

export default Todos;
