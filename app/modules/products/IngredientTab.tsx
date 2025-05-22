import { Col, Form, Input, Row, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const IngredientsTabs = () => {
  return (
    <Form.List name="ingredients">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Row gutter={16} key={key} align="middle">
              <Col span={10}>
                <Form.Item
                  {...restField}
                  name={[name, "name_ingradient"]}
                  label="Tên thành phần"
                  rules={[{ required: true, message: "Vui lòng nhập thành phần" }]}
                >
                  <Input placeholder="Nhập thành phần" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  {...restField}
                  name={[name, "concentration"]}
                  label="Hàm lượng"
                  rules={[{ required: true, message: "Vui lòng nhập hàm lượng" }]}
                >
                  <Input placeholder="Nhập hàm lượng" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Button
                  type="text"
                  icon={<MinusCircleOutlined />}
                  onClick={() => remove(name)}
                  danger
                />
              </Col>
            </Row>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Thêm thành phần
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default IngredientsTabs;