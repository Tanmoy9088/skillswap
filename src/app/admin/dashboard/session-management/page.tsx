"use client";

import { Calendar, RefreshCw, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { confirmToast } from "@/components/lib/confirmToast";
import { useAdminSessions } from "@/hooks/admin/useAdminSessions";
import type { AdminSession } from "@/lib/admin";
import { useCancelAdminSession } from "@/hooks/admin/useCancelAdminSession";
import SessionStats from "@/components/admin/sessions/SessionStats";
import SessionFilters from "@/components/admin/sessions/SessionFilters";
import SessionsTable from "@/components/admin/sessions/SessionsTable";
import SessionDetailsModal from "@/components/admin/sessions/SessionDetailsModal";

const AdminSessionsPage = () => {
  const {
    data: sessions,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useAdminSessions();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedSession, setSelectedSession] = useState<AdminSession | null>(
    null,
  );

  const cancelSession = useCancelAdminSession();

  const filteredSessions = useMemo(() => {
    if (!sessions) return [];

    const query = search.trim().toLowerCase();

    return sessions.filter((session) => {
      const matchesSearch =
        !query ||
        session.skill_name?.toLowerCase().includes(query) ||
        session.mentor_name?.toLowerCase().includes(query) ||
        session.learner_name?.toLowerCase().includes(query) ||
        session.category?.toLowerCase().includes(query) ||
        session.status?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || session.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [sessions, search, statusFilter]);

  const stats = {
    total: sessions?.length ?? 0,
    active:
      sessions?.filter(
        (session) =>
          session.status === "accepted" ||
          session.status === "scheduled" ||
          session.status === "in_progress",
      ).length ?? 0,
    completed:
      sessions?.filter((session) => session.status === "completed").length ?? 0,
    cancelled:
      sessions?.filter((session) => session.status === "cancelled").length ?? 0,
  };

  const handleCancelSession = () => {
    if (!selectedSession) {
      return;
    }

    confirmToast({
      title: "Cancel Session",
      message:
        "Are you sure you want to cancel this session? The learner will be refunded.",
      confirmText: "Cancel Session",
      variant: "danger",
      onConfirm: async () => {
        try {
          await cancelSession.mutateAsync(selectedSession.id);

          setSelectedSession(null);

          toast.success("Session cancelled successfully.");
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to cancel session.",
          );
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 sm:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="h-9 w-56 animate-pulse rounded-lg bg-gray-200" />

          <div className="h-5 w-96 animate-pulse rounded bg-gray-200" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <div className="mb-6 h-11 w-full animate-pulse rounded-xl bg-gray-100" />

            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-xl bg-gray-100"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 sm:p-8">
        <div className="mx-auto flex min-h-100 max-w-2xl items-center justify-center">
          <div className="w-full rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <XCircle className="mx-auto h-12 w-12 text-red-500" />

            <h1 className="mt-4 text-xl font-bold text-gray-900">
              Unable to load sessions
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              {error?.message || "Something went wrong while loading sessions."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <Calendar size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Session Management
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Monitor and manage SkillSwap+ learning sessions.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw size={17} className={isFetching ? "animate-spin" : ""} />
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <SessionStats
          total={stats.total}
          active={stats.active}
          completed={stats.completed}
          cancelled={stats.cancelled}
        />

        <div className="rounded-2xl border bg-white shadow-sm">
          <SessionFilters
            search={search}
            statusFilter={statusFilter}
            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
            onClear={() => {
              setSearch("");
              setStatusFilter("All");
            }}
          />

          <SessionsTable
            sessions={filteredSessions}
            onView={setSelectedSession}
          />

          <SessionDetailsModal
            session={selectedSession}
            isCancelling={cancelSession.isPending}
            cancelError={cancelSession.error?.message ?? null}
            onClose={() => {
              setSelectedSession(null);
              cancelSession.reset();
            }}
            onCancel={handleCancelSession}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSessionsPage;
