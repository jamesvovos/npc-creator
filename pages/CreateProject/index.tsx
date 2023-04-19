import React, { useState } from "react";
import { Card } from "antd";
import ProjectsTable from "@/components/Tables/ProjectsTable";
import CreateProjectModal from "@/components/Modals/CreateProjectModal";

export default function CreateProjects() {
  return (
    <>
      <CreateProjectModal />
      <Card title="My projects">
        <ProjectsTable />
      </Card>
    </>
  );
}
