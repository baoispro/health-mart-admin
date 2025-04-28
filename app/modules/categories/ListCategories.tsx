import { useEffect, useState } from "react";
import { Table, Space, Typography, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getAllCategories } from "~/api/product";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import UpsertProductCategories from "./UpsertProductCategories";

const { Title, Text } = Typography;

export default function ProductCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false); // thêm state mở modal
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      const formatted = flattenCategories(data);
      setCategories(formatted);
      message.success("Lấy danh sách danh mục thành công!");
    } catch (err) {
      message.error("Lỗi khi lấy danh sách danh mục!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const flattenCategories = (categories: any[]) => {
    const result: any[] = [];

    const walk = (nodes: any[], prefix = "") => {
      for (const node of nodes) {
        const { children, parent, ...rest } = node; // Tách children và parent riêng

        result.push({
          ...rest,
          name: prefix + node.name,
          parent: parent ? parent.name : null,
          parent_id: parent ? parent.category_id : null,
        });

        if (children && children.length > 0) {
          walk(children, prefix + "|-- ");
        }
      }
    };

    walk(categories); // 🚀 đi luôn cả mảng chứ không filter cha-con nữa

    return result;
  };

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      width: "10%",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingCategoryId(record.category_id);
              setOpenModal(true);
            }}
          >
            Edit
          </Button>

          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => console.log("Delete", record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="p-6 bg-white rounded shadow">
        <div className="mb-5 flex justify-between items-center">
          <div>
            <Title level={3}>Product Category</Title>
            <Text type="secondary">List Category</Text>
          </div>
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            onClick={() => setOpenModal(true)}
          >
            Add Category
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={categories}
          rowKey="category_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </div>

      <UpsertProductCategories
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingCategoryId(null);
        }}
        onSuccess={fetchCategories}
        categoryId={editingCategoryId} // ✨ truyền id
        mode={editingCategoryId ? "edit" : "create"}
      />
    </>
  );
}
