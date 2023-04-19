import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Input, Modal, message, Select } from "antd";

export default function CreateNPCModal(): JSX.Element {
  const projectId: number = 1; // just for demo purposes
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { Option } = Select;

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "NPC created successfully.",
    });
  };

  const handleSubmit = (data: {
    name: string;
    avatar: string;
    bio: string;
    voice: string;
    style: string;
  }) => {
    axios.post<any>(`/projects/${projectId}/npc/`, {
      name: data.name,
      avatar: data.avatar,
      bio: data.bio,
      voice: data.voice,
      style: data.style,
    });
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
    success();
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {contextHolder}
      <Button
        type="primary"
        onClick={showModal}
        size="large"
        shape="round"
        style={{ marginBottom: 20 }}
      >
        Create a new NPC
      </Button>
      <Modal
        title="Create a new NPC"
        confirmLoading={confirmLoading}
        open={visible}
        onOk={form.submit}
        onCancel={handleCancel}
        width={1000}
        centered={true}
      >
        <Form form={form} onFinish={handleSubmit}>
          {/* Any input */}
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item name="avatar" label="Avatar" rules={[{ required: false }]}>
            <Input placeholder="avatar image address" />
          </Form.Item>
          <Form.Item name="bio" label="Bio" rules={[{ required: true }]}>
            <Input placeholder="npc bio/description" />
          </Form.Item>
          <Form.Item
            name="voice"
            label="Voice"
            rules={[{ required: true, message: "select a voice for your NPC" }]}
          >
            <Select placeholder="select a voice">
              <Option value="IBM Watson">IBM Watson</Option>
              <Option value="MS Azure">MS Azure</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="style"
            label="Style"
            rules={[{ required: true, message: "select a style for your NPC" }]}
          >
            <Select placeholder="select a style">
              <Option value="Happy">Happy</Option>
              <Option value="Angry">Angry</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
