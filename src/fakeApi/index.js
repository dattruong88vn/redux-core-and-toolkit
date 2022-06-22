import { createServer, Model } from "miragejs";

export const setupServer = () => {
  createServer({
    models: {
      todos: Model,
    },
    routes() {
      this.get("/api/todos", (schema) => {
        return schema.todos.all();
      });

      this.post("/api/todo", (schema, request) => {
        const payload = JSON.parse(request.requestBody);

        return schema.todos.create(payload);
      });

      this.patch("/api/todo", (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        const selectedTodo = schema.todos.find(payload.id);
        selectedTodo.update(payload);
        return schema.todos;
      });
    },
  });
};
