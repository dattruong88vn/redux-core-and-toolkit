import { combineReducers } from "redux";

import filterReducer from "../components/Filters/filterReducer";
import todoListReducer from "../components/TodoList/todoListReducer";

const rootReducer = combineReducers({
  filters: filterReducer,
  todoList: todoListReducer,
});

export default rootReducer;
