import React from "react";
import { Card } from "antd";
import CreateNPCModal from "@/components/Modals/CreateNPCModal";
import NPCsTable from "@/components/Tables/NPCsTable";

export default function NPCs(): JSX.Element {
  return (
    <>
      <CreateNPCModal />
      <Card title="NPC Creation" style={{ margin: 20 }}>
        <NPCsTable />
      </Card>
    </>
  );
}
