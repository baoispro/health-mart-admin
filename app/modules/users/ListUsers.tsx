import { useEffect, useState } from "react";
import { Table, Button, Space, Typography, message, Modal, Form, Input, Select } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { getAllUsers, createUser, updateUser, deleteUser } from "~/api/user";

const { Title, Text } = Typography;
const { Option } = Select;

interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  createdAt?: string;
}

export default function ListUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      message.error("Lỗi khi tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      message.success("Xóa người dùng thành công");
      fetchUsers();
    } catch (error) {
      message.error("Lỗi khi xóa người dùng");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingUser) {
        await updateUser(editingUser.id, values);
        message.success("Cập nhật người dùng thành công");
      } else {
        await createUser(values);
        message.success("Tạo người dùng thành công");
      }

      setIsModalOpen(false);
      fetchUsers();
    } catch (error: any) {
      if (error.response?.status === 409) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes("Email") || errorMessage.includes("số điện thoại")) {
          form.setFields([
            {
              name: "phone",
              errors: ["Email hoặc số điện thoại đã tồn tại!"],
            },
          ]);
        }
      } else {
        message.error("Đã xảy ra lỗi, vui lòng thử lại");
      }
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: 120,
      render: (avatar: string) => (
        <img
          src={avatar}
          alt="avatar"
          style={{
            width: 120,
            height: 120,
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="mb-6">
        <Title level={3}>Users</Title>
        <Text type="secondary">List User</Text>
        <Button type="primary" className="float-right" onClick={handleAddUser}>
          <PlusCircleFilled style={{ marginRight: 8 }} />
          Add User
        </Button>
      </div>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 5 }}
        bordered
      />

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="avatar"
            label="Avatar URL"
            rules={[
              { required: false },
              { type: "url", message: "Vui lòng nhập một URL hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              { required: true, message: "Tên không được để trống" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email không được để trống" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Số điện thoại không được để trống" },
              {
                pattern: /^(0[1-9][0-9]{8,9})$/,
                message:
                  "Số điện thoại không hợp lệ, phải có 10 hoặc 11 chữ số và bắt đầu bằng số 0",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[
              { required: true, message: "Vui lòng chọn vai trò" },
            ]}
          >
            <Select>
              <Option value="customer">Customer</Option>
              <Option value="admin">Admin</Option>
              <Option value="seller">Seller</Option>
            </Select>
          </Form.Item>

          {!editingUser && (
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Mật khẩu không được để trống" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
}
