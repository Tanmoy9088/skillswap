import Navbar from "@/layout/adminLayout/Navbar";
import Sidebar from "@/layout/adminLayout/Sidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      {/* Sidebar */}
      <Sidebar />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="ml-72 pt-12">{children}</main>
    </div>
  );
};

export default AdminLayout;
