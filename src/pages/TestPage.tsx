import { useState } from "react";
import { Link } from "react-router-dom";

// Auth
import {
  useGetMe,
  useSignup,
  useLogin,
  useLogout,
  useRefreshToken,
} from "@/querys/useAuth";

// Users
import { useUpdateProfile } from "@/querys/useUsers";

// Mypage
import {
  useGetMyWorks,
  useGetMyBookmarks,
  useGetMyPoints,
  useGetPaylist,
  useGetRevenue,
} from "@/querys/useMypage";

// Payment
import { useChargePoints, useUsePoints } from "@/querys/usePayment";

// Revenue
import { useDistributeRevenue } from "@/querys/useRevenue";

// Works
import {
  useCreateOriginalWork,
  useUpdateOriginalWork,
  useCreateDerivativeWork,
  useUpdateDerivativeWork,
  useSaveDraft,
  useGetDraft,
  useDeleteDraft,
  useContinueWriting,
  useCheckAI,
  useLikeWork,
  useGetLikes,
  useBookmarkWork,
  useGetComments,
  useCreateComment,
} from "@/querys/useWorks";

// Feed
import { useGetFeed, useSearchWorks, useGetAuthorFeed } from "@/querys/useFeed";

// Report
import { useReportWork } from "@/querys/useReport";

// Admin
import {
  useGetUsers,
  useGetPayments,
  useRefundPayment,
  useGetReports,
  useResolveReport,
} from "@/querys/useAdmin";

