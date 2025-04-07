import { useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import Sidebar from "~/components/SideBar";
import HeaderDashboard from "../components/HeaderDashboard";
import ExportButton from "~/components/ExportButton";
import AddButton from "~/components/AddButton";

export default function Products() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const products = [
    {
      product_id: 1,
      name: "Thuốc abc",
      price: "500,000đ",
      brand: "Brand A",
      unit: "Hộp",
      category_id: 101,
      country: "Việt Nam",
      manufacturer: "CTCP Dược ABC",
      registration_number: "VN-12345-ABC",
    },
    {
        product_id: 2,
        name: "Thuốc abc",
        price: "500,000đ",
        brand: "Brand B",
        unit: "Hộp",
        category_id: 102,
        country: "Việt Nam",
        manufacturer: "CTCP Dược ABC",
        registration_number: "VN-12345-ABC",
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
              <AddButton title="Add product" />
            </div>
          </div>
        </div>
        <div className="px-3 flex justify-between items-center">
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nhập tên thuốc"
              className="border border-gray-300 px-3 py-2 rounded-md"
            />
            <button
              onClick={() => setSearch("")}
              className="border border-gray-300 px-3 py-2 rounded-md"
            >
              Xoá tìm kiếm
            </button>
          </div>
        </div>

        <div className="px-3">
          <div className="bg-white p-5 flex flex-col justify-between gap-10">
            <div>
              <h2 className="font-bold text-2xl">Products</h2>
              <h3 className="text-[#64748B]">Manage your products here.</h3>
            </div>

            {/* Table */}
            <table className="w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Brand</th>
                  <th className="px-4 py-2 text-left">Unit</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Country</th>
                  <th className="px-4 py-2 text-left">Manufacturer</th>
                  <th className="px-4 py-2 text-left">Registration #</th>
                  <th className="px-4 py-2 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.product_id} className="odd:bg-gray-50 even:bg-white hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{product.product_id}</td>
                    <td className="px-4 py-2 border-b">{product.name}</td>
                    <td className="px-4 py-2 border-b">{product.price}</td>
                    <td className="px-4 py-2 border-b">{product.brand}</td>
                    <td className="px-4 py-2 border-b">{product.unit}</td>
                    <td className="px-4 py-2 border-b">{product.category_id}</td>
                    <td className="px-4 py-2 border-b">{product.country}</td>
                    <td className="px-4 py-2 border-b">{product.manufacturer}</td>
                    <td className="px-4 py-2 border-b">{product.registration_number}</td>
                    <td className="px-4 py-2 border-b text-center relative">
                      {/* Button mở menu */}
                      <button
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === product.product_id ? null : product.product_id
                          )
                        }
                      >
                        ...
                      </button>

                      {openMenuId === product.product_id && (
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
              <p>Showing ?-? of ? products</p>
              <div className="flex gap-5">
                <button className="flex cursor-pointer">
                  <ChevronLeftIcon className="w-5" />Prev
                </button>
                <button className="flex cursor-pointer">
                  Next<ChevronRightIcon className="w-5" />
                </button>
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