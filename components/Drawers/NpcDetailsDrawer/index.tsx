import React, { useState, useEffect } from "react";
import { Button, Drawer, Space, Descriptions, Avatar } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import { NPCDetailsDrawerProps } from "@/interfaces";

const NpcDetailsDrawer: React.FC<NPCDetailsDrawerProps> = ({
  open,
  onClose,
  npc,
}) => {
  const [size, setSize] = useState<DrawerProps["size"]>();

  useEffect(() => {
    setSize(open ? "large" : undefined);
  }, [open]);

  return (
    <>
      <Drawer
        title={`${npc.name} Details:`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button type="primary" onClick={onClose}>
              Close
            </Button>
          </Space>
        }
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src={npc.avatar}
            size={200}
            style={{ marginBottom: 30, borderColor: "#0099FF", borderWidth: 3 }}
          />
        </div>
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
      </Drawer>
    </>
  );
};

export default NpcDetailsDrawer;
