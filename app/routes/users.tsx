import { useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import Sidebar from "~/components/SideBar";
import HeaderDashboard from "../components/HeaderDashboard";
import ExportButton from "~/components/ExportButton";
import AddButton from "~/components/AddButton";

export default function Users() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Dữ liệu giả lập
  const users = [
    {
      id: 1,
      name: "Nguyễn Lê Gia Bảo",
      email: "nguyenlegiabao810@gmail.com",
      phone: "0931508027",
      role: "Admin",
      createdAt: "16/3/2025",
    },
    {
      id: 2,
      name: "Trần Văn B",
      email: "tranvanb@gmail.com",
      phone: "0909123456",
      role: "User",
      createdAt: "10/2/2025",
    },
  ];

  return (
    <main className="flex">
      <Sidebar />
      <section className="flex-1 flex flex-col gap-10 py-5 pl-20">
        <HeaderDashboard />
        <div>
          <div className="flex px-3 justify-end">
            <div className="flex gap-5">
              <ExportButton />
              <AddButton title="Add user" />
            </div>
          </div>
        </div>
        <div className="px-3">
          <div className="bg-white p-5 flex flex-col justify-between gap-10">
            <div>
              <h2 className="font-bold text-2xl">Users</h2>
              <h3 className="text-[#64748B]">Manage your users and track their activity.</h3>
            </div>

            {/* Table */}
            <table className="w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Id</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Created at</th>
                  <th className="px-4 py-2 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="odd:bg-gray-50 even:bg-white hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{user.id}</td>
                    <td className="px-4 py-2 border-b">{user.name}</td>
                    <td className="px-4 py-2 border-b">{user.email}</td>
                    <td className="px-4 py-2 border-b">{user.phone}</td>
                    <td className="px-4 py-2 border-b">{user.role}</td>
                    <td className="px-4 py-2 border-b">{user.createdAt}</td>
                    <td className="px-4 py-2 border-b text-center relative">
                      {/* Button mở menu */}
                      <button
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                      >
                        ...
                      </button>

                      {/* Menu chỉ hiện khi `openMenuId === user.id` */}
                      {openMenuId === user.id && (
                        <div className="absolute bg-white flex flex-col items-start p-2 top-10 -left-20 w-[120px] border border-[#e2e8f0] shadow-md z-10">
                          <h4 className="font-bold">Actions</h4>
                          <button className="w-full text-left hover:text-blue-600">✏ Edit</button>
                          <button className="w-full text-left hover:text-red-500">🗑 Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between">
              <p>Showing ?-? of ? users</p>
              <div className="flex gap-5">
                <button className="flex cursor-pointer"><ChevronLeftIcon className="w-5" />Prev</button>
                <button className="flex cursor-pointer">Next<ChevronRightIcon className="w-5" /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Click bên ngoài để đóng menu */}
      {openMenuId !== null && (
        <div className="fixed inset-0" onClick={() => setOpenMenuId(null)}></div>
      )}
    </main>
  );
}