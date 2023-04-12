import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Space,
  Table,
  Tag,
  Modal,
  Input,
  Form,
  Collapse,
  Button,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Intent, Pattern, Response, CustomTableProps } from "@/interfaces";

const { Panel } = Collapse;

export default function IntentsTable(): JSX.Element {
  const [intents, setIntents] = useState<Intent[]>([]);
  const [modalData, setModalData] = useState<Intent>({
    id: 0,
    tag: "",
    patterns: [],
    responses: [],
  });
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = (intent: Intent) => {
    setModalData(intent);
    setVisible(true);
  };

  const handleEdit = () => {
    form.validateFields().then((values) => {
      const updatedIntent = {
        tag: values.intent.tag,
        patterns: values.patterns
          ? values.patterns.map((pattern: Pattern) => ({
              text: pattern.text,
            }))
          : [],
        responses: values.responses
          ? values.responses.map((response: Response) => ({
              text: response.text,
            }))
          : [],
      };
      axios
        .put(`intents/${modalData.id}`, updatedIntent)
        .then(() => {
          setVisible(false);
          success("updated");
        })
        .catch((error) => {
          console.error("Error editing intent: ", error);
        });
    });
  };

  const success = (message: string) => {
    messageApi.open({
      type: "success",
      content: `Intent ${message} successfully.`,
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const deleteIntent = (id: number) => {
    axios.delete<any>(`intents/${id}`);
    success("deleted");
  };

  useEffect(() => {
    axios
      .get<Intent[]>("/intents")
      .then((response) => setIntents(response.data));
  }, []);

  useEffect(() => {
    const data = modalData;
    form.resetFields();
    setModalData(data);
  }, [modalData]);

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
      render: (_, intent) => (
        <Space size="middle">
          <a onClick={() => showModal(intent)}>Edit</a>
          <Modal
            title="Edit Intent Data"
            open={visible}
            onOk={form.submit}
            onCancel={handleCancel}
            width={1000}
            centered={true}
          >
            <Form form={form} onFinish={() => handleEdit()}>
              <Form.Item
                name={["intent", "tag"]}
                label="Tag"
                initialValue={modalData.tag}
                rules={[{ required: true }]}
              >
                <Input placeholder="tag" defaultValue={modalData.tag} />
              </Form.Item>
              <Collapse>
                <Panel header="Patterns" key="1">
                  {modalData.patterns.map((pattern, index) => (
                    <Form.Item
                      key={`pattern-${index}`}
                      name={["patterns", index, "text"]}
                      label={`Pattern ${index + 1}`}
                      initialValue={pattern.text}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="pattern" />
                    </Form.Item>
                  ))}
                </Panel>
                <Panel header="Responses" key="2">
                  {modalData.responses.map((response, index) => (
                    <Form.Item
                      key={`response-${index}`}
                      name={["responses", index, "text"]}
                      label={`Response ${index + 1}`}
                      initialValue={response.text}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="response" />
                    </Form.Item>
                  ))}
                </Panel>
              </Collapse>
            </Form>
          </Modal>

          <a onClick={() => deleteIntent(intent.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  const CustomTable: React.FC<CustomTableProps> = ({ data }) => (
    <Table columns={columns} dataSource={data} rowKey="id" />
  );

  return (
    <>
      {contextHolder}
      <CustomTable data={intents} />
    </>
  );
}
