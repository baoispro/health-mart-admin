import { Button, Form, Input, Layout, Row, Col, message } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { loginAPI } from "~/api/auth";
import { useAuth } from "~/hooks/useAuth";

const { Content } = Layout;
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const res = await loginAPI(values);
      const user = res.data.user;

      if (user.role !== "admin") {
        toast.error("Chỉ tài khoản quản trị (admin) mới được đăng nhập!");
        return;
      }

      login({
        username: res.data.user.fullName,
        accessToken: res.data.token,
        refreshToken: res.data.refreshToken,
        userId: res.data.user.id,
        user: res.data.user,
      });

      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      toast.error("Đăng nhập thất bại!");
    }
  };

  return (
    <Layout>
      <Content>
        <Row style={{ minHeight: "100vh" }} justify="center" align="middle">
          <Col span={6}>
            {/* Thêm logo banner */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src="../../public/logo-long-chau.jpg"
                alt="Logo"
                style={{
                  maxWidth: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              />
            </div>
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
              <Row gutter={8} justify="space-between">
                <Col span={24}>
                  <Button type="primary" htmlType="submit" block>
                    Đăng nhập
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
