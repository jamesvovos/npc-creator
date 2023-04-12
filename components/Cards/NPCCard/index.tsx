import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { NPCCardProps } from "@/interfaces";

const { Meta } = Card;

const NPCCard: React.FC<NPCCardProps> = ({ npc }) => (
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
      <EditOutlined key="edit" />,
      <EllipsisOutlined
        key="ellipsis"
        onClick={() => console.log("pressed")}
      />,
    ]}
  >
    <Meta
      avatar={<Avatar src={npc.avatar} />}
      title={npc.name}
      description={npc.bio}
    />
    <div style={{ marginLeft: 48, alignContent: "center", color: "#0099FF" }}>
      <p>{npc.voice}</p>
    </div>
  </Card>
);

export default NPCCard;
