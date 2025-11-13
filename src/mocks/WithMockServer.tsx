import { useEffect, useState } from "react";

async function initMsw() {
  if (typeof window !== "undefined") {
    const { worker } = await import("./browser");
    // MSW 설정: unhandled request에 대한 동작 설정
    // 'bypass'는 핸들러가 없으면 실제 네트워크 요청으로 전달 (백엔드 서버가 없으면 여전히 실패)
    // 'warn'은 경고만 표시 (기본값)
    // 'error'는 에러로 처리
    await worker.start({
      onUnhandledRequest: 'warn', // 경고만 표시하고 passthrough 시도
    });
  } else {
    // const { server } = await import("./server");
    // server.listen();
    const { worker } = await import("./browser");
    await worker.start({
      onUnhandledRequest: 'warn',
    });
  }
}

export default function WithMockServer() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const shouldMock =
      import.meta.env.VITE_APP_ENV === "development" &&
      import.meta.env.VITE_ENABLE_MOCK === "true";

    if (!shouldMock) return;

    const init = async () => {
      await initMsw();
      setReady(true);
    };

    if (!ready) {
      init();
    }
  }, [ready]);

  if (!ready && import.meta.env.MODE === "development") {
    return (
      <p className="text-sm text-gray-500">🧪 Mock server initializing...</p>
    );
  }

  if (ready && import.meta.env.MODE === "development") {
    return <p className="text-sm text-gray-500">🎉 Mock server initialized</p>;
  }

  return null;
}
