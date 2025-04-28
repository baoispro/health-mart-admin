import { Col, Form, Input, Row } from "antd";

const SideEffectsTab = () => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name="description_side_effects"
          label="Nội dung tác dụng phụ của sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập tác dụng phụ" }]}
        >
          <Input.TextArea
            placeholder="Nội dung tác dụng phụ của sản phẩm"
            rows={10}
          />
        </Form.Item>
      </Col>
    </>
  );
};

export default SideEffectsTab;
