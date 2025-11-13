import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

// JWT access_token을 Authorization 헤더에 자동으로 추가하는 인터셉터
client.interceptors.request.use(
  (config) => {
    // const { accessToken } = useAuthStore.getState();
    // TODO: accessToken 가져오기
    const accessToken = "test";
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log(config.headers);
    return config;
  },
  (error) => Promise.reject(error),
);

// BaseResponse 래핑 해제 및 응답 처리
client.interceptors.response.use(
  (response) => {
    // BaseResponse로 래핑된 경우 data 추출
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return {
        ...response,
        data: response.data.data,
      };
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // const { logout, setTokens } = useAuthStore.getState();
      // 발급 시도 프로미스, 이미 발급 중이면 대기
      if (!isRefreshing) {
        isRefreshing = true;
        // TODO: Refresh 토큰 가져오기
        const refreshToken = ""; // useAuthStore.getState().refreshToken;
        refreshPromise = client
          .post(
            `${import.meta.env.VITE_SERVER_URL}/api/auth/refresh`,
            {},
            {
              headers: {
                "Refresh-Token": refreshToken,
              },
              withCredentials: true,
            },
          )
          .then((res) => {
            // 백엔드에서 BaseResponse로 래핑된 문자열(새로운 accessToken) 반환
            const newAccessToken = res.data?.data || res.data;
            // TODO: Refresh 토큰 저장
            // setTokens({ accessToken: newAccessToken, refreshToken });
            return newAccessToken;
          })
          .catch((err) => {
            // 발급 실패 시 처리, 예시 : 로그아웃 후 에러 페이지로 이동
            throw err;
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      // 발급 완료 후 요청 재시도
      try {
        const newAccessToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
