import React, { useState } from "react";
import { SettingOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Card, message, Popconfirm } from "antd";
import NpcDetailsDrawer from "@/components/Drawers/NpcDetailsDrawer";
import { NPCCardProps } from "@/interfaces";
import axios from "axios";

const { Meta } = Card;

const NPCCard: React.FC<NPCCardProps> = ({ npc }) => {
  const [displayPopup, setDisplayPopup] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCancelDelete = () => {
    setDisplayPopup(false);
  };

  const openConfirmPopup = () => {
    setDisplayPopup(true);
  };

  const openDetailsDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: `NPC deleted successfully.`,
    });
  };

  const handleDelete = (id: number) => {
    axios.delete(`/npcs/${id}`);
    success();
  };

  return (
    <div>
      {contextHolder}
      <Card
        hoverable={true}
        style={{ width: 300, marginRight: 30, marginBottom: 30 }}
        cover={
          <img
            alt="example"
            src="https://cdn.segmentnextimages.com/wp-content/uploads/2011/11/vendors.jpg"
          />
        }
        actions={[
          <SettingOutlined key="setting" onClick={openDetailsDrawer} />,
          <DeleteOutlined key="delete" onClick={openConfirmPopup} />,
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
      <NpcDetailsDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        npc={npc}
      />
      <Popconfirm
        title={`Do you want to delete ${npc.name}?`}
        description="Are you sure to delete this NPC?"
        okText="Yes"
        cancelText="No"
        placement="bottomLeft"
        open={displayPopup}
        onCancel={handleCancelDelete}
        onConfirm={() => handleDelete(npc.id)}
      ></Popconfirm>
    </div>
  );
};

export default NPCCard;
