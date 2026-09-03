import Footer from "@/layout/userLayout/Footer";
import Header from "@/layout/userLayout/Header";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mt-20">{children}</main>
      <Footer />
    </>
  );
};

export default UserLayout;
