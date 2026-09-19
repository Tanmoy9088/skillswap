const DashboardLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-200" />

        <div className="mt-2 h-5 w-96 animate-pulse rounded-lg bg-gray-200" />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl bg-white shadow-sm"
            />
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="h-96 animate-pulse rounded-2xl bg-white shadow-sm" />
          <div className="h-96 animate-pulse rounded-2xl bg-white shadow-sm" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;
