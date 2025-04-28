import { Col, Form, Input, Row } from "antd";

const DosagesTab = () => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name="description_dosage"
          label="Nội dung cách dùng của sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập cách dùng" }]}
        >
          <Input.TextArea
            placeholder="Nội dung cách dùng của sản phẩm"
            rows={10}
          />
        </Form.Item>
      </Col>
    </>
  );
};

export default DosagesTab;
