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
import { useGetMyPoints, useGetPaylist } from "@/querys/useMypage";

// Payment
// import { useChargePoints, useUsePoints } from "@/querys/usePayment";

// Revenue
// import { useDistributeRevenue } from "@/querys/useRevenue";

// Works
import {} from "@/querys/useWorks";

// Admin
// import { useGetPayments, useRefundPayment } from "@/querys/useAdmin";

function TestPage() {
  const [count, setCount] = useState(0);
  // const [draftId] = useState("draft-1");
  // const [workId] = useState("work-1");

  // const words = [
  //   { text: "Vite", className: "text-[#a95eff]" },
  //   { text: " + " },
  //   { text: "React", className: "text-[#61dafb]" },
  //   { text: " + " },
  //   { text: "Tailwindcss", className: "text-[#0ea5e9]" },
  //   { text: " + " },
  //   { text: "Framer Motion", className: "text-[#ff57c8]" },
  // ];

  // ========== Auth ==========
  const { data: me } = useGetMe();
  const { mutate: signup } = useSignup();
  const { mutate: login } = useLogin();
  const { mutate: logout } = useLogout();
  const { mutate: refreshToken } = useRefreshToken();

  // ========== Users ==========
  const { mutate: updateProfile } = useUpdateProfile();

  // ========== Mypage ==========
  // const { data: myWorks } = useGetMyWorks({ page: 1, pageSize: 10 });
  // const { data: myBookmarks } = useGetMyBookmarks({ page: 1, pageSize: 10 });
  const { data: myPoints } = useGetMyPoints();
  const { data: paylist } = useGetPaylist();
  // const { data: revenue } = useGetRevenue();

  // ========== Payment ==========
  // const { mutate: chargePoints } = useChargePoints();
  // const { mutate: spendPoints } = useUsePoints();

  // ========== Revenue ==========
  // const { mutate: distributeRevenue } = useDistributeRevenue();

  // ========== Works ==========
  // const { mutate: createOriginalWork } = useCreateOriginalWork();
  // const { mutate: updateOriginalWork } = useUpdateOriginalWork();
  // const { mutate: createDerivativeWork } = useCreateDerivativeWork();
  // const { mutate: updateDerivativeWork } = useUpdateDerivativeWork();
  // const { mutate: saveDraft } = useSaveDraft();
  // const { data: draft } = useGetDraft(draftId);
  // const { mutate: deleteDraft } = useDeleteDraft();
  // const { mutate: continueWriting } = useContinueWriting();
  // const { mutate: checkAI } = useCheckAI();
  // const { mutate: likeWork } = useLikeWork();
  // const { data: likes } = useGetLikes(workId);
  // const { mutate: bookmarkWork } = useBookmarkWork();

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
    // console.log("My Works:", myWorks);
    // console.log("My Bookmarks:", myBookmarks);
    console.log("My Points:", myPoints);
    console.log("Paylist:", paylist);
    // console.log("Revenue:", revenue);
    setCount(count + 1);
  };

  const handleTestPayment = () => {
    console.log("=== Payment Test ===");
    // chargePoints({
    //   impUid: "imp_1234567890",
    //   amount: 10000,
    // });

    // spendPoints({
    //   amount: 1000,
    //   postId: 1,
    // });
    setCount(count + 1);
  };

  const handleTestWorks = () => {
    console.log("=== Works Test ===");
    // console.log("Likes:", likes);
    // console.log("Comments:", comments);
    // console.log("Draft:", draft);

    // createOriginalWork({
    //   title: "새 작품",
    //   content: "작품 내용입니다.",
    //   isPublic: true,
    // });

    // updateOriginalWork({
    //   workId: "work-1",
    //   title: "수정된 작품",
    // });

    // createDerivativeWork({
    //   originalWorkId: "work-1",
    //   title: "2차 작품",
    //   content: "2차 작품 내용",
    //   isPublic: true,
    // });

    // saveDraft({
    //   title: "임시저장",
    //   content: "임시 내용",
    // });

    // likeWork(workId);
    // bookmarkWork(workId);

    // createComment({
    //   workId: workId,
    //   data: { content: "좋은 작품이네요!" },
    // });

    setCount(count + 1);
  };

  const handleTestFeed = () => {
    console.log("=== Feed Test ===");
    // console.log("Feed:", feed);
    // console.log("Search Results:", searchResults);
    // console.log("Author Feed:", authorFeed);
    setCount(count + 1);
  };

  const handleTestReport = () => {
    console.log("=== Report Test ===");
    // reportWork({
    //   workId: "work-1",
    //   data: {
    //     reason: "부적절한 내용",
    //     description: "폭력적인 내용이 포함되어 있습니다.",
    //     category: "inappropriate",
    //   },
    // });
    setCount(count + 1);
  };

  const handleTestAdmin = () => {
    console.log("=== Admin Test ===");
    // console.log("Users:", users);
    // console.log("Payments:", payments);
    // console.log("Reports:", reports);

    // refundPayment({
    //   txId: "tx-1",
    //   data: { reason: "고객 요청" },
    // });

    // resolveReport({
    //   reportId: "report-1",
    //   data: {
    //     status: "resolved",
    //     resolution: "경고 조치 완료",
    //     action: "warning",
    //   },
    // });

    setCount(count + 1);
  };

  const handleTestAI = () => {
    console.log("=== AI Check Test ===");
    // checkAI({
    //   content: "이것은 테스트 내용입니다. 폭력적인 내용은 없습니다.",
    // });

    // 위반 테스트
    // checkAI({
    //   content: "폭력적인 내용이 포함된 텍스트입니다.",
    // });

    // deleteDraft(draftId);

    // continueWriting({
    //   draftId: draftId,
    //   data: { content: "이어쓰기 내용" },
    // });

    // updateDerivativeWork({
    //   workId: "work-2",
    //   data: { title: "수정된 2차 작품" },
    // });

    setCount(count + 1);
  };

  const handleTestProfile = () => {
    console.log("=== Profile Test ===");
    updateProfile({
      nickname: "새로운닉네임",
      // bio: "안녕하세요!",
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
    // distributeRevenue({
    //   payId: 1,
    //   postId: 1,
    // });
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
          <button onClick={handleTestAuth}>🔐 Auth Test ({count})</button>
          <button onClick={handleTestMypage}>📚 Mypage Test</button>
          <button onClick={handleTestPayment}>💰 Payment Test</button>
          <button onClick={handleTestWorks}>📝 Works Test</button>
          <button onClick={handleTestFeed}>📰 Feed Test</button>
          <button onClick={handleTestReport}>🚨 Report Test</button>
          <button onClick={handleTestAdmin}>👨‍💼 Admin Test</button>
          <button onClick={handleTestAI}>🤖 AI Check Test</button>
          <button onClick={handleTestProfile}>👤 Profile Test</button>
          <button onClick={handleTestRevenue}>💸 Revenue Test</button>
          <button onClick={handleLogout}>🚪 Logout Test</button>
        </div>

        <div className="mt-5 max-w-4xl rounded-lg bg-gray-800 p-4 text-left">
          <h3 className="mb-2 text-lg font-bold">📊 Current Data:</h3>
          <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
            <div>
              <p className="text-blue-400">• Me: {me ? "✅" : "⏳"}</p>
              {/* <p className="text-blue-400">
                • Works: {myWorks?.totalCount || 0}
              </p>
              <p className="text-blue-400">
                • Bookmarks: {myBookmarks?.totalCount || 0}
              </p> */}
              <p className="text-blue-400">
                • Points: {myPoints?.balance || 0}
              </p>
            </div>
            <div>
              {/* <p className="text-green-400">
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
              </p> */}
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
        {/* <ViteIcon /> */}
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
