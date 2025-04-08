import { notFound } from "next/navigation";
import Sidebar  from "@/app/(admin)/admin/_components/sidebar";
import { getAdmin } from "@/actions/admin";
import Header from "@/components/header";
import React from "react";

const AdminLayout = async({ children }) => {
  const admin = await getAdmin();

  // If user not found in our db or not an admin, redirect to 404
  if (!admin.authorized) {
    return notFound();
  }

  return (
    <div className="h-full">
      <Header isAdminPage={true} />
      <div className="flex h-full w-56 flex-col top-24 fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[96px] h-full">{children}</main>
    </div>
  );
}
export default AdminLayout;