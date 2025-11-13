import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 공통 네비게이션 핸들러 훅
 */
export function useNavigation() {
  const navigate = useNavigate();

  const navigateToSeries = useCallback(
    (id: string | number) => {
      navigate(`/series/${id}`);
    },
    [navigate],
  );

  const navigateToPost = useCallback(
    (id: string | number) => {
      navigate(`/post/${id}`);
    },
    [navigate],
  );

  const navigateToViewer = useCallback(
    (episodeId: string | number) => {
      navigate(`/viewer?episode=${episodeId}`);
    },
    [navigate],
  );

  const navigateToContent = useCallback(
    (id: string | number) => {
      navigate(`/content/${id}`);
    },
    [navigate],
  );

  const navigateToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const navigateToNew = useCallback(() => {
    navigate("/new");
  }, [navigate]);

  const navigateToInterests = useCallback(() => {
    navigate("/interests");
  }, [navigate]);

  const navigateToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const navigateToSignup = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  const navigateToMyPageMain = useCallback(() => {
    navigate("/my-page/main");
  }, [navigate]);

  const navigateToProfileEdit = useCallback(() => {
    navigate("/my-page/profile/edit");
  }, [navigate]);

  const navigateBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    navigateToSeries,
    navigateToPost,
    navigateToViewer,
    navigateToContent,
    navigateToHome,
    navigateToNew,
    navigateToInterests,
    navigateToLogin,
    navigateToSignup,
    navigateToMyPageMain,
    navigateToProfileEdit,
    navigateBack,
    navigate, // 원본 navigate도 필요시 사용 가능
  };
}

