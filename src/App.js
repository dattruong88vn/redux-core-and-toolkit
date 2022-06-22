import { Typography, Divider } from "antd";
import "./App.css";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";
import { setupServer } from "./fakeApi";
import { useEffect } from "react";

setupServer();

const { Title } = Typography;

function App() {
  useEffect(() => {
    (async () => {
      try {
        await fetch("/api/todo", {
          method: "POST",
          body: JSON.stringify({
            id: 1,
            name: "Learn Redux",
            completed: true,
            priority: "High",
          }),
        });

        const response1 = await fetch("/api/todos");
        const data1 = await response1.json();
        console.log(data1);

        await fetch("/api/todo", {
          method: "PATCH",
          body: JSON.stringify({
            id: 1,
            name: "Learn Redux-Toolkit",
            completed: true,
            priority: "High",
          }),
        });

        const response2 = await fetch("/api/todos");
        const data2 = await response2.json();
        console.log(data2);
      } catch (err) {}
    })();
  }, []);

  return (
    <div
      style={{
        width: 500,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 20,
        boxShadow: "0 0 10px 4px #bfbfbf",
        borderRadius: 5,
        height: "90vh",
      }}
    >
      <Title style={{ textAlign: "center" }}>TODO APP with REDUX</Title>
      <Filters />
      <Divider />
      <TodoList />
    </div>
  );
}

export default App;
