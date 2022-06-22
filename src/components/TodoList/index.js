import { useState } from "react";
import { Col, Row, Input, Button, Select, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addTodo, toggleTodoStatus } from "../../redux/actions";
import { todoListSelector, todoListFilter } from "../../redux/selectors";

import Todo from "../Todo";

export default function TodoList() {
  const dispatch = useDispatch();

  // use custom selector
  // const todoList = useSelector(todoListSelector);
  // use reselect lib
  const todoList = useSelector(todoListFilter);

  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState("Medium");

  const hanldeAddTodo = () => {
    dispatch(
      addTodo({
        id: uuidv4(),
        name: todoName,
        priority: priority,
        completed: false,
      })
    );
    setTodoName("");
    setPriority("Medium");
  };

  const handleChangeTodoName = (e) => {
    setTodoName(e.target.value);
  };

  const handleChangePriority = (value) => {
    setPriority(value);
  };

  const handleCheckStatus = (id) => {
    dispatch(toggleTodoStatus(id));
  };

  const renderTodoList = (list) => {
    if (!list) return null;

    return list.map((todo) => {
      return (
        <Todo
          key={todo.id}
          name={todo.name}
          prioriry={todo.priority}
          completed={todo.completed}
          onCheck={() => handleCheckStatus(todo.id)}
        />
      );
    });
  };

  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {renderTodoList(todoList)}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input value={todoName} onChange={handleChangeTodoName} />
          <Select
            defaultValue="Medium"
            value={priority}
            onChange={handleChangePriority}
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={hanldeAddTodo}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
