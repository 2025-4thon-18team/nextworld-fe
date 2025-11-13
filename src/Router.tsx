// src/Router.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomePage from "@/pages/HomePage";
import WorkPage from "@/pages/WorkPage";
import SettingPage from "@/pages/work/SettingPage";
import UniversePage from "@/pages/work/UniversePage";
import ProfitPage from "@/pages/work/ProfitPage";
import StoragePage from "@/pages/my/StoragePage";
import ManagementPage from "@/pages/my/ManagementPage";
import PointPage from "@/pages/my/PointPage";
import ProfitboardPage from "@/pages/my/ProfitboardPage";
import WritingPage from "@/pages/WritingPage";
import ProfilePage from "@/pages/ProfilePage";
import CompletePage from "@/pages/work/CompletePage";


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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/UniversePage" element={<UniversePage />} />
          <Route path="/ProfitPage" element={<ProfitPage />} />
          <Route path="/StoragePage" element={<StoragePage />} />
          <Route path="/ManagementPage" element={<ManagementPage />} />
          <Route path="/PointPage" element={<PointPage />} />
          <Route path="/ProfitboardPage" element={<ProfitboardPage />}/>
          <Route path="/WorkPage/:id" element={<WorkPage />} />
          <Route path="/ProfilePage" element={<ProfilePage/>}/>
          <Route path="/SettingPage" element={<SettingPage/>}/>
          <Route path="/CompletePage" element={<CompletePage/>}/>
          <Route path="/WritingPage" element={<WritingPage/>}/>
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
