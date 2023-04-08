import React, { useState, useEffect } from "react";
import axios from "axios";
import { Project, DataType } from "@/interfaces";
import { Table, Button } from "antd";

// columns we want to display in the table
const columns = [
  {
    title: "Project ID",
    dataIndex: "id",
    key: "id",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
];

const ProjectsTable: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);

  useEffect(() => {
    axios.get<Project[]>("/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  // the dataSource prop for the Table component expects an array of DataType objects (so convert projects to DataType for ANTD)
  const projectsData: DataType[] = projects.map((project) => ({
    key: project.id,
    id: project.id,
    name: project.name,
    description: project.description,
    userId: project.user_id,
  }));

  const handleDelete = () => {
    console.log("Deleting selected rows: ", selectedRows);
  };

  const handleEdit = () => {
    console.log("Editing selected rows: ", selectedRows);
  };

  const hasSelectedRows = selectedRows.length > 0;

  // highlights and grabs the data of item selected in table
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRows(selectedRows);
    },
  };

  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={projectsData}
        rowKey={"id"}
        pagination={{
          position: ["bottomLeft"],
        }}
      />
      {hasSelectedRows && (
        <div style={{ position: "absolute", bottom: "40px", right: "20px" }}>
          <Button onClick={handleEdit}>Edit</Button>
          <Button
            type="primary"
            danger
            style={{ marginLeft: "10px" }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsTable;
