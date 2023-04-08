import React, { useState } from "react";
import { Card } from "antd";
import EmptyProject from "@/components/EmptyProjects";
import ProjectsTable from "@/components/Tables/ProjectsTable";
import CreateProjectModal from "@/components/Modals/CreateProjectModal";

export default function CreateProjects() {
  return (
    <>
      {/* <Card title="Create a new project">
        <EmptyProject />
      </Card> */}
      <CreateProjectModal />
      <Card title="My projects">
        <ProjectsTable />
      </Card>
    </>
  );
}
