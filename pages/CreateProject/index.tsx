import React, { useState } from "react";
import { Card } from "antd";
import EmptyProject from "@/components/EmptyProjects";
import ProjectsTable from "@/components/Tables/ProjectsTable";

export default function CreateProjects() {
  return (
    <>
      <Card title="Create a new project">
        <EmptyProject />
      </Card>
      <Card>
        <ProjectsTable />
      </Card>
    </>
  );
}
