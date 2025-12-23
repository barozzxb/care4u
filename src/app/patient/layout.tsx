import "./patient.css";

import SideBar from "@/components/user/SideBar";
import Footer from "@/components/Footer";
import NavBar from "@/components/user/NavBar";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="w-full bg-white shadow-md p-1">
        <NavBar />
      </header>

      <div className="flex min-h-screen w-full">
        <aside className="w-64 min-w-56 bg-white shadow-lg border-r border-gray-200">
          <SideBar />
        </aside>

        <section className="flex-1 bg-gray-50 p-6 overflow-auto">
          {children}
        </section>
      </div>

      <Footer />
    </>
  );
}
