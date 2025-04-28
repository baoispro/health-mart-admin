import { Col, Form, Input, Row } from "antd";

const IngredientsTabs = () => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name="name_ingradient"
          label="Tên thành phần của sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập thành phần" }]}
        >
          <Input placeholder="Nhập thành phần của sản phẩm" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="concentration"
          label="Hàm lượng"
          rules={[{ required: true, message: "Vui lòng nhập hàm lượng" }]}
        >
          <Input placeholder="Nhập hàm lượng của sản phẩm" />
        </Form.Item>
      </Col>
    </>
  );
};

export default IngredientsTabs;
