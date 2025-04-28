import { Button, Form, Input, Layout, Row, Col, message } from "antd";
import { useNavigate } from "react-router";
import { loginAPI } from "~/api/auth";
import { useAuth } from "~/hooks/useAuth";

const { Content } = Layout;
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const res = await loginAPI(values);

      login({
        username: res.data.user.fullName, // 👈 Lấy từ user.fullName
        accessToken: res.data.token, // 👈 token
        refreshToken: res.data.refreshToken, // 👈 refreshToken
        userId: res.data.user.id, // 👈 userId
      });

      message.success("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      message.error("Đăng nhập thất bại!");
    }
  };

  return (
    <Layout>
      <Content>
        <Row style={{ minHeight: "100vh" }} justify="center" align="middle">
          <Col span={6}>
            <Form layout="vertical" onFinish={handleLogin}>
              <Form.Item
                name="email"
                label="Gmail"
                rules={[{ required: true }]}
              >
                <Input placeholder="Nhập gmail của bạn" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đăng nhập
              </Button>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
