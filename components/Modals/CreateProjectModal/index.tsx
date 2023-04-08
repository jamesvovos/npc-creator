import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";

export default function CreateProjectModal(): JSX.Element {
  const userId: number = 1; // just for demo purposes
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

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
      content: "Project created successfully.",
    });
  };

  const handleSubmit = (data: { name: string; description: string }) => {
    axios.post<any>(`/users/${userId}/projects/`, {
      name: data.name,
      description: data.description,
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
        Create a new Project
      </Button>
      <Modal
        title="Create a new Project"
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
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input placeholder="description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
