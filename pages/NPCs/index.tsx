import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "antd";
import CreateNPCModal from "@/components/Modals/CreateNPCModal";
import NPCsTable from "@/components/Tables/NPCsTable";
import NPCCard from "@/components/Cards/NPCCard";
import { NPC } from "@/interfaces";

export default function NPCs(): JSX.Element {
  const [npcs, setNPCs] = useState<NPC[]>([]);

  useEffect(() => {
    axios.get<NPC[]>("/npcs").then((response) => {
      setNPCs(response.data);
      console.log(response.data[0].avatar);
    });
  }, []);

  return (
    <>
    <CreateNPCModal />
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {/* loop through all the NPCs and create cards with the objects */}
      {npcs.map((npc) => {
        return <NPCCard npc={npc} />;
      })}
    </div>
    <NPCsTable />
    </>
  );
}
