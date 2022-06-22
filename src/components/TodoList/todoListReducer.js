import { createSlice } from "@reduxjs/toolkit";

export const todoListSlice = createSlice({
  name: "todoList",
  initialState: [
    { id: 1, name: "Learn Redux", completed: true, priority: "High" },
    { id: 2, name: "Learn JavaScript", completed: false, priority: "Medium" },
    { id: 3, name: "Learn CSS", completed: false, priority: "Low" },
  ],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleTodoStatus: (state, action) => {
      const selectedTodo = state.find((todo) => todo.id === action.payload);
      selectedTodo.completed = !selectedTodo.completed;
    },
  },
});

export const { addTodo, toggleTodoStatus } = todoListSlice.actions;
export default todoListSlice.reducer;
