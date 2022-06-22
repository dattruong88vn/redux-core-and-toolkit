import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const todoListSlice = createSlice({
  name: "todoList",
  initialState: {
    status: "idle",
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleTodoStatus: (state, action) => {
      const selectedTodo = state.find((todo) => todo.id === action.payload);
      selectedTodo.completed = !selectedTodo.completed;
    },
    getTodos: (state, action) => {
      console.log(action.payload);
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodosThunk.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTodosThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      });
  },
});

export const getTodosThunk = createAsyncThunk("todos/getTodos", async () => {
  const response = await fetch("/api/todos");
  const data = await response.json();
  return data.todos;
});

export const addTodoThunk = createAsyncThunk(
  "todos/addTodo",
  async (todo, { dispatch }) => {
    const response = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify(todo),
    });

    const data = await response.json();
    dispatch(getTodosThunk());

    return data;
  }
);

export const toggleStatusTodoThunk = createAsyncThunk(
  "todos/toggleStatusTodo",
  async (id, { dispatch }) => {
    const response = await fetch("/api/todo", {
      method: "PATCH",
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    dispatch(getTodosThunk());
    return data;
  }
);

export const { toggleTodoStatus } = todoListSlice.actions;
export default todoListSlice.reducer;
