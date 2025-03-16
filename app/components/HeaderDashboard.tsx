import Sidebar from "./SideBar";
import Breadcrumbs from "./Breadcrumbs";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const HeaderDashboard = () => {
  return (
    
        <header className="flex justify-between px-3">
          <Breadcrumbs />
          <div className="flex gap-3 items-center">
            <input className="flex h-10 border px-3 py-2 text-sm w-full rounded-lg bg-background pl-5 md:w-[200px] lg:w-[336px]" placeholder="Search" type="search"/>
            <UserCircleIcon className="w-10 h-10 hover:text-[#000]" color="#64748b" />
          </div>
        </header>
  );
};

export default HeaderDashboard;
