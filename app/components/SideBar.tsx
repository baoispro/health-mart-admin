import {
  HomeIcon,
  ShoppingCartIcon,
  CubeIcon,
  UserIcon,
  ChartBarIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import type { JSX } from "react";
import {Link, useLocation } from "react-router";

interface SidebarIconProps {
  icon: JSX.Element;
  tooltip: string;
  to: string;
  active: boolean;
}

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="w-20 h-screen bg-white text-white flex flex-col items-center py-5 space-y-6 fixed">
      <header className="flex items-center justify-center bg-[#0F172A] text-black p-3 rounded-[50%] w-9 h-9 cursor-pointer">
        <Link to={"/"} className="font-bold text-xl text-white">▲</Link>
      </header>
      <main className="flex flex-col justify-between w-full h-full">
        <div id="menu">
          <SidebarIcon
            icon={<HomeIcon className="w-6 h-6 hover:text-[#000]" color="#64748b" />}
            tooltip="Dashboard"
            to="/"
            active={location.pathname === "/"}
          />
          <SidebarIcon 
            icon={<UserIcon className="w-6 h-6 hover:text-[#000]" color="#64748b" />} 
            tooltip="Users" 
            to="/users"
            active={location.pathname === "/users"}
          />
          <SidebarIcon 
            icon={<CubeIcon className="w-6 h-6 hover:text-[#000]" color="#64748b" />} 
            tooltip="Products" 
            to="/products"
            active={location.pathname === "/products"}
          />
          <SidebarIcon
            icon={<ShoppingCartIcon className="w-6 h-6 hover:text-[#000]" color="#64748b" />} 
            tooltip="Orders" 
            to="/"
            active={location.pathname === "/orders"}
          />
          <SidebarIcon 
            icon={<ChartBarIcon className="w-6 h-6 hover:text-[#000]" color="#64748b" />} 
            tooltip="Reports" 
            to="/"
            active={location.pathname === "/reports"}
          />
        </div>
        <SidebarIcon 
          icon={<CogIcon className="w-6 h-6 hover:text-[#000]" color="#64748b" />} 
          tooltip="Settings" 
          to="/"
            active={location.pathname === "/setting"}
        />
      </main>
    </aside>
  );
};

// Sidebar Icon Component
const SidebarIcon: React.FC<SidebarIconProps> = ({ icon, tooltip, to, active }) => (
  <Link 
    to={to}
    className={`relative group flex items-center justify-center`}
  >
    <div className={`p-2 rounded-lg cursor-pointer transition-all ${active ? "bg-[#f1f5f9]" : "hover:bg-gray-200"}`}>{icon}</div>
    <span className="absolute left-15 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100">
      {tooltip}
    </span>
  </Link>
);

export default Sidebar;
