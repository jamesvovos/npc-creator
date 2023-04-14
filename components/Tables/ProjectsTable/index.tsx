import React, { useState, useEffect } from "react";
import axios from "axios";
import { Project, DataTypeProject } from "@/interfaces";
import { Table, Button, message, Modal, Space, Form, Input } from "antd";
import ProjectNpcDetailsDrawer from "@/components/Drawers/ProjectNpcDetailsDrawer";

const ProjectsTable: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedRows, setSelectedRows] = useState<DataTypeProject[]>([]);
  const [modalData, setModalData] = useState<Project>({
    id: 0,
    name: "",
    description: "",
    npcs: [],
    user_id: 0,
  });
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    {
      title: "Action",
      key: "action",
      render: (project: Project) => (
        <Space size="middle">
          <a onClick={() => showModal(project)}>Edit</a>
          <a onClick={openDetailsDrawer}>View NPCs</a>
          <Modal
            title="Edit Project"
            open={visible}
            onOk={form.submit}
            onCancel={handleCancel}
            width={1000}
            centered={true}
          >
            <Form form={form} onFinish={() => handleEdit()}>
              <Form.Item
                name={["project", "name"]}
                label="Name"
                initialValue={modalData.name}
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="project name"
                  defaultValue={modalData.name}
                />
              </Form.Item>
              <Form.Item
                name={["project", "description"]}
                label="Description"
                initialValue={modalData.description}
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="project description"
                  defaultValue={modalData.description}
                />
              </Form.Item>
            </Form>
          </Modal>
          <ProjectNpcDetailsDrawer
            open={drawerOpen}
            onClose={handleCloseDrawer}
            project={project}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    axios.get<Project[]>("/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  useEffect(() => {
    const data = modalData;
    form.resetFields();
    setModalData(data);
  }, [modalData]);

  // the dataSource prop for the Table component expects an array of DataType objects (so convert projects to DataType for ANTD)
  const projectsData: DataTypeProject[] = projects.map((project) => ({
    key: project.id,
    id: project.id,
    name: project.name,
    description: project.description,
    npcs: project.npcs,
    userId: project.user_id,
  }));

  const showModal = (project: Project) => {
    setModalData(project);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const success = (message: string) => {
    messageApi.open({
      type: "success",
      content: `Project(s) ${message} successfully.`,
    });
  };

  const failure = (message: string) => {
    messageApi.open({
      type: "error",
      content: `Project(s) ${message} unsuccessfully.`,
    });
  };

  const handleDelete = async () => {
    try {
      const selectedProjects = [...selectedRows]; // assuming selectedRows is an array of project IDs
      for (let i = 0; i < selectedProjects.length; i++) {
        const projectId = selectedProjects[i].id;
        await axios.delete(`/projects/${projectId}`);
      }
      success("deleted");
    } catch (error) {
      failure("deleted");
    }
  };

  const handleEdit = () => {
    form.validateFields().then((values) => {
      const updatedProject = {
        name: values.project.name,
        description: values.project.description,
      };
      axios
        .put(`projects/${modalData.id}`, updatedProject)
        .then(() => {
          setVisible(false);
          success("updated");
        })
        .catch((error) => {
          console.error("Error editing intent: ", error);
        });
    });
  };

  const openDetailsDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const hasSelectedRows = selectedRows.length > 0;

  // highlights and grabs the data of item selected in table
  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: DataTypeProject[]
    ) => {
      setSelectedRows(selectedRows);
    },
  };

  return (
    <div>
      {contextHolder}
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
