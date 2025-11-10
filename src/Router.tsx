import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as ReactRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomePage from "@/pages/HomePage";
import WorkPage from "@/pages/WorkPage";
import WritingPage from "@/pages/work/WritingPage";
import UniversePage from "@/pages/work/UniversePage";
import ProfitPage from "@/pages/work/ProfitPage";
import StoragePage from "@/pages/my/StoragePage";
import Header from "@/components/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

export function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactRouter>
        <Routes>
          <Route element={<HomePage />} path="/"></Route>
          <Route element={<WorkPage />} path="/WorkPage"></Route>
          <Route element={<Header />} path="/Header"></Route>
          <Route element={<WritingPage />} path="/WritingPage"></Route>
          <Route element={<UniversePage />} path="/UniversePage"></Route>
          <Route element={<ProfitPage />} path="/ProfitPage"></Route>
          <Route element={<StoragePage />} path="/StoragePage"></Route>
        </Routes>
      </ReactRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
