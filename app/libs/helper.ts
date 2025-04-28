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
