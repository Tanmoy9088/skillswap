"use client";

import Image from "next/image";
import {
  Users,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useAdminUsers } from "@/hooks/admin/useAdminUsers";
import { useToggleAdminUserStatus } from "@/hooks/admin/useToggleAdminUserStatus";
import { useUserPagination } from "@/store/userManagementStore";

const AdminUsersPage = () => {
  const pageSize = 3;

  const page = useUserPagination((state) => state.page);
  const setPrev = useUserPagination((state) => state.setPrev);
  const setNext = useUserPagination((state) => state.setNext);
  const setPage = useUserPagination((state) => state.setPage);

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useAdminUsers(page, pageSize);

  const toggleUserStatus = useToggleAdminUserStatus();

  const userList = users?.users ?? [];
  const totalUsers = users?.total ?? 0;
  const totalPages = users?.totalPages ?? 1;

  const startUser = totalUsers === 0 ? 0 : (page - 1) * pageSize + 1;

  const endUser = Math.min(page * pageSize, totalUsers);

  return (
    <div className="min-h-screen bg-[#FAF8FF] p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#E2DFFF] p-3">
            <Users size={22} className="text-[#4F46E5]" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#253858]">
              User Management
            </h1>

            <p className="mt-1 text-gray-500">
              Manage SkillSwap+ users and account status.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-sm">
        {isLoading && (
          <div className="p-8 text-center text-gray-500">Loading users...</div>
        )}

        {isError && (
          <div className="p-8 text-center">
            <p className="font-semibold text-red-500">Failed to load users</p>

            <p className="mt-2 text-sm text-gray-500">
              {error instanceof Error ? error.message : "Something went wrong."}
            </p>
          </div>
        )}

        {!isLoading && !isError && userList.length === 0 && (
          <div className="p-8 text-center text-gray-500">No users found.</div>
        )}

        {!isLoading && !isError && userList.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-200">
              <thead>
                <tr className="border-b text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-4">User</th>

                  <th className="px-6 py-4">Role</th>

                  <th className="px-6 py-4">Status</th>

                  <th className="px-6 py-4">Joined</th>

                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {userList.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {user.profile_img ? (
                          <Image
                            src={user.profile_img}
                            alt={user.name ?? "User"}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E2DFFF] font-semibold text-[#4F46E5]">
                            {(user.name?.charAt(0) ?? "U").toUpperCase()}
                          </div>
                        )}

                        <div>
                          <p className="font-semibold text-[#253858]">
                            {user.name ?? "Unnamed User"}
                          </p>

                          <p className="text-xs text-gray-400">
                            User ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-[#EEF0FF] px-3 py-1 text-xs font-semibold capitalize text-[#4F46E5]">
                        {user.role ?? "user"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.is_active
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {user.is_active ? "Active" : "Deactivated"}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-6 py-5">
                      {user.role === "admin" ? (
                        <span className="text-xs text-gray-400">Protected</span>
                      ) : (
                        <button
                          type="button"
                          disabled={toggleUserStatus.isPending}
                          onClick={() =>
                            toggleUserStatus.mutate({
                              userId: user.id,
                              isActive: !user.is_active,
                            })
                          }
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                            user.is_active
                              ? "bg-red-50 text-red-500 hover:bg-red-100"
                              : "bg-green-50 text-green-600 hover:bg-green-100"
                          } disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                          {user.is_active ? (
                            <>
                              <UserX size={15} />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <UserCheck size={15} />
                              Activate
                            </>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && !isError && totalUsers > 0 && (
          <div className="flex flex-col gap-4 border-t bg-[#F5F6FB] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#5C6981]">
              Showing{" "}
              <span className="font-semibold text-[#253858]">{startUser}</span>{" "}
              to <span className="font-semibold text-[#253858]">{endUser}</span>{" "}
              of{" "}
              <span className="font-semibold text-[#253858]">{totalUsers}</span>{" "}
              users
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={setPrev}
                disabled={page === 1}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition ${
                      page === pageNumber
                        ? "bg-[#4F46E5] text-white"
                        : "bg-white text-[#53617A] hover:bg-gray-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={setNext}
                disabled={page >= totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
