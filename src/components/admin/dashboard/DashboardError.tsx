const DashboardError = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-700">
            Unable to load dashboard data
          </h2>

          <p className="mt-1 text-sm text-red-600">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardError;
