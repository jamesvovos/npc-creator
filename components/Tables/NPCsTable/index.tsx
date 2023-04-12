import React, { useState, useEffect } from "react";
import axios from "axios";
import { NPC, DataTypeNPC } from "@/interfaces";
import { Table, Button, message, Modal, Space, Form, Input } from "antd";

const NPCsTable: React.FC = () => {
  const [npcs, setnpcs] = useState<NPC[]>([]);
  const [selectedRows, setSelectedRows] = useState<DataTypeNPC[]>([]);
  const [modalData, setModalData] = useState<NPC>({
    id: 0,
    name: "",
    avatar: "",
    bio: "",
    voice: "",
    style: "",
  });
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // columns we want to display in the table
  const columns = [
    {
      title: "NPC ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Voice",
      dataIndex: "voice",
    },
    {
      title: "Style",
      dataIndex: "style",
    },
    {
      title: "Action",
      key: "action",
      render: (NPC: NPC) => (
        <Space size="middle">
          <a onClick={() => showModal(NPC)}>Edit</a>
          <Modal
            title="Edit NPC"
            open={visible}
            onOk={form.submit}
            onCancel={handleCancel}
            width={1000}
            centered={true}
          >
            <Form form={form} onFinish={() => handleEdit()}>
              <Form.Item
                name={["NPC", "name"]}
                label="Name"
                initialValue={modalData.name}
                rules={[{ required: true }]}
              >
                <Input placeholder="NPC name" defaultValue={modalData.name} />
              </Form.Item>
              <Form.Item
                name={["NPC", "voice"]}
                label="Voice"
                initialValue={modalData.voice}
                rules={[{ required: true }]}
              >
                <Input placeholder="NPC voice" defaultValue={modalData.voice} />
              </Form.Item>
              <Form.Item
                name={["NPC", "style"]}
                label="Style"
                initialValue={modalData.style}
                rules={[{ required: true }]}
              >
                <Input placeholder="NPC style" defaultValue={modalData.style} />
              </Form.Item>
            </Form>
          </Modal>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    axios.get<NPC[]>("/npcs").then((response) => {
      setnpcs(response.data);
    });
  }, []);

  useEffect(() => {
    const data = modalData;
    form.resetFields();
    setModalData(data);
  }, [modalData]);

  // the dataSource prop for the Table component expects an array of DataType objects (so convert npcs to DataType for ANTD)
  const npcsData: DataTypeNPC[] = npcs.map((NPC) => ({
    key: NPC.id,
    id: NPC.id,
    name: NPC.name,
    avatar: NPC.avatar,
    bio: NPC.bio,
    voice: NPC.voice,
    style: NPC.style,
  }));

  const showModal = (NPC: NPC) => {
    setModalData(NPC);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const success = (message: string) => {
    messageApi.open({
      type: "success",
      content: `NPC(s) ${message} successfully.`,
    });
  };

  const failure = (message: string) => {
    messageApi.open({
      type: "error",
      content: `NPC(s) ${message} unsuccessfully.`,
    });
  };

  const handleDelete = async () => {
    try {
      const selectednpcs = [...selectedRows]; // assuming selectedRows is an array of NPC IDs
      for (let i = 0; i < selectednpcs.length; i++) {
        const NPCId = selectednpcs[i].id;
        await axios.delete(`/npcs/${NPCId}`);
      }
      success("deleted");
    } catch (error) {
      failure("deleted");
    }
  };

  const handleEdit = () => {
    form.validateFields().then((values) => {
      const updatedNPC = {
        name: values.NPC.name,
        voice: values.NPC.voice,
        style: values.NPC.style,
      };
      axios
        .put(`npcs/${modalData.id}`, updatedNPC)
        .then(() => {
          setVisible(false);
          success("updated");
        })
        .catch((error) => {
          console.error("Error editing intent: ", error);
        });
    });
  };

  const hasSelectedRows = selectedRows.length > 0;

  // highlights and grabs the data of item selected in table
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataTypeNPC[]) => {
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
        dataSource={npcsData}
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

export default NPCsTable;
