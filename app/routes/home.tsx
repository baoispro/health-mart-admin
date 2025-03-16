import Sidebar from "~/components/SideBar";
import HeaderDashboard from "../components/HeaderDashboard";

export default function Home() {
  return ( 
    <main className="flex">
      <Sidebar />
      <section className="flex-1 py-5 pl-20">
        <HeaderDashboard></HeaderDashboard>
      </section>
    </main>
  );
}