"use client";

import { useUsers } from "@/hooks/use-user";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Filter,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
} from "lucide-react";

import React, { useState } from "react";

const UserManagement = () => {
  const { data: users, isError, isLoading, error } = useUsers();
  console.log("uSERS:", users);
  const [activeTab, setActiveTab] = useState("All Users");

  return (
    <div className="min-h-screen bg-[#FAF8FF] p-8">
      {/* ================= PAGE HEADER ================= */}

      <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#253858]">
            User Management
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#5B6B87]">
            Oversee the SkillSwap+ ecosystem. Moderate accounts, monitor
            reputation trends, and manage user roles across the platform.
          </p>
        </div>

        {/* Tabs */}

        <div className="flex h-fit rounded-lg bg-[#E9EBF5] p-1">
          {["All Users", "Pending", "Flagged"].map((tab) => (
            <button
              key={tab}
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

      {/* ================= FILTERS ================= */}

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* User Type */}

        <button className="flex h-[72px] items-center justify-between rounded-lg bg-white px-5 shadow-sm">
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

        {/* Reputation */}

        <button className="flex h-[72px] items-center justify-between rounded-lg bg-white px-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-[#E2E6F5] p-3 text-[#4F46E5]">
              <Star size={20} />
            </div>

            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#65708A]">
                Reputation
              </p>

              <p className="mt-1 text-sm font-semibold text-[#34445F]">
                Any Score
              </p>
            </div>
          </div>

          <ChevronDown size={18} className="text-gray-500" />
        </button>

        {/* Status */}

        <button className="flex h-[72px] items-center justify-between rounded-lg bg-white px-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-[#E9E7FF] p-3 text-[#4F46E5]">
              <BadgeCheck size={20} />
            </div>

            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#65708A]">
                Status
              </p>

              <p className="mt-1 text-sm font-semibold text-[#34445F]">
                All Statuses
              </p>
            </div>
          </div>

          <ChevronDown size={18} className="text-gray-500" />
        </button>

        {/* Reset */}

        <button className="flex h-[72px] items-center justify-center gap-3 rounded-lg bg-white px-5 font-semibold text-[#53617A] shadow-sm">
          <RotateCcw size={20} />
          Reset Filters
        </button>
      </div>

      {/* ================= USER TABLE ================= */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {/* Table Header */}

        <div className="hidden grid-cols-12 border-b bg-[#F5F6FB] px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#5D6981] md:grid">
          <div className="col-span-4">User Information</div>

          <div className="col-span-2">Role</div>

          <div className="col-span-2">Reputation Score</div>

          <div className="col-span-2">Status</div>

          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Users */}

        {users?.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-1 gap-5 border-b px-8 py-5 md:grid-cols-12 md:items-center"
          >
            {/* User */}

            <div className="col-span-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#313846] text-2xl">
                {user.avatar}
              </div>

              <div>
                <h3
                  className={`font-semibold ${
                    user.status === "Blocked"
                      ? "text-gray-500 line-through"
                      : "text-[#34445F]"
                  }`}
                >
                  {user.name}
                </h3>

                <p className="text-sm text-[#66738B]">{user.email}</p>
              </div>
            </div>

            {/* Role */}

            <div className="col-span-2">
              <span className="rounded-full bg-[#E6EAF4] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#59677E]">
                {user.role}
              </span>
            </div>

            {/* Reputation */}

            <div className="col-span-2 flex items-center gap-3">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#E3E6EF]">
                <div
                  className={`h-full ${
                    user.reputation < 1 ? "bg-[#9E5961]" : "bg-[#4F46E5]"
                  }`}
                  style={{
                    width: `${(user.reputation / 5) * 100}%`,
                  }}
                />
              </div>

              <span
                className={`font-bold ${
                  user.reputation < 1 ? "text-[#9E5961]" : "text-[#34445F]"
                }`}
              >
                {user.reputation}
              </span>
            </div>

            {/* Status */}

            <div className="col-span-2">
              <div
                className={`flex items-center gap-2 font-medium ${
                  user.status === "Blocked"
                    ? "text-[#96535A]"
                    : "text-[#4F46A5]"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    user.status === "Blocked" ? "bg-[#96535A]" : "bg-[#4F46E5]"
                  }`}
                />

                {user.status}
              </div>
            </div>

            {/* Actions */}

            <div className="col-span-2 flex justify-start md:justify-end">
              <button
                className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition ${
                  user.status === "Blocked"
                    ? "bg-[#F8E7E7] text-[#98535B]"
                    : "bg-[#E3E7F5] text-[#4B5796] hover:bg-[#D8DDF0]"
                }`}
              >
                {user.status === "Blocked" ? "Review" : "Manage"}
              </button>
            </div>
          </div>
        ))}

        {/* Pagination */}

        <div className="flex flex-col gap-5 bg-[#F5F6FB] px-8 py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#5C6981]">
            Showing <span className="font-semibold">1 - 4</span> of 1,280 active
            curators
          </p>

          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-gray-400">
              <ChevronLeft size={16} />
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-md bg-[#4F46E5] text-white">
              1
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-[#53617A]">
              2
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-[#53617A]">
              ...
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-gray-400">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM CARDS ================= */}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Growth */}

        <div className="rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#3730A3] p-6 text-white shadow-lg">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">
            Weekly Growth
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            +24% New
            <br />
            Registrations
          </h2>

          <p className="mt-5 flex items-center gap-2 text-sm text-indigo-100">
            ↗ Higher than previous quarter
          </p>
        </div>

        {/* Verification Queue */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-[#F0F2FA] p-3 text-[#4F46E5]">
              <ShieldCheck size={22} />
            </div>

            <span className="rounded bg-[#E6E8F6] px-3 py-1 text-[10px] font-bold text-[#4F46A5]">
              AUTO-MOD ACTIVE
            </span>
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#34445F]">
            Verification Queue
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#68758C]">
            12 teachers awaiting credential review.
          </p>

          <button className="mt-5 flex items-center gap-2 text-sm font-bold text-[#4F46A5]">
            Open Review Panel
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Security Alert */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-[#F7F0F0] p-3 text-[#A65A5A]">
              <AlertTriangle size={22} />
            </div>

            <span className="rounded bg-[#F3E8E8] px-3 py-1 text-[10px] font-bold text-[#98535B]">
              2 NEW REPORTS
            </span>
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#34445F]">
            Security Alert
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#68758C]">
            Unusual reputation shift detected in Art category.
          </p>

          <button className="mt-5 flex items-center gap-2 text-sm font-bold text-[#98535B]">
            Investigate Logs
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
