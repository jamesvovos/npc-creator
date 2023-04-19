import React, { useState } from "react";
import ReadyPlayerMe from "@/components/ReadyPlayerMe";
import { Modal } from "antd";
import { NPCCardProps } from "@/interfaces";

export default function CreateAvatarModal({ npc }: NPCCardProps): JSX.Element {
  const [visible, setVisible] = useState(true);

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Modal
        title={`Create a new Avatar for ${npc.name}`}
        open={visible}
        onCancel={handleCancel}
        width={"80%"}
        bodyStyle={{ height: "1000px" }}
        centered={true}
        footer={null}
      >
        <ReadyPlayerMe id={npc.id} />
      </Modal>
    </div>
  );
}
