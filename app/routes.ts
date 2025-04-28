import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/layout/MainLayout.tsx", [
    index("routes/home.tsx"),
    route("users", "routes/users.tsx"),
    route("products", "routes/product/index.tsx"),
    route("products/create", "routes/product/create-product.tsx"),
    route("products/:id/edit", "routes/product/edit-product.tsx"),
    route("categories", "routes/categories.tsx"),
    route("policies", "routes/policies.tsx"),
    route("reviews", "routes/reviews.tsx"),
    // thêm route khác muốn dùng layout chung ở đây
  ]),
  route("sign-in", "routes/login.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
];
