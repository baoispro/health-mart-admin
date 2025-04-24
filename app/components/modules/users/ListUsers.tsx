import { useEffect, useState } from "react";
import { Table, Button, Space, Typography, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { getAllUsers } from "~/api/user";

const { Title, Text } = Typography;

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
            onClick={() => message.info(`Edit user ${record.id}`)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => message.info(`Delete user ${record.id}`)}
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
        <Button type="primary" className="float-right">
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
    </div>
  );
}
