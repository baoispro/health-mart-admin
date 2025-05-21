export const generateSlug = (str: string) =>
  str
    .replace(/Đ/g, "D") // thay Đ
    .replace(/đ/g, "d") // thay đ
    .toLowerCase()
    .normalize("NFD") // tách dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/\s+/g, "-") // khoảng trắng thành -
    .replace(/[^\w\-]+/g, "") // bỏ ký tự đặc biệt
    .replace(/\-\-+/g, "-") // gộp nhiều dấu -
    .replace(/^-+|-+$/g, ""); // bỏ - đầu/cuối

export function formatCurrency(value: number | string): string {
  const num = typeof value === "string" ? parseInt(value, 10) : value;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
}
