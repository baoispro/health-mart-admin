import { useEffect, useState } from "react";
import { Table, Image, Space, Card, Typography, message, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getAllProducts } from "~/api/product";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const { Title, Text } = Typography;
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
      toast.success("Lấy danh sách sản phẩm thành công");
    } catch (err) {
      toast.error("Lỗi khi lấy danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns: ColumnsType<any> = [
    {
      title: "Hình ảnh",
      dataIndex: "image_url",
      key: "image_url",
      width: 120,
      render: (url: string) => {
        // Lấy link đầu tiên, loại bỏ khoảng trắng thừa
        const firstImg = url ? url.split(",")[0].trim() : "";
        return (
          <Image
            src={firstImg || "https://via.placeholder.com/60"}
            alt="Ảnh"
            width={120}
            height={120}
            style={{ objectFit: "cover" }}
            preview={false}
            fallback="https://via.placeholder.com/60"
          />
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Giá",
    //   dataIndex: "price",
    //   key: "price",
    //   render: (text: number) => `${text.toLocaleString()}₫`,
    // },
    {
      title: "Hãng",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Xuất xứ",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Danh mục",
      dataIndex: ["category", "name"],
      key: "category",
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
            onClick={() => navigate(`/products/${record.product_id}/edit`)}
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
        <div className="mb-5">
          <Title level={3}>Product</Title>
          <Text type="secondary">List products</Text>
          <Button
            type="primary"
            className="float-right"
            onClick={() => navigate("/products/create")}
          >
            <PlusCircleFilled style={{ marginRight: 8 }} />
            Add Product
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={products}
          rowKey="product_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </div>
    </>
  );
}
