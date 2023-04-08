import React from "react";
import { Button, Empty } from "antd";

const EmptyProject: React.FC = () => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{ height: 60 }}
    description={
      <span>
        Customize <a href="#API">Project</a>
      </span>
    }
  >
    <Button type="primary">Create a new project</Button>
  </Empty>
);

export default EmptyProject;