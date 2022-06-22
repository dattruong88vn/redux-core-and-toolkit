import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "../components/Filters/filterReducer";
import todoListReducer from "../components/TodoList/todoListReducer";

const store = configureStore({
  reducer: {
    filters: filterReducer,
    todoList: todoListReducer,
  },
});

export default store;
