"use client";

import { Users, UserCheck, UserX } from "lucide-react";
import { useAdminUsers } from "@/hooks/admin/useAdminUsers";
import { useToggleAdminUserStatus } from "@/hooks/admin/useToggleAdminUserStatus";
import Image from "next/image";

const AdminUsersPage = () => {
  const { data: users, isLoading, isError, error } = useAdminUsers();

  const toggleUserStatus = useToggleAdminUserStatus();
  return (
    <div className="min-h-screen bg-[#FAF8FF] p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#E2DFFF] p-3">
            <Users size={22} className="text-[#4F46E5]" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#253858]">Users</h1>

            <p className="mt-1 text-gray-500">
              Manage SkillSwap+ users and account status.
            </p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-white shadow-sm">
        {/* Loading */}
        {isLoading && (
          <div className="p-8 text-center text-gray-500">Loading users...</div>
        )}

        {/* Error */}
        {isError && (
          <div className="p-8 text-center">
            <p className="font-semibold text-red-500">Failed to load users</p>

            <p className="mt-2 text-sm text-gray-500">
              {error instanceof Error ? error.message : "Something went wrong."}
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && users?.length === 0 && (
          <div className="p-8 text-center text-gray-500">No users found.</div>
        )}

        {/* Data */}
        {!isLoading && !isError && users && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
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
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    {/* User */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {user.profile_img ? (
                          <Image
                            src={user.profile_img || "/image.png"}
                            alt={user.name ?? "User"}
                            className="h-10 w-10 rounded-full object-cover"
                            width={40}
                            height={40}
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

                    {/* Role */}
                    <td className="px-6 py-5">
                      <span className="rounded-full bg-[#EEF0FF] px-3 py-1 text-xs font-semibold capitalize text-[#4F46E5]">
                        {user.role ?? "user"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.is_active
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-6 py-5 text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
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
      </div>
    </div>
  );
};

export default AdminUsersPage;
