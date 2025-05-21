import { Form, Input, Modal, Select, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
} from "~/api/product";
import { generateSlug } from "~/libs/helper";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  categoryId?: number | null;
  mode?: "create" | "edit";
}

export default function UpsertProductCategories({
  open,
  onClose,
  onSuccess,
  categoryId,
  mode = "create",
}: Props) {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res);
    } catch (error) {
      toast.error("Không thể tải danh sách danh mục cha");
    }
  };

  const fetchCategoryDetail = async (id: number) => {
    setLoadingDetail(true);
    try {
      const res = await getCategoryById(id);
      const data = res.data;
      form.setFieldsValue({
        name: data.name,
        slug: data.slug,
        parent_id: data.parent?.category_id || undefined,
      });
    } catch (error) {
      toast.error("Không thể tải chi tiết danh mục!");
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCategories();
      if (mode === "edit" && categoryId) {
        fetchCategoryDetail(categoryId);
      }
    }
  }, [open, categoryId, mode]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (mode === "create") {
        await createCategory(values);
        toast.success("Tạo danh mục thành công!");
      } else if (categoryId) {
        await updateCategory(categoryId, values);
        toast.success("Cập nhật danh mục thành công!");
      }

      form.resetFields();
      onClose();
      onSuccess?.();
    } catch (error) {
      toast.error("Xử lý danh mục thất bại!");
    }
  };

  useEffect(() => {
    if (!open) form.resetFields();
  }, [open]);

  return (
    <Modal
      title={mode === "create" ? "Thêm danh mục mới" : "Chỉnh sửa danh mục"}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={mode === "create" ? "Tạo danh mục" : "Lưu thay đổi"}
      cancelText="Hủy"
      centered
      width={500}
    >
      <Spin spinning={loadingDetail}>
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[
              { required: true, message: "Tên danh mục không được để trống" },
            ]}
          >
            <Input
              placeholder="Nhập tên danh mục"
              onBlur={(e) => {
                const nameValue = e.target.value;
                if (nameValue) {
                  form.setFieldValue("slug", generateSlug(nameValue));
                }
              }}
            />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Slug URL"
            rules={[{ required: true, message: "Slug không được để trống" }]}
          >
            <Input placeholder="Nhập slug danh mục" />
          </Form.Item>

          <Form.Item name="parent_id" label="Danh mục cha">
            <Select
              placeholder="Chọn danh mục cha (nếu có)"
              allowClear
              options={categories.map((cat) => ({
                value: cat.category_id,
                label: cat.name,
              }))}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}
