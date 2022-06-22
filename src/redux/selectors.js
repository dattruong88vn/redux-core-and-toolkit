import { createSelector } from "@reduxjs/toolkit";

export const todoListSelector = (state) => state.todoList.todos;
export const searchTextSelector = (state) => state.filters.search;
export const statusFilterSelector = (state) => state.filters.status;
export const prioritiesSelector = (state) => state.filters.priority;

export const todoListFilter = createSelector(
  todoListSelector,
  searchTextSelector,
  statusFilterSelector,
  prioritiesSelector,
  (todoList, textSearch, statusFilter, priorityFilter) => {
    return todoList.filter((todo) => {
      const isMatchSearchText = todo.name.toLowerCase().includes(textSearch);

      const isMatchStatusFilter =
        statusFilter === "All" ||
        (statusFilter === "Completed" ? todo.completed : !todo.completed);

      const isMatchPriorityFilter =
        priorityFilter.length === 0 || priorityFilter.includes(todo.priority);

      return isMatchSearchText && isMatchStatusFilter && isMatchPriorityFilter;
    });
  }
);
