import axios from "axios";
import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Card } from "antd";
import type { ColumnsType } from "antd/es/table";

export default function Intents(): JSX.Element {
  const [intents, setIntents] = useState<Intent[]>([]);

  useEffect(() => {
    axios
      .get<Intent[]>("/intents")
      .then((response) => setIntents(response.data));
  }, []);

  return (
    <Card title="Intents" style={{ margin: 20 }}>
      <CustomTable data={intents} />
    </Card>
  );
}

interface Intent {
  id: number;
  tag: string;
  patterns: Pattern[];
  responses: Response[];
}

interface Pattern {
  id: number;
  text: string;
}

interface Response {
  id: number;
  text: string;
}

const columns: ColumnsType<Intent> = [
  {
    title: "Intent ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tag",
    key: "tag",
    dataIndex: "tag",
  },
  {
    title: "Patterns",
    dataIndex: "patterns",
    key: "patterns",
    render: (_, { patterns }) => (
      <>
        {patterns.map((pattern) => {
          return (
            <Tag key={pattern.id} color="blue">
              {pattern.text}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Responses",
    dataIndex: "responses",
    key: "responses",
    render: (_, { responses }) => (
      <>
        {responses.map((response) => {
          return (
            <Tag key={response.id} color="green">
              {response.text}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Update</a>
        <a onClick={() => deleteIntent(record.id)}>Delete</a>
      </Space>
    ),
  },
];

function refreshPage() {
  window.location.reload();
}

const deleteIntent = (id: number) => {
  console.log(id);
  axios.delete<any>(`intents/${id}`);
  refreshPage();
};

interface CustomTableProps {
  data: Intent[];
}

const CustomTable: React.FC<CustomTableProps> = ({ data }) => (
  <Table columns={columns} dataSource={data} rowKey="id" />
);
