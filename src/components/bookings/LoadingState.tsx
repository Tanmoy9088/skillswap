const LoadingState = () => {
  return (
    <main className="min-h-screen bg-[#F7F7FF] px-4 pb-12 pt-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-200" />

          <div className="mt-3 h-4 w-80 rounded bg-gray-200" />

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-28 rounded-2xl bg-gray-200" />
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-64 rounded-2xl bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoadingState;
