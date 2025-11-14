import { useState, useCallback } from "react";
import { LoginView } from "./LoginView";
import { useLogin as useLoginMutation } from "@/querys/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import { useAuthStore } from "@/stores/authStore";

const Login = () => {
  const loginMutation = useLoginMutation();
  const { navigateToMyPageMain, navigateToSignup } = useNavigation();
  const setTokens = useAuthStore((state) => state.setTokens);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const onPasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onSubmit = useCallback(async () => {
    if (!email.trim() || !password.trim()) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await loginMutation.mutateAsync({
        email: email.trim(),
        password: password,
      });

      // 토큰 저장
      setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });

      navigateToMyPageMain();
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다.");
    }
  }, [loginMutation, navigateToMyPageMain, email, password, setTokens]);

  const onSignupClick = useCallback(() => {
    navigateToSignup();
  }, [navigateToSignup]);

  return (
    <LoginView
      email={email}
      password={password}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      onSubmit={onSubmit}
      onSignupClick={onSignupClick}
    />
  );
};

export default Login;
