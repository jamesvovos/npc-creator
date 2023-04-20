import React, { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  Space,
  Descriptions,
  Avatar,
  Modal,
  Input,
  Select,
  Form,
  message,
} from "antd";
import type { DrawerProps } from "antd/es/drawer";
import { EditOutlined, SoundOutlined } from "@ant-design/icons";
import { NPCDetailsDrawerProps, Intent, NPC } from "@/interfaces";
import axios from "axios";
import CreateAvatarModal from "@/components/Modals/CreateAvatarModal";

const NpcDetailsDrawer: React.FC<NPCDetailsDrawerProps> = ({
  open,
  onClose,
  npc,
}) => {
  const [size, setSize] = useState<DrawerProps["size"]>();
  const [visible, setVisible] = useState(false);
  const [intents, setIntents] = useState<Intent[]>([]);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { Option } = Select;
  const [hover, setHover] = useState(false);
  const [isAvatarCreatorVisible, setIsAvatarCreatorVisible] = useState(false);

  const [modalData, setModalData] = useState<NPC>({
    id: 0,
    name: "",
    avatar: "",
    bio: "",
    voice: "",
    style: "",
    intents: [],
  });

  const previewVoice = async (npc: NPC) => {
    const text = encodeURIComponent(
      "Hey there! this is a preview of my voice and tone."
    );
    const url = `http://localhost:8000/chat/voice?voice_name=${npc.voice}&text=${text}&style=${npc.style}`;
    try {
      await axios.post(url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleEditAvatar = () => {
    setIsAvatarCreatorVisible(!isAvatarCreatorVisible);
  };

  useEffect(() => {
    setSize(open ? "large" : undefined);
  }, [open]);

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

  const success = () => {
    messageApi.open({
      type: "success",
      content: `NPC updated successfully!`,
    });
  };

  const showModal = (NPC: NPC) => {
    setModalData(NPC);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEdit = () => {
    form.validateFields().then((values) => {
      const updatedNPC = {
        name: values.name,
        avatar: values.avatar,
        bio: values.bio,
        voice: values.voice,
        style: values.style,
        intents: [],
      };

      // Remove null values from tags
      const tags = values.intents.filter((tag: string) => tag !== null);

      // Fetch matching intents
      axios
        .get("intents", {
          params: {
            tags: tags.join(","),
          },
        })
        .then((response) => {
          updatedNPC.intents = response.data.filter((intent: Intent) =>
            tags.includes(intent.tag)
          );

          // Send PUT request with updated NPC object
          axios
            .put(`npcs/${modalData.id}`, updatedNPC)
            .then(() => {
              setVisible(false);
              success();
            })
            .catch((error) => {
              console.error("Error editing NPC: ", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching intents: ", error);
        });
    });
  };

  return (
    <>
      {contextHolder}
      <Drawer
        title={`${npc.name} Details:`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button type="primary" onClick={() => showModal(npc)}>
              Edit NPC <EditOutlined key="edit" />
            </Button>
          </Space>
        }
      >
        <div
          className="avatar-wrapper"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Avatar
            src={npc?.avatar}
            size={200}
            style={{
              marginBottom: 30,
              borderColor: "#0099FF",
              borderWidth: 3,
            }}
          />
          {hover && (
            <div
              className="avatar-overlay"
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "50%",
              }}
            >
              <div onClick={handleEditAvatar}>
                <EditOutlined
                  style={{ marginRight: 8, color: "#fff", fontSize: 16 }}
                />
                <span style={{ color: "#fff", fontWeight: 600 }}>Edit</span>
              </div>
            </div>
          )}
        </div>
        {isAvatarCreatorVisible && <CreateAvatarModal npc={npc} />}

        <Descriptions bordered column={{ lg: 1 }}>
          <Descriptions.Item label="NPC Name:">{npc?.name}</Descriptions.Item>
          <Descriptions.Item label="Avatar:">{npc?.avatar}</Descriptions.Item>
          <Descriptions.Item label="Bio:">{npc?.bio}</Descriptions.Item>
          <Descriptions.Item label="Voice:">{npc?.voice}</Descriptions.Item>
          <Descriptions.Item label="Style:">{npc?.style}</Descriptions.Item>
          <Descriptions.Item label="Intent Tags:">
            {npc.intents
              .map(
                (intent) =>
                  intent.tag.charAt(0).toUpperCase() + intent?.tag.slice(1)
              )
              .join(", ")}
          </Descriptions.Item>
        </Descriptions>
        <Button
          type="primary"
          onClick={() => previewVoice(npc)}
          style={{ marginTop: 20 }}
        >
          Preview Voice <SoundOutlined key="playsound" />
        </Button>
      </Drawer>
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
              <Option value="en-US-JennyNeural">Jenny</Option>
              <Option value="en-US-GuyNeural">Guy</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="style"
            label="Style"
            initialValue={modalData.style}
            rules={[{ required: true, message: "select a style for your NPC" }]}
          >
            <Select placeholder="select a style" defaultValue={modalData.style}>
              <Option value="cheerful">cheerful</Option>
              <Option value="angry">angry</Option>
              <Option value="whispering">whispering</Option>
              <Option value="terrified">terrified</Option>
              <Option value="sad">sad</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="intents"
            label="Intents"
            initialValue={modalData.intents?.map((intent) => intent.tag) || []}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Select intents by tag"
              onChange={(value) => form.setFieldsValue({ intents: value })}
            >
              {intents.map((intent) => (
                <Option key={intent.id} value={intent.tag}>
                  {intent.tag}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NpcDetailsDrawer;
