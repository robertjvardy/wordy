import { RouterProvider } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./module/queryClient.ts";
import router from "./module/router.ts";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "./auth/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./module/theme.ts";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, GlobalStyles } from "@mui/material";
import { Suspense } from "react";

const ContextWrapper = () => {
  const { user, authenticated } = useAuth();

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} context={{ user, authenticated }} />
    </>
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
        <Suspense fallback={<Box sx={{ margin: "auto" }}>Loading...</Box>}>
          <AuthProvider>
            <ContextWrapper />
          </AuthProvider>
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
