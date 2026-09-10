"use client";

import { Calendar, RefreshCw, XCircle } from "lucide-react";
import { useMemo, useState } from "react";

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
        {/* Header */}
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

        {/* Stats */}
        <SessionStats
          total={stats.total}
          active={stats.active}
          completed={stats.completed}
          cancelled={stats.cancelled}
        />

        {/* Sessions table */}
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
            onCancel={() => {
              if (!selectedSession) return;

              const confirmed = window.confirm(
                "Are you sure you want to cancel this session? The learner will be refunded.",
              );

              if (!confirmed) return;

              cancelSession.mutate(selectedSession.id);
            }}
          />
          {/* {selectedSession && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
              onClick={() => setSelectedSession(null)}
            >
              <div
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Session Details
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedSession.skill_name || "Unknown skill"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedSession(null)}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                  >
                    <XCircle size={20} />
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm text-gray-500">Status</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[selectedSession.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {selectedSession.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm text-gray-500">Mentor</span>
                    <span className="font-medium text-gray-900">
                      {selectedSession.mentor_name || "Unknown mentor"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm text-gray-500">Learner</span>
                    <span className="font-medium text-gray-900">
                      {selectedSession.learner_name || "Unknown learner"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm text-gray-500">Category</span>
                    <span className="font-medium text-gray-900">
                      {selectedSession.category || "—"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm text-gray-500">Token Rate</span>
                    <span className="font-semibold text-indigo-600">
                      {selectedSession.token_rate != null
                        ? `${selectedSession.token_rate} tokens`
                        : "—"}
                    </span>
                  </div>

                  <div className="border-b pb-3">
                    <p className="text-sm text-gray-500">Scheduled</p>
                    <p className="mt-1 font-medium text-gray-900">
                      {selectedSession.scheduled_at
                        ? new Date(
                            selectedSession.scheduled_at,
                          ).toLocaleString()
                        : "Not scheduled"}
                    </p>
                  </div>

                  <div className="border-b pb-3">
                    <p className="text-sm text-gray-500">Started</p>
                    <p className="mt-1 font-medium text-gray-900">
                      {selectedSession.started_at
                        ? new Date(selectedSession.started_at).toLocaleString()
                        : "Not started"}
                    </p>
                  </div>

                  <div className="border-b pb-3">
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="mt-1 font-medium text-gray-900">
                      {selectedSession.completed_at
                        ? new Date(
                            selectedSession.completed_at,
                          ).toLocaleString()
                        : "Not completed"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Cancelled</p>
                    <p className="mt-1 font-medium text-gray-900">
                      {selectedSession.cancelled_at
                        ? new Date(
                            selectedSession.cancelled_at,
                          ).toLocaleString()
                        : "Not cancelled"}
                    </p>
                  </div>
                </div>
                {cancelSession.isError && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {cancelSession.error instanceof Error
                      ? cancelSession.error.message
                      : "Failed to cancel session."}
                  </div>
                )}
                {selectedSession.status === "scheduled" && (
                  <button
                    type="button"
                    disabled={cancelSession.isPending}
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Are you sure you want to cancel this scheduled session? The learner will receive a token refund.",
                      );

                      if (!confirmed) return;

                      cancelSession.mutate(selectedSession.id, {
                        onSuccess: () => {
                          setSelectedSession(null);
                        },
                      });
                    }}
                    className="mt-6 w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {cancelSession.isPending
                      ? "Cancelling..."
                      : "Cancel Session"}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedSession(null)}
                  className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                  Close
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AdminSessionsPage;
