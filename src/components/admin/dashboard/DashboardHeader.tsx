const DashboardHeader = () => {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Real-time overview of SkillSwap+ platform activity
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        Live Data
      </div>
    </div>
  );
};

export default DashboardHeader;
