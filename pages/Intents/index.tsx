import React from "react";
import { Card } from "antd";
import CreateIntentModal from "@/components/Modals/CreateIntentModal";
import IntentsTable from "@/components/Tables/IntentsTable";

export default function Intents(): JSX.Element {
  return (
    <>
      <CreateIntentModal />
      <Card title="Intents" style={{ margin: 20 }}>
        <IntentsTable />
      </Card>
    </>
  );
}
