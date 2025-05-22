import {
  Form,
  Input,
  Select,
  InputNumber,
  Row,
  Col,
  message,
  type FormInstance,
  Upload,
  Button,
  Cascader,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllCategories } from "~/api/product";
import { generateSlug } from "~/libs/helper";
import { toast } from "react-toastify";

export default function GeneralInfoTab({ form }: { form: FormInstance }) {
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategory, setLoadingCategory] = useState(false);

  const markOnlyLevel3Selectable = (nodes: any[]): any[] => {
    return nodes.map((node) => {
      if (node.children && node.children.length > 0) {
        return {
          ...node, 
          disabled: true, // không cho chọn cấp 1 và 2
          children: markOnlyLevel3Selectable(node.children),
        };
      }
      return node; // cấp 3 (không có children) được chọn
    });
  };

  const fetchCategories = async () => {
    setLoadingCategory(true);
    try {
      const data = await getAllCategories();
      const formatted = markOnlyLevel3Selectable(data);
      setCategories(formatted);
    } catch (e) {
      toast.error("Không thể tải danh mục");
    } finally {
      setLoadingCategory(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const formatCategoriesFlat = (categories: any[]) => {
    const result: { label: string; value: number }[] = [];

    const walk = (nodes: any[], prefix = "") => {
      for (const node of nodes) {
        result.push({
          label: node.name,
          value: node.category_id,
        });

        if (node.children && node.children.length > 0) {
          walk(node.children, prefix + "|-- ");
        }
      }
    };

    const rootNodes = categories.filter((cat) => cat.parent === null);
    walk(rootNodes);

    return result;
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Nhập tên sản phẩm"
              onBlur={(e) => {
                const value = e.target.value;
                if (value) {
                  const slug = generateSlug(value);
                  form.setFieldValue("slug", slug);
                }
              }}
            />
          </Form.Item>

          <Form.Item name="slug" label="Slug URL" rules={[{ required: true }]}>
            <Input placeholder="Nhập slug sản phẩm" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Giá phải là số" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Nhập giá sản phẩm"
              formatter={(value) =>
                value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
              }
            />
          </Form.Item>

          {/* brand */}
          <Form.Item
            name="brand"
            label="Hãng"
            rules={[
              { required: true, message: "Thương hiệu không được để trống" },
            ]}
          >
            <Input placeholder="Nhập hãng sản phẩm" />
          </Form.Item>

          {/* unit */}
          <Form.Item
            name="unit"
            label="Đơn vị"
            rules={[{ required: true, message: "Đơn vị không được để trống" }]}
          >
            <Input placeholder="Nhập đơn vị sản phẩm" />
          </Form.Item>

          {/* category_id */}
          <Form.Item
            name="category_id"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Cascader
              options={categories}
              placeholder="Chọn danh mục"
              changeOnSelect={false}
              displayRender={(labels) => labels.join(" / ")}
              fieldNames={{
                label: "name",
                value: "category_id",
                children: "children",
              }}
              showSearch
            />
          </Form.Item>

          {/* image_url */}
          <Form.Item
            name="image_url"
            label="Ảnh sản phẩm"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: "Vui lòng chọn ảnh sản phẩm" }]}
          >
            <Upload
              listType="picture-card"
              multiple
              beforeUpload={() => false} // không upload tự động
              accept="image/*"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Col>

        <Col span={12}>
          {/* specification */}
          <Form.Item
            name="specification"
            label="Quy cách"
            rules={[
              {
                required: true,
                message: "Thông số kỹ thuật không được để trống",
              },
            ]}
          >
            <Input placeholder="Nhập quy cách sản phẩm" />
          </Form.Item>

          {/* country */}
          <Form.Item
            name="country"
            label="Xuất xứ"
            rules={[
              { required: true, message: "Quốc gia không được để trống" },
            ]}
          >
            <Input placeholder="Nhập xuất xứ sản phẩm" />
          </Form.Item>

          {/* short_description */}
          <Form.Item
            name="short_description"
            label="Mô tả ngắn"
            rules={[
              { required: true, message: "Mô tả ngắn không được để trống" },
            ]}
          >
            <Input placeholder="Nhập mô tả ngắn sản phẩm" />
          </Form.Item>

          {/* manufacturer */}
          <Form.Item
            name="manufacturer"
            label="Nhà sản xuất"
            rules={[
              { required: true, message: "Nhà sản xuất không được để trống" },
            ]}
          >
            <Input placeholder="Nhập nhà sản xuất của sản phẩm" />
          </Form.Item>

          {/* registration_number */}
          <Form.Item
            name="registration_number"
            label="Số đăng ký"
            rules={[
              { required: true, message: "Số đăng ký không được để trống" },
            ]}
          >
            <Input placeholder="Nhập số đăng ký" />
          </Form.Item>

          {/* description_html */}
          <Form.Item name="description_html" label="Mô tả HTML">
            <Input.TextArea
              rows={5}
              placeholder="Nhập đoạn html của mô tả sản phẩm"
            />
          </Form.Item>
          {/* discount_percentage */}
          <Form.Item
            name="discount_percentage"
            label="Khuyến mãi (%)"
            rules={[
              { required: false },
              {
                type: "number",
                min: 0,
                max: 100,
                message: "Nhập giá trị từ 0 đến 100",
              },
            ]}
          >
            <InputNumber
              min={0}
              max={100}
              style={{ width: "100%" }}
              placeholder="Nhập phần trăm khuyến mãi"
              addonAfter="%"
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
