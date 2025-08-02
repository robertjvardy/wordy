import { RouterProvider } from "@tanstack/react-router";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./module/queryClient.ts";
import router from "./router.tsx";
import { AuthProvider, useAuth } from "./auth/AuthProvider.tsx";

const ContextWrapper = () => {
  const ctx = useAuth();
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} context={ctx} />
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ContextWrapper />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
