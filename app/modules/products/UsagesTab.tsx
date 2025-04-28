import { Col, Form, Input, Row } from "antd";

const UsagesTabs = () => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name="description_usages"
          label="Nội dung công dụng của sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập công dụng" }]}
        >
          <Input.TextArea
            placeholder="Nội dung công dụng của sản phẩm"
            rows={10}
          />
        </Form.Item>
      </Col>
    </>
  );
};

export default UsagesTabs;
