import React, { useState, useEffect } from "react";
import { Button, Drawer, Space, Descriptions } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import { ProjectNPCDetailsDrawerProps } from "@/interfaces";
import NPCCard from "@/components/Cards/NpcCard";

const ProjectNpcDetailsDrawer: React.FC<ProjectNPCDetailsDrawerProps> = ({
  open,
  onClose,
  project,
}) => {
  const [size, setSize] = useState<DrawerProps["size"]>();

  useEffect(() => {
    setSize(open ? "large" : undefined);
    console.log(project);
  }, [open]);

  return (
    <>
      <Drawer
        title={`Manage NPC's in ${project.name}:`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button type="primary" onClick={() => onClose()}>
              Close
            </Button>
          </Space>
        }
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* loop through all the NPCs and create cards with the objects */}
          {project.npcs?.map((npc) => {
            return <NPCCard npc={npc} />;
          })}
        </div>
      </Drawer>
    </>
  );
};

export default ProjectNpcDetailsDrawer;
