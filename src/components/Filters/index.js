import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Input, Typography, Radio, Select, Tag } from "antd";
import {
  searchFilterChange,
  statusFilterChange,
  priorityFilterChange,
} from "../../redux/actions";
import { prioritiesSelector } from "../../redux/selectors";

const { Search } = Input;

export default function Filters() {
  const dispatch = useDispatch();
  const priorityList = useSelector(prioritiesSelector);
  const [textSearch, setTextSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleInputSearch = (e) => {
    const value = e.target.value;
    setTextSearch(value);
    dispatch(searchFilterChange(value));
  };

  const handleFilterStatus = (e) => {
    const value = e.target.value;
    setFilterStatus(value);
    dispatch(statusFilterChange(value));
  };

  const handleChangePriority = (value) => {
    dispatch(priorityFilterChange(value));
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search
          placeholder="input search text"
          value={textSearch}
          onChange={handleInputSearch}
        />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value={filterStatus} onChange={handleFilterStatus}>
          <Radio value="All">All</Radio>
          <Radio value="Completed">Completed</Radio>
          <Radio value="Todo">To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode="multiple"
          allowClear
          placeholder="Please select"
          style={{ width: "100%" }}
          value={priorityList || []}
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
      </Col>
    </Row>
  );
}
