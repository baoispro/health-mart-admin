import { Tabs, Form, Button, message } from "antd";
import { useEffect, useState } from "react";
import GeneralInfoTab from "./GeneralInfoTab";
import IngredientsTabs from "./IngredientTab";
import UsagesTab from "./UsagesTab";
import DosagesTab from "./DosagesTab";
import SideEffectsTab from "./SideEffectsTab";
import StoragesTab from "./StoragesTab";
import {
  createDosages,
  createIngredients,
  createProduct,
  createSideEffects,
  createStorages,
  createUsages,
  getAllProducts,
  getProductById,
  getProductDosagesById,
  updateProductById,
  updateProductDosagesById,
  updateProductIngredientsById,
  updateProductSideEffectsById,
  updateProductStoragesById,
  updateProductUsagesById,
  // getProductDetail,
  // updateProduct,
} from "~/api/product";
import PrecautionsTab from "./PrecautionsTab";

interface Props {
  productId?: number; // 👈 thêm props
  mode?: "create" | "edit";
}

export default function UpsertFormProduct({
  productId,
  mode = "create",
}: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && productId) {
      fetchProductDetail(productId);
    }
  }, [mode, productId]);

  const fetchProductDetail = async (id: number) => {
    try {
      setLoading(true);
      const res = await getProductById(id);
      const product = res?.data;
      if (product) {
        form.setFieldsValue({
          name: product.name,
          slug: product.slug,
          price: product.price,
          brand: product.brand,
          unit: product.unit,
          category_id: product.category?.category_id,
          specification: product.specification,
          country: product.country,
          short_description: product.short_description,
          manufacturer: product.manufacturer,
          registration_number: product.registration_number,
          description_html: product.description_html,
          image_url: product.image_url
            ? product.image_url.split(",").map((url: string, idx: number) => ({
                uid: `${idx}`,
                name: url.split("/").pop() || `image_${idx}.jpg`,
                status: "done",
                url,
              }))
            : [],
          name_ingradient:
            product.ingredients.length > 0 ? product.ingredients[0].name : "",
          concentration:
            product.ingredients.length > 0
              ? product.ingredients[0].concentration
              : "",
          description_usages:
            product.usages.length > 0 ? product.usages[0].description : "",
          description_dosage:
            product.dosages.length > 0 ? product.dosages[0].description : "",
          description_side_effects:
            product.sideEffects.length > 0
              ? product.sideEffects[0].description
              : "",
          description_precautions:
            product.precautions.length > 0
              ? product.precautions[0].description
              : "",
          description_storage:
            product.storages.length > 0 ? product.storages[0].description : "",
        });
      }
    } catch (error) {
      message.error("Không thể lấy thông tin sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  // const handleFinish = async (values: any) => {
  //   try {
  //     if (mode === "edit" && productId) {
  //       const payload = {
  //         name: values.name,
  //         price: values.price,
  //         brand: values.brand,
  //         unit: values.unit,
  //         category_id: values.category_id,
  //         specification: values.specification,
  //         country: values.country,
  //         short_description: values.short_description,
  //         manufacturer: values.manufacturer,
  //         registration_number: values.registration_number,
  //         description_html: values.description_html,
  //         slug: values.slug,
  //         image_url: values.image_url,
  //       };
  //       const res = await updateProductById(productId, payload);
  //       if (res.statusCode === 200 || res.statusCode === 201) {
  //         const payloadIngredients = {
  //           name: values.name_ingradient,
  //           concentration: values.concentration,
  //         };

  //         const payloadStorages = {
  //           description: values.description_storage,
  //         };

  //         const payloadUsages = {
  //           description: values.description_usages,
  //         };

  //         const payloadDosages = {
  //           description: values.description_dosage,
  //         };

  //         const payloadSideEffects = {
  //           description: values.description_side_effects,
  //         };

  //         try {
  //           await Promise.all([
  //             updateProductIngredientsById(
  //               res.data.product_id,
  //               payloadIngredients
  //             ),
  //             updateProductUsagesById(res.data.product_id, payloadUsages),
  //             updateProductDosagesById(res.data.product_id, payloadDosages),
  //             updateProductSideEffectsById(
  //               res.data.product_id,
  //               payloadSideEffects
  //             ),
  //             updateProductDosagesById(res.data.product_id, payloadStorages),
  //           ]);

  //           message.success(
  //             "Tạo sản phẩm và tất cả dữ liệu liên quan thành công!"
  //           );
  //         } catch (err) {
  //           console.error("❌ Lỗi khi tạo các thông tin liên quan:", err);
  //           message.error(
  //             "Tạo sản phẩm thành công nhưng lỗi khi lưu dữ liệu liên quan!"
  //           );
  //         }
  //       }
  //       message.success("Cập nhật sản phẩm thành công!");
  //     } else {
  //       const payload = {
  //         name: values.name,
  //         price: values.price,
  //         brand: values.brand,
  //         unit: values.unit,
  //         category_id: values.category_id,
  //         specification: values.specification,
  //         country: values.country,
  //         short_description: values.short_description,
  //         manufacturer: values.manufacturer,
  //         registration_number: values.registration_number,
  //         description_html: values.description_html,
  //         slug: values.slug,
  //         image_url: values.image_url,
  //       };
  //       const res = await createProduct(payload);

  //       if (res.statusCode === 200 || res.statusCode === 201) {
  //         const payloadIngredients = {
  //           product_id: res.data.product_id,
  //           name: values.name_ingradient,
  //           concentration: values.concentration,
  //         };

  //         const payloadStorages = {
  //           product_id: res.data.product_id,
  //           description: values.description_storage,
  //         };

  //         const payloadUsages = {
  //           product_id: res.data.product_id,
  //           description: values.description_usages,
  //         };

  //         const payloadDosages = {
  //           product_id: res.data.product_id,
  //           description: values.description_dosage,
  //         };

  //         const payloadSideEffects = {
  //           product_id: res.data.product_id,
  //           description: values.description_side_effects,
  //         };

  //         try {
  //           await Promise.all([
  //             createIngredients(payloadIngredients),
  //             createUsages(payloadUsages),
  //             createDosages(payloadDosages),
  //             createSideEffects(payloadSideEffects),
  //             createStorages(payloadStorages),
  //           ]);

  //           message.success(
  //             "Tạo sản phẩm và tất cả dữ liệu liên quan thành công!"
  //           );
  //         } catch (err) {
  //           console.error("❌ Lỗi khi tạo các thông tin liên quan:", err);
  //           message.error(
  //             "Tạo sản phẩm thành công nhưng lỗi khi lưu dữ liệu liên quan!"
  //           );
  //         }
  //       }
  //     }
  //   } catch (error: any) {
  //     console.error(error);
  //     message.error("Có lỗi xảy ra khi lưu sản phẩm!");
  //   }
  // };

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("brand", values.brand);
      formData.append("unit", values.unit);
      formData.append("category_id", values.category_id);
      formData.append("specification", values.specification);
      formData.append("country", values.country);
      formData.append("short_description", values.short_description);
      formData.append("manufacturer", values.manufacturer);
      formData.append("registration_number", values.registration_number);
      formData.append("description_html", values.description_html);
      formData.append("slug", values.slug);
      formData.append("discount_percentage", values.discount_percentage ?? 0);
      const imageLinks: string[] = [];
      if (Array.isArray(values.image_url)) {
        values.image_url.forEach((fileObj: any) => {
          if (fileObj.originFileObj) {
            // Ảnh mới: gửi file
            formData.append("image_url", fileObj.originFileObj);
          } else if (fileObj.url) {
            // Ảnh cũ: lưu lại link
            imageLinks.push(fileObj.url);
          }
        });
      }
      // Chỉ append 1 lần cho link ảnh cũ (nếu có)
      if (imageLinks.length > 0) {
        formData.append("image_url", imageLinks.join(","));
      }

      let res;

      if (mode === "edit" && productId) {
        res = await updateProductById(productId, formData);
      } else {
        res = await createProduct(formData);
      }

      if (res.statusCode === 200 || res.statusCode === 201) {
        const id = res.data.product_id || productId;

        const payloadIngredients = {
          ...(mode === "edit" ? {} : { product_id: id }),
          name: values.name_ingradient,
          concentration: values.concentration,
        };
        const payloadStorages = {
          ...(mode === "edit" ? {} : { product_id: id }),
          description: values.description_storage,
        };
        const payloadUsages = {
          ...(mode === "edit" ? {} : { product_id: id }),
          description: values.description_usages,
        };
        const payloadDosages = {
          ...(mode === "edit" ? {} : { product_id: id }),
          description: values.description_dosage,
        };
        const payloadSideEffects = {
          ...(mode === "edit" ? {} : { product_id: id }),
          description: values.description_side_effects,
        };

        await Promise.all([
          mode === "edit"
            ? updateProductIngredientsById(id, payloadIngredients)
            : createIngredients(payloadIngredients),
          mode === "edit"
            ? updateProductUsagesById(id, payloadUsages)
            : createUsages(payloadUsages),
          mode === "edit"
            ? updateProductDosagesById(id, payloadDosages)
            : createDosages(payloadDosages),
          mode === "edit"
            ? updateProductSideEffectsById(id, payloadSideEffects)
            : createSideEffects(payloadSideEffects),
          mode === "edit"
            ? updateProductStoragesById(id, payloadStorages)
            : createStorages(payloadStorages),
        ]);

        message.success(
          mode === "edit"
            ? "Cập nhật sản phẩm thành công!"
            : "Tạo sản phẩm và tất cả dữ liệu liên quan thành công!"
        );
      }
    } catch (error) {
      console.error(error);

      const apiMessage = (error as any)?.response?.data?.message;

      if (typeof apiMessage === "object" && apiMessage !== null) {
        const fieldErrors = Object.entries(apiMessage).map(
          ([field, errors]) => ({
            name: field,
            errors: Array.isArray(errors) ? errors : [errors],
          })
        );

        form.setFields(fieldErrors);

        message.error(
          `Vui lòng kiểm tra lại ${fieldErrors.length} trường thông tin!`
        );
      } else if (typeof apiMessage === "string") {
        message.error(apiMessage);
      } else {
        message.error("Có lỗi xảy ra khi lưu sản phẩm!");
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">
        {mode === "edit" ? "Chỉnh sửa sản phẩm" : "Tạo sản phẩm mới"}
      </h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          general: {
            price: 0,
          },
        }}
        onFinishFailed={({ errorFields }) => {
          if (errorFields.length > 0) {
            message.error(
              "Bạn cần nhập đầy đủ và đúng thông tin trước khi lưu!"
            );
          }
        }}
      >
        <Tabs
          defaultActiveKey="general"
          tabBarExtraContent={
            <Button type="primary" htmlType="submit" loading={loading}>
              {mode === "edit" ? "Cập nhật" : "Tạo sản phẩm"}
            </Button>
          }
        >
          <Tabs.TabPane tab="Thông tin chung" key="general">
            <GeneralInfoTab form={form} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Thành phần" key="ingredients">
            <IngredientsTabs />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Công dụng" key="usages">
            <UsagesTab />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Cách dùng" key="dosages">
            <DosagesTab />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tác dụng phụ" key="sideeffects">
            <SideEffectsTab />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Lưu ý" key="precautions">
            <PrecautionsTab />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Bảo quản" key="storages">
            <StoragesTab />
          </Tabs.TabPane>
        </Tabs>
      </Form>
    </div>
  );
}
