import { Router } from "@/Router";

function App() {
  console.log(import.meta.env.VITE_API_URL); // ✅ 여전히 환경 변수 확인 가능
  return <Router />; // ✅ 실제 라우팅은 Router.tsx에서 담당
}

export default App;
