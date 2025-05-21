import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Typography,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  getAllPolicies,
  createPolicy,
  updatePolicy,
  deletePolicy,
} from "~/api/policy";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

interface Policy {
  id: number;
  slug: string;
  title: string;
  content: string;
}

export default function ListPolicies() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const data = await getAllPolicies();
      setPolicies(data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách chính sách");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPolicy = () => {
    setEditingPolicy(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditPolicy = (policy: Policy) => {
    setEditingPolicy(policy);
    form.setFieldsValue(policy);
    setIsModalOpen(true);
  };

  const handleDeletePolicy = async (id: number) => {
    try {
      await deletePolicy(id.toString());
      toast.success("Xóa chính sách thành công");
      fetchPolicies();
    } catch (error) {
      toast.error("Lỗi khi xóa chính sách");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingPolicy) {
        await updatePolicy(editingPolicy.id.toString(), values);
        toast.success("Cập nhật chính sách thành công");
      } else {
        await createPolicy(values);
        toast.success("Tạo chính sách thành công");
      }

      setIsModalOpen(false);
      fetchPolicies();
    } catch (error: any) {
      if (error.response?.status === 409) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes("Slug") || errorMessage.includes("Title")) {
          form.setFields([
            {
              name: "title",
              errors: ["Slug hoặc Title đã tồn tại!"],
            },
          ]);
        }
      } else {
        toast.error("Đã xảy ra lỗi, vui lòng thử lại");
      }
    }
  };

  const columns: ColumnsType<Policy> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditPolicy(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeletePolicy(record.id)}
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
        <Title level={3}>Policies</Title>
        <Text type="secondary">List of Policies</Text>
        <Button
          type="primary"
          className="float-right"
          onClick={handleAddPolicy}
        >
          <PlusCircleFilled style={{ marginRight: 8 }} />
          Add Policy
        </Button>
      </div>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={policies}
        pagination={{ pageSize: 10 }}
        bordered
      />

      <Modal
        title={editingPolicy ? "Edit Policy" : "Add Policy"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true, message: "Slug không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Content không được để trống" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
