'use client'
import Footer from "@/layout/userLayout/Footer";
import Header from "@/layout/userLayout/Header";
import React from "react";
import { useActiveAccountGuard } from "@/hooks/useActiveAccountGuard";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  useActiveAccountGuard();

  return (
    <>
      <Header />
      <main className="mt-20 overflow-hidden">{children}</main>
      <Footer />
    </>
  );
};

export default UserLayout;
