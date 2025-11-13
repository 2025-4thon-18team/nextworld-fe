import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as ReactRouter, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Layout } from "./pages/layout/Layout";
import { MyPageLayout } from "./pages/mypage/MyPageLayout";
import TestPage from "./pages/TestPage";
import Home from "./pages/home/Home";
import Interests from "./pages/interests/Interests";
import New from "./pages/new/New";
import MyPageMain from "./pages/mypage/MyPageMain";
import MyLibrary from "./pages/mypage/MyLibrary";
import Revenue from "./pages/mypage/Revenue";
import PointHistory from "./pages/mypage/PointHistory";
import Favorites from "./pages/mypage/Favorites";
import CreateSeriesBasic from "./pages/create-series/CreateSeriesBasic";
import CreateSeriesUniverse from "./pages/create-series/CreateSeriesUniverse";
import CreateSeriesSecondary from "./pages/create-series/CreateSeriesSecondary";
import Editor from "./pages/editor/Editor";
import AuthorPage from "./pages/author/AuthorPage";
import Viewer from "./pages/Viewer";
import SeriesDetail from "./pages/series-detail/SeriesDetail";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

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
          {/* Layout 없이 */}
          <Route element={<TestPage />} path="/test" />
          <Route
            element={<Viewer />}
            path="/series/:seriesId/content/:contentId"
          />
          <Route element={<Viewer />} path="/post/:postId" />
          <Route element={<Editor />} path="/editor" />

          {/* Layout이 필요한 페이지들 */}
          <Route element={<Layout />}>
            <Route element={<Home />} path="/" />
            <Route element={<Interests />} path="/interests" />
            <Route element={<New />} path="/new" />
            <Route element={<SeriesDetail />} path="/series/:seriesId" />
            <Route
              element={<CreateSeriesBasic />}
              path="/create-series/basic"
            />
            <Route
              element={<CreateSeriesUniverse />}
              path="/create-series/universe"
            />
            <Route
              element={<CreateSeriesSecondary />}
              path="/create-series/secondary"
            />
            <Route element={<Login />} path="/login" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<AuthorPage />} path="/author/:authorId" />
          </Route>

          {/* MyPage Layout이 필요한 페이지들 */}
          <Route element={<MyPageLayout />}>
            <Route element={<MyPageMain />} path="/my-page/main" />
            <Route element={<MyLibrary />} path="/my-page/library" />
            <Route element={<Revenue />} path="/my-page/revenue" />
            <Route element={<PointHistory />} path="/my-page/point" />
            <Route element={<Favorites />} path="/my-page/favorites" />
          </Route>
        </Routes>
      </ReactRouter>
      {import.meta.env.VITE_APP_ENV === "development" &&
        import.meta.env.VITE_ENABLE_QUERY_DEVTOOLS === "true" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
    </QueryClientProvider>
  );
}
