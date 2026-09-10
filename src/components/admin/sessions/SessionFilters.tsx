interface SessionFiltersProps {
  search: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClear: () => void;
}

const SessionFilters = ({
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onClear,
}: SessionFiltersProps) => {
  const hasFilters = search || statusFilter !== "All";

  return (
    <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:p-6">
      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search skill, mentor, learner, category or status..."
        className="h-11 w-full max-w-xl rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
      />

      <select
        value={statusFilter}
        onChange={(event) => onStatusChange(event.target.value)}
        className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
      >
        <option value="All">All Statuses</option>
        <option value="accepted">Accepted</option>
        <option value="scheduled">Scheduled</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default SessionFilters;
