import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateNpcModal from "@/components/Modals/CreateNpcModal";
import NpcCard from "@/components/Cards/NpcCard";
import { NPC } from "@/interfaces";

export default function NPCs(): JSX.Element {
  const [npcs, setNPCs] = useState<NPC[]>([]);

  useEffect(() => {
    axios.get<NPC[]>("/npcs").then((response) => {
      setNPCs(response.data);
    });
  }, []);

  return (
    <>
      <CreateNpcModal />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* loop through all the NPCs and create cards with the objects */}
        {npcs.map((npc) => {
          return <NpcCard npc={npc} />;
        })}
      </div>
    </>
  );
}
