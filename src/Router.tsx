import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as ReactRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TestPage from "./pages/TestPage";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactRouter>
        <Routes>
          <Route element={<TestPage />} path="/"></Route>
        </Routes>
      </ReactRouter>
      {import.meta.env.VITE_APP_ENV === "development" &&
        import.meta.env.VITE_ENABLE_QUERY_DEVTOOLS === "true" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
    </QueryClientProvider>
  );
}
