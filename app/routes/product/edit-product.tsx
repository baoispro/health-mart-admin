import { useParams } from "react-router";
import UpsertFormProduct from "~/modules/products/UpsertFormProduct";

export default function EditProductPage() {
  const { id } = useParams(); // 👈 lấy id ở đây

  return <UpsertFormProduct productId={Number(id)} mode="edit" />;
}
