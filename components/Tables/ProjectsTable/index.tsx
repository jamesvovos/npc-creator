import React, { useState, useEffect } from "react";
import axios from "axios";
import { Project, DataType } from "@/interfaces";
import { Table } from "antd";

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

// highlights and grabs the data of item selected in table
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

const ProjectsTable: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios
      .get<Project[]>("/projects")
      .then((response) => setProjects(response.data));
  }, []);

  // the dataSource prop for the Table component expects an array of DataType objects (so convert projects to DataType for ANTD)
  const projectsData: DataType[] = projects.map((project) => ({
    key: project.id,
    id: project.id,
    name: project.name,
    description: project.description,
    userId: project.user_id,
  }));

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
      />
    </div>
  );
};

export default ProjectsTable;
