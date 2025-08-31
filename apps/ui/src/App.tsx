import { RouterProvider } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./module/queryClient.ts";
import router from "./module/router.ts";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./module/theme.ts";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobalStyles } from "@mui/material";
import { Suspense } from "react";
import Loader from "./ui/components/loader/Loader.tsx";
import { useAuthInit } from "./queries/authQueries.ts";

const ContextWrapper = () => {
  const { data } = useAuthInit();
  return (
    <RouterProvider
      router={router}
      context={{ user: data.user, authenticated: data.authenticated }}
    />
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "#root": {
            display: "flex",
            width: "100vw",
            height: "100vh",
            background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
            color: "#fff",
          },
        }}
      />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Suspense fallback={<Loader />}>
          <ContextWrapper />
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
