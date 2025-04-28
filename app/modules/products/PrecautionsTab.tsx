import { Col, Form, Input, Row } from "antd";

const PrecautionsTab = () => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name="description_precautions"
          label="Nội dung lưu ý của sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập lưu ý" }]}
        >
          <Input.TextArea placeholder="Nội dung lưu ý của sản phẩm" rows={10} />
        </Form.Item>
      </Col>
    </>
  );
};

export default PrecautionsTab;
