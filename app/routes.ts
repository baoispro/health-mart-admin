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
    route("policies", "routes/policies.tsx"),
    route("reviews", "routes/reviews.tsx")
    // thêm route khác muốn dùng layout chung ở đây
  ]),
  route("sign-in", "routes/sign-in.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
];
