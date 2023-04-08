import { Card, Descriptions, Divider, List, Button } from "antd";
export default function DataTable() {
  return (
    <Card title={"Order Title"} style={{ margin: 20 }}>
      <Descriptions bordered column={{ lg: 1 }}>
        <Descriptions.Item label="Customer">James Vovos</Descriptions.Item>
        <Descriptions.Item label="Customer Address">
          7 Fake Street, Fake City, FakeLand
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
