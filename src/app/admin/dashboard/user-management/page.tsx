"use client";

import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  RotateCcw,
  ShieldCheck,
  Star,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { useAdminUsers } from "@/hooks/admin/useAdminUsers";
import { useToggleAdminUserStatus } from "@/hooks/admin/useToggleAdminUserStatus";
import { useUserPagination } from "@/store/userManagementStore";

const UserManagement = () => {
  const pageSize = 3;

  const page = useUserPagination((state) => state.page);
  const setPrev = useUserPagination((state) => state.setPrev);
  const setNext = useUserPagination((state) => state.setNext);
  const setPage = useUserPagination((state) => state.setPage);

  const {
    data: users,
    isError,
    isLoading,
    error,
  } = useAdminUsers(page, pageSize);

  const toggleUserStatus = useToggleAdminUserStatus();

  const [activeTab, setActiveTab] = useState("All Users");

  const userList = users?.users ?? [];
  const totalUsers = users?.total ?? 0;
  const totalPages = users?.totalPages ?? 0;

  const activeUsers = userList.filter((user) => user.is_active).length;

  const inactiveUsers = userList.filter((user) => !user.is_active).length;

  const handleToggleStatus = (userId: string, isActive: boolean) => {
    toggleUserStatus.mutate({
      userId,
      isActive,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] p-8">
      <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#E2DFFF] p-3">
              <Users size={22} className="text-[#4F46E5]" />
            </div>

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-[#253858]">
                User Management
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#5B6B87]">
                Oversee the SkillSwap+ ecosystem. Manage accounts, monitor user
                status, and control platform access.
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-fit rounded-lg bg-[#E9EBF5] p-1">
          {["All Users", "Active", "Inactive"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-6 py-3 text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-white text-[#4F46E5] shadow-sm"
                  : "text-[#5B6B87]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <button
          type="button"
          className="flex h-18 items-center justify-between rounded-lg bg-white px-5 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-[#E2E6F5] p-3 text-[#4F46E5]">
              <Filter size={20} />
            </div>

            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#65708A]">
                User Type
              </p>

              <p className="mt-1 text-sm font-semibold text-[#34445F]">
                All Participants
              </p>
            </div>
          </div>

          <ChevronDown size={18} className="text-gray-500" />
        </button>

        <button
          type="button"
          className="flex h-18 items-center justify-between rounded-lg bg-white px-5 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-[#E2E6F5] p-3 text-[#4F46E5]">
              <Star size={20} />
            </div>

            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#65708A]">
                Total Users
              </p>

              <p className="mt-1 text-sm font-semibold text-[#34445F]">
                {totalUsers}
              </p>
            </div>
          </div>

          <Users size={18} className="text-gray-500" />
        </button>

        <button
          type="button"
          className="flex h-18 items-center justify-between rounded-lg bg-white px-5 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-[#E9E7FF] p-3 text-[#4F46E5]">
              <BadgeCheck size={20} />
            </div>

            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#65708A]">
                Active
              </p>

              <p className="mt-1 text-sm font-semibold text-[#34445F]">
                {activeUsers}
              </p>
            </div>
          </div>

          <UserCheck size={18} className="text-green-500" />
        </button>

        <button
          type="button"
          className="flex h-18 items-center justify-between rounded-lg bg-white px-5 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-[#F7EAEA] p-3 text-[#A65A5A]">
              <UserX size={20} />
            </div>

            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#65708A]">
                Inactive
              </p>

              <p className="mt-1 text-sm font-semibold text-[#34445F]">
                {inactiveUsers}
              </p>
            </div>
          </div>

          <UserX size={18} className="text-red-500" />
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="hidden grid-cols-12 border-b bg-[#F5F6FB] px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#5D6981] md:grid">
          <div className="col-span-4">User Information</div>

          <div className="col-span-2">Role</div>

          <div className="col-span-2">Account Status</div>

          <div className="col-span-2">Joined</div>

          <div className="col-span-2 text-right">Actions</div>
        </div>

        {isLoading && (
          <div className="p-12 text-center text-sm text-[#68758C]">
            Loading users...
          </div>
        )}

        {isError && (
          <div className="p-12 text-center">
            <p className="font-semibold text-red-500">Failed to load users</p>

            <p className="mt-2 text-sm text-[#68758C]">
              {error instanceof Error ? error.message : "Something went wrong."}
            </p>
          </div>
        )}

        {!isLoading && !isError && userList.length === 0 && (
          <div className="p-12 text-center text-sm text-[#68758C]">
            No users found.
          </div>
        )}

        {!isLoading &&
          !isError &&
          userList.map((user) => {
            if (activeTab === "Active" && !user.is_active) {
              return null;
            }

            if (activeTab === "Inactive" && user.is_active) {
              return null;
            }

            return (
              <div
                key={user.id}
                className="grid grid-cols-1 gap-5 border-b px-8 py-5 last:border-0 md:grid-cols-12 md:items-center"
              >
                <div className="col-span-4 flex items-center gap-4">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#313846]">
                    {user.profile_img ? (
                      <Image
                        src={user.profile_img}
                        alt={user.name || "User"}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-white">
                        {(user.name?.charAt(0) || "U").toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-[#34445F]">
                      {user.name || "Unnamed User"}
                    </h3>

                    <p className="mt-1 truncate text-xs text-[#66738B]">
                      User ID: {user.id}
                    </p>
                  </div>
                </div>

                <div className="col-span-2">
                  <span className="rounded-full bg-[#E6EAF4] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#59677E]">
                    {user.role || "user"}
                  </span>
                </div>

                <div className="col-span-2">
                  <div
                    className={`flex items-center gap-2 font-medium ${
                      user.is_active ? "text-[#4F46A5]" : "text-[#96535A]"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        user.is_active ? "bg-[#4F46E5]" : "bg-[#96535A]"
                      }`}
                    />

                    {user.is_active ? "Active" : "Inactive"}
                  </div>
                </div>

                <div className="col-span-2 text-sm text-[#66738B]">
                  {new Date(user.created_at).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                <div className="col-span-2 flex justify-start md:justify-end">
                  {user.role === "admin" ? (
                    <span className="rounded-xl bg-[#F0F1F5] px-5 py-2.5 text-xs font-semibold text-[#7A8497]">
                      Protected
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={toggleUserStatus.isPending}
                      onClick={() =>
                        handleToggleStatus(user.id, !user.is_active)
                      }
                      className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                        user.is_active
                          ? "bg-[#F8E7E7] text-[#98535B] hover:bg-[#F3DADA]"
                          : "bg-[#E5F5EA] text-[#34804A] hover:bg-[#D8F0DE]"
                      }`}
                    >
                      {user.is_active ? (
                        <>
                          <UserX size={16} />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck size={16} />
                          Activate
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

        <div className="flex flex-col gap-5 bg-[#F5F6FB] px-8 py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#5C6981]">
            Showing <span className="font-semibold">{userList.length}</span> of{" "}
            <span className="font-semibold">{totalUsers}</span> users
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={setPrev}
              disabled={page === 1 || isLoading}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-gray-400 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  type="button"
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  disabled={isLoading}
                  className={`flex h-9 w-9 items-center justify-center rounded-md transition ${
                    page === pageNumber
                      ? "bg-[#4F46E5] text-white"
                      : "bg-white text-[#53617A] hover:bg-gray-100"
                  } disabled:cursor-not-allowed`}
                >
                  {pageNumber}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={setNext}
              disabled={page >= totalPages || totalPages === 0 || isLoading}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-gray-400 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-linear-to-br from-[#4F46E5] to-[#3730A3] p-6 text-white shadow-lg">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">
            Platform Users
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {totalUsers}
            <br />
            Registered Users
          </h2>

          <p className="mt-5 text-sm text-indigo-100">
            {activeUsers} active users on the current page.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-[#F0F2FA] p-3 text-[#4F46E5]">
              <ShieldCheck size={22} />
            </div>

            <span className="rounded bg-[#E6E8F6] px-3 py-1 text-[10px] font-bold text-[#4F46A5]">
              ACCOUNT CONTROL
            </span>
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#34445F]">
            Account Management
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#68758C]">
            Activate or deactivate non-admin accounts directly from the user
            management table.
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#4F46A5]">
            <UserCheck size={16} />
            {activeUsers} active on this page
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-[#F7F0F0] p-3 text-[#A65A5A]">
              <AlertTriangle size={22} />
            </div>

            <span className="rounded bg-[#F3E8E8] px-3 py-1 text-[10px] font-bold text-[#98535B]">
              STATUS MONITOR
            </span>
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#34445F]">
            Inactive Accounts
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#68758C]">
            {inactiveUsers} inactive account
            {inactiveUsers === 1 ? "" : "s"} appear on the current page.
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#98535B]">
            <RotateCcw size={16} />
            Activate accounts when needed
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
