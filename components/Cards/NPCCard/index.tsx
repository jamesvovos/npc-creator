import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Modal, message, Form, Input, Select } from "antd";
import { NPCCardProps } from "@/interfaces";
import { NPC } from "@/interfaces";
import axios from "axios";

const { Meta } = Card;

const NPCCard: React.FC<NPCCardProps> = ({ npc }) => {
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
  const { Option } = Select;

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
      content: `NPC ${message} unsuccessfully.`,
    });
  };

  const handleEdit = () => {
    form.validateFields().then((values) => {
      const updatedNPC = {
        name: values.name,
        avatar: values.avatar,
        bio: values.bio,
        voice: values.voice,
        style: values.style,
      };
      axios
        .put(`npcs/${modalData.id}`, updatedNPC)
        .then(() => {
          setVisible(false);
          success("deleted");
        })
        .catch((error) => {
          console.error("Error editing NPC: ", error);
        });
    });
  };

  const handleDelete = (id: number) => {
    axios.delete(`/npcs/${id}`);
    success("deleted");
  };

  useEffect(() => {
    const data = modalData;
    form.resetFields();
    setModalData(data);
  }, [modalData]);
  return (
    <div>
      {contextHolder}
      <Card
        style={{ width: 300, marginRight: 30, marginBottom: 30 }}
        cover={
          <img
            alt="example"
            src="https://cdn.segmentnextimages.com/wp-content/uploads/2011/11/vendors.jpg"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" onClick={() => showModal(npc)} />,
          <DeleteOutlined key="delete" onClick={() => handleDelete(npc.id)} />,
        ]}
      >
        <Meta
          avatar={<Avatar src={npc.avatar} />}
          title={npc.name}
          description={npc.bio}
        />
        <div
          style={{ marginLeft: 48, alignContent: "center", color: "#0099FF" }}
        >
          <p>{npc.voice}</p>
        </div>
      </Card>
      <Modal
        title={`Editing ${npc.name} NPC`}
        open={visible}
        onOk={form.submit}
        onCancel={handleCancel}
        width={1000}
        centered={true}
      >
        <Form form={form} onFinish={() => handleEdit()}>
          <Form.Item
            name="name"
            label="Name"
            initialValue={modalData.name}
            rules={[{ required: true }]}
          >
            <Input placeholder="NPC name" defaultValue={modalData.name} />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="Avatar"
            initialValue={modalData.avatar}
            rules={[{ required: false }]}
          >
            <Input
              placeholder="NPC avatar image address"
              defaultValue={modalData.avatar}
            />
          </Form.Item>
          <Form.Item
            name="bio"
            label="Bio"
            initialValue={modalData.bio}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="NPC bio/description"
              defaultValue={modalData.bio}
            />
          </Form.Item>
          <Form.Item
            name="voice"
            label="Voice"
            initialValue={modalData.voice}
            rules={[{ required: true, message: "select a voice for your NPC" }]}
          >
            <Select placeholder="select a voice" defaultValue={modalData.voice}>
              <Option value="IBM Watson">IBM Watson</Option>
              <Option value="MS Azure">MS Azure</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="style"
            label="Style"
            initialValue={modalData.style}
            rules={[{ required: true, message: "select a style for your NPC" }]}
          >
            <Select placeholder="select a style" defaultValue={modalData.style}>
              <Option value="Happy">Happy</Option>
              <Option value="Angry">Angry</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NPCCard;
