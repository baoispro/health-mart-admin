import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useAuth } from "~/hooks/useAuth";
import { updateUser } from "~/api/user";
import { toast } from "react-toastify";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose }) => {
  const { user } = useAuth();
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.username,
        email: user.user.name,
        phone: user.user.phone,
        avatar: user.user.avatar,
      });
    }
  }, [user, form]);

  const handleSubmit = async (values: any) => {
    try {
      if (!user?.userId) {
        throw new Error("User ID is required");
      }
      const updatedUser = await updateUser(user.userId, values);
      if (!updatedUser) {
        toast.success("Cập nhật thành công!");
      }
      toast.success("Cập nhật thành công!");
      onClose();
    } catch (err) {
      toast.error("Cập nhật thất bại!");
    }
  };

  return (
    <Modal
      open={open}
      title="Thông tin cá nhân"
      onCancel={onClose}
      onOk={form.submit}
      okText="Cập nhật"
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Avatar">
          <Upload showUploadList={false}>
            <Button icon={<UploadOutlined />}>Tải lên</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileModal;
