/*
 * Title: reducer slice
 * Description: reducer slice
 * Author: Naimur Rahman
 * Date: 2023-12-21
 *
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { allTabs } from "../../components/Tabs";

const baseUrl = "http://localhost:5000";

// post action
export const createTodo = createAsyncThunk("createTodo", async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/todos`, { data });
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
});

// get action
export const getTodo = createAsyncThunk("getTodo", async () => {
  try {
    const response = await axios.get(`${baseUrl}/todos`);
    const result = response.data;
    return result;
  } catch (error) {
    console.error(error.message);
  }
});

// get single user
export const updateTodoDone = createAsyncThunk("updateTodoDone", async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/todos/${id}`);
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
  }
});

// update user
export const updateTodo = createAsyncThunk("updateTodo", async ([id, data]) => {
  try {
    const response = await axios.put(`${baseUrl}/todos/${id}`, { data });
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
  }
});

// update user
export const deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/todos/${id}`);
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
  }
});

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    loading: false,
    hasError: false,
    selectedTab: allTabs[0],
  },
  reducers: {
    manageSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = [action.payload, ...state.todos];
      })
      .addCase(createTodo.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      })
      .addCase(getTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getTodo.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      })
      .addCase(updateTodoDone.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodoDone.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.map((todo) =>
          todo._id === action.payload._id ? { ...action.payload } : todo
        );
      })
      .addCase(updateTodoDone.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.map((todo) =>
          todo._id === action.payload._id ? { ...action.payload } : todo
        );
      })
      .addCase(updateTodo.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter(
          (todo) => todo._id !== action.payload._id
        );
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const { manageSelectedTab } = todoSlice.actions;
export default todoSlice.reducer;
