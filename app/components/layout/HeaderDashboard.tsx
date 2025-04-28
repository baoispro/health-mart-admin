import { Dropdown, type MenuProps } from "antd";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Breadcrumbs from "./Breadcrumbs";
import { useAuth } from "~/hooks/useAuth"; // nhớ đã có useAuth nha

const HeaderDashboard = () => {
  const { user, logout } = useAuth(); // lấy user và logout từ auth context

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: logout,
    },
  ];

  return (
    <header className="flex justify-between px-3 py-2">
      <Breadcrumbs />
      <div className="flex gap-3 items-center">
        <input
          className="flex h-10 border px-3 py-2 text-sm w-full rounded-lg bg-background pl-5 md:w-[200px] lg:w-[336px]"
          placeholder="Search"
          type="search"
        />
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <div className="flex items-center gap-2 cursor-pointer">
            <UserCircleIcon className="w-10 h-10 text-gray-500 hover:text-black" />
            <span className="font-medium">{user?.username || "User"}</span>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default HeaderDashboard;
