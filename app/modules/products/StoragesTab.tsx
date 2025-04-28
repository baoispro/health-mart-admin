import { Col, Form, Input, Row } from "antd";

const StoragesTab = () => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name="description_storage"
          label="Nội dung cách bảo quản của sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập cách bảo quản" }]}
        >
          <Input.TextArea
            placeholder="Nội dung cách bảo quản của sản phẩm"
            rows={10}
          />
        </Form.Item>
      </Col>
    </>
  );
};

export default StoragesTab;