function TestPage() {
  const [count, setCount] = useState(0);
  const [draftId] = useState("draft-1");
  const [workId] = useState("work-1");

  const words = [
    { text: "Vite", className: "text-[#a95eff]" },
    { text: " + " },
    { text: "React", className: "text-[#61dafb]" },
    { text: " + " },
    { text: "Tailwindcss", className: "text-[#0ea5e9]" },
    { text: " + " },
    { text: "Framer Motion", className: "text-[#ff57c8]" },
  ];

  // ========== Auth ==========
  const { data: me } = useGetMe();
  const { mutate: signup } = useSignup();
  const { mutate: login } = useLogin();
  const { mutate: logout } = useLogout();
  const { mutate: refreshToken } = useRefreshToken();

  // ========== Users ==========
  const { mutate: updateProfile } = useUpdateProfile();

  // ========== Mypage ==========
  const { data: myWorks } = useGetMyWorks({ page: 1, pageSize: 10 });
  const { data: myBookmarks } = useGetMyBookmarks({ page: 1, pageSize: 10 });
  const { data: myPoints } = useGetMyPoints();
  const { data: paylist } = useGetPaylist({ page: 1, pageSize: 10 });
  const { data: revenue } = useGetRevenue();

  // ========== Payment ==========
  const { mutate: chargePoints } = useChargePoints();
  const { mutate: spendPoints } = useUsePoints();

  // ========== Revenue ==========
  const { mutate: distributeRevenue } = useDistributeRevenue();

  // ========== Works ==========
  const { mutate: createOriginalWork } = useCreateOriginalWork();
  const { mutate: updateOriginalWork } = useUpdateOriginalWork();
  const { mutate: createDerivativeWork } = useCreateDerivativeWork();
  const { mutate: updateDerivativeWork } = useUpdateDerivativeWork();
  const { mutate: saveDraft } = useSaveDraft();
  const { data: draft } = useGetDraft(draftId);
  const { mutate: deleteDraft } = useDeleteDraft();
  const { mutate: continueWriting } = useContinueWriting();
  const { mutate: checkAI } = useCheckAI();
  const { mutate: likeWork } = useLikeWork();
  const { data: likes } = useGetLikes(workId);
  const { mutate: bookmarkWork } = useBookmarkWork();
  const { data: comments } = useGetComments(workId, { page: 1, pageSize: 10 });
  const { mutate: createComment } = useCreateComment();

  // ========== Feed ==========
  const { data: feed } = useGetFeed({ page: 1, pageSize: 20 });
  const { data: searchResults } = useSearchWorks({
    query: "test",
    page: 1,
    pageSize: 20,
  });
  const { data: authorFeed } = useGetAuthorFeed("author-1");

  // ========== Report ==========
  const { mutate: reportWork } = useReportWork();

  // ========== Admin ==========
  const { data: users } = useGetUsers({ page: 1, pageSize: 20 });
  const { data: payments } = useGetPayments({ page: 1, pageSize: 20 });
  const { mutate: refundPayment } = useRefundPayment();
  const { data: reports } = useGetReports({ page: 1, pageSize: 20 });
  const { mutate: resolveReport } = useResolveReport();

  // ========== Test Handlers ==========
  const handleTestAuth = () => {
    console.log("=== Auth Test ===");
    console.log("Me:", me);

    signup({
      email: "test@example.com",
      password: "password123",
      nickname: "테스트유저",
    });

    login({
      email: "test@example.com",
      password: "password123",
    });

    setCount(count + 1);
  };

  const handleTestMypage = () => {
    console.log("=== Mypage Test ===");
    console.log("My Works:", myWorks);
    console.log("My Bookmarks:", myBookmarks);
    console.log("My Points:", myPoints);
    console.log("Paylist:", paylist);
    console.log("Revenue:", revenue);
    setCount(count + 1);
  };

  const handleTestPayment = () => {
    console.log("=== Payment Test ===");
    chargePoints({
      amount: 10000,
      paymentMethod: "card",
    });

    spendPoints({
      workId: "work-1",
      amount: 1000,
      purpose: "작품 열람",
    });
    setCount(count + 1);
  };

  const handleTestWorks = () => {
    console.log("=== Works Test ===");
    console.log("Likes:", likes);
    console.log("Comments:", comments);
    console.log("Draft:", draft);

    createOriginalWork({
      title: "새 작품",
      content: "작품 내용입니다.",
      isPublic: true,
    });

    updateOriginalWork({
      workId: "work-1",
      title: "수정된 작품",
    });

    createDerivativeWork({
      originalWorkId: "work-1",
      title: "2차 작품",
      content: "2차 작품 내용",
      isPublic: true,
    });

    saveDraft({
      title: "임시저장",
      content: "임시 내용",
    });

    likeWork(workId);
    bookmarkWork(workId);

    createComment({
      workId: workId,
      data: { content: "좋은 작품이네요!" },
    });

    setCount(count + 1);
  };

  const handleTestFeed = () => {
    console.log("=== Feed Test ===");
    console.log("Feed:", feed);
    console.log("Search Results:", searchResults);
    console.log("Author Feed:", authorFeed);
    setCount(count + 1);
  };

  const handleTestReport = () => {
    console.log("=== Report Test ===");
    reportWork({
      workId: "work-1",
      data: {
        reason: "부적절한 내용",
        description: "폭력적인 내용이 포함되어 있습니다.",
        category: "inappropriate",
      },
    });
    setCount(count + 1);
  };

  const handleTestAdmin = () => {
    console.log("=== Admin Test ===");
    console.log("Users:", users);
    console.log("Payments:", payments);
    console.log("Reports:", reports);

    refundPayment({
      txId: "tx-1",
      data: { reason: "고객 요청" },
    });

    resolveReport({
      reportId: "report-1",
      data: {
        status: "resolved",
        resolution: "경고 조치 완료",
        action: "warning",
      },
    });

    setCount(count + 1);
  };

  const handleTestAI = () => {
    console.log("=== AI Check Test ===");
    checkAI({
      content: "이것은 테스트 내용입니다. 폭력적인 내용은 없습니다.",
    });

    // 위반 테스트
    checkAI({
      content: "폭력적인 내용이 포함된 텍스트입니다.",
    });

    deleteDraft(draftId);

    continueWriting({
      draftId: draftId,
      data: { content: "이어쓰기 내용" },
    });

    updateDerivativeWork({
      workId: "work-2",
      data: { title: "수정된 2차 작품" },
    });

    setCount(count + 1);
  };

  const handleTestProfile = () => {
    console.log("=== Profile Test ===");
    updateProfile({
      nickname: "새로운닉네임",
      bio: "안녕하세요!",
    });
    setCount(count + 1);
  };

  const handleLogout = () => {
    console.log("=== Logout Test ===");
    logout();
    refreshToken();
    setCount(count + 1);
  };

  const handleTestRevenue = () => {
    console.log("=== Revenue Test ===");
    distributeRevenue({
      workId: "work-1",
      amount: 50000,
      recipients: [
        { userId: "user-1", share: 0.5 },
        { userId: "user-2", share: 0.3 },
        { userId: "user-3", share: 0.2 },
      ],
    });
    setCount(count + 1);
  };
  const pages = [
    {
      category: "마이페이지",
      routes: [
        { path: "/my-page/main", label: "마이페이지 메인" },
        { path: "/my-page/library", label: "내 서재" },
        { path: "/my-page/revenue", label: "수익 현황" },
        { path: "/my-page/point", label: "포인트 내역" },
      ],
    },
    {
      category: "작품 생성",
      routes: [
        { path: "/create-series/basic", label: "작품 생성 - 기본 정보" },
        { path: "/create-series/universe", label: "작품 생성 - 유니버스 정보" },
      ],
    },
    {
      category: "인증",
      routes: [
        { path: "/login", label: "로그인" },
        { path: "/signup", label: "회원가입" },
      ],
    },
    {
      category: "기타",
      routes: [{ path: "/viewer", label: "뷰어" }],
    },
  ];

  return (
    <div className="text-center">
      <header className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[#282c34] pb-8 text-white">

        <div className="my-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Button onTap={handleTestAuth}>🔐 Auth Test ({count})</Button>
          <Button onTap={handleTestMypage}>📚 Mypage Test</Button>
          <Button onTap={handleTestPayment}>💰 Payment Test</Button>
          <Button onTap={handleTestWorks}>📝 Works Test</Button>
          <Button onTap={handleTestFeed}>📰 Feed Test</Button>
          <Button onTap={handleTestReport}>🚨 Report Test</Button>
          <Button onTap={handleTestAdmin}>👨‍💼 Admin Test</Button>
          <Button onTap={handleTestAI}>🤖 AI Check Test</Button>
          <Button onTap={handleTestProfile}>👤 Profile Test</Button>
          <Button onTap={handleTestRevenue}>💸 Revenue Test</Button>
          <Button onTap={handleLogout}>🚪 Logout Test</Button>
        </div>

        <div className="mt-5 max-w-4xl rounded-lg bg-gray-800 p-4 text-left">
          <h3 className="mb-2 text-lg font-bold">📊 Current Data:</h3>
          <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
            <div>
              <p className="text-blue-400">• Me: {me ? "✅" : "⏳"}</p>
              <p className="text-blue-400">
                • Works: {myWorks?.totalCount || 0}
              </p>
              <p className="text-blue-400">
                • Bookmarks: {myBookmarks?.totalCount || 0}
              </p>
              <p className="text-blue-400">
                • Points: {myPoints?.totalPoints || 0}
              </p>
            </div>
            <div>
              <p className="text-green-400">
                • Feed: {feed?.totalCount || 0} works
              </p>
              <p className="text-green-400">
                • Likes: {likes?.likesCount || 0}
              </p>
              <p className="text-green-400">
                • Comments: {comments?.totalCount || 0}
              </p>
              <p className="text-green-400">
                • Users: {users?.totalCount || 0}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-5">
          Edit <code className="text-[#8d96a7]">App.tsx</code> and save to test
          HMR updates.
        </p>
        <p className="mt-3 flex gap-3 text-center text-[#8d96a7]">
          <a
            className="text-[#61dafb] transition-all hover:text-blue-500"
            href="https://react.dev/learn"
            target="_blank"
            rel="noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="text-heading text-[#61dafb] transition-all"
            href="https://vitejs.dev/guide/"
            target="_blank"
            rel="noreferrer"
          >
            Vite Docs
          </a>
          {" | "}
          <a
            className="text-[#61dafb] transition-all hover:text-blue-500"
            href="https://tailwindcss.com/docs/installation"
            target="_blank"
            rel="noreferrer"
          >
            Tailwindcss Docs
          </a>
          {" | "}
          <a
            className="text-[#61dafb] transition-all hover:text-blue-500"
            href="https://www.framer.com/motion/"
            target="_blank"
            rel="noreferrer"
          >
            Framer Docs
          </a>
        </p>
        <ViteIcon />
        {/* Page Navigation */}
        <div className="mt-8 w-full max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold text-white">
            페이지 네비게이션
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pages.map((section) => (
              <div
                key={section.category}
                className="rounded-lg bg-[#1e2228] p-4"
              >
                <h3 className="mb-3 text-lg font-semibold text-[#61dafb]">
                  {section.category}
                </h3>
                <div className="flex flex-col gap-2">
                  {section.routes.map((route) => (
                    <Link
                      key={route.path}
                      to={route.path}
                      className="rounded-md bg-[#2d3238] px-4 py-2 text-sm text-white transition-all hover:bg-[#3d4248] hover:text-[#61dafb]"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default TestPage;
