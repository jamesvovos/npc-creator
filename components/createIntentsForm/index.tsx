import axios from "axios";
import React, { useState, useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required.",
  types: {
    pattern: "${label} is not a valid pattern.",
    response: "${label} is not a valid response.",
  },
};
/* eslint-enable no-template-curly-in-string */

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const onFinish = (data: {
  intent: { tag: string };
  patterns: string[];
  responses: string[];
}) => {
  console.log(data);
  axios.post<any>("intents/create", {
    tag: data.intent.tag,
    patterns: data.patterns.map((pattern) => ({ text: pattern })),
    responses: data.responses.map((response) => ({ text: response })),
  });
};

const CreateIntentForm: React.FC = () => (
  <Card title="Create Intent" style={{ margin: 20 }}>
    <Form
      {...formItemLayout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      // validateMessages={validateMessages}
    >
      <Form.Item
        name={["intent", "tag"]}
        label="Tag"
        rules={[{ required: true }]}
      >
        <Input placeholder="tag" />
      </Form.Item>
      <Form.List name="patterns">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? "Patterns" : ""}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Add a pattern.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="pattern" style={{ width: "60%" }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
              >
                Add pattern
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.List name="responses">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? "Responses" : ""}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Add a response.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="response" style={{ width: "60%" }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
              >
                Add response
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
        <Button type="primary" htmlType="submit">
          Create new intent
        </Button>
      </Form.Item>
    </Form>
  </Card>
);

export default CreateIntentForm;
