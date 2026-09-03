"use client";

// import store from "@/store/slices/store";
import React, { useState } from "react";
// import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Toaster richColors closeButton position="top-right" />
      {/* <Provider store={store}> */}
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
      {/* </Provider> */}
    </>
  );
};

export default Providers;
