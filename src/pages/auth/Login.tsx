import { useState, useCallback } from "react";
import { LoginView } from "./LoginView";
import { useLogin as useLoginMutation } from "@/querys/useAuth";
import { useNavigation } from "@/hooks/useNavigation";

const Login = () => {
  const loginMutation = useLoginMutation();
  const { navigateToMyPageMain, navigateToSignup } = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const onPasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onSubmit = useCallback(async () => {
    await loginMutation.mutateAsync({ email, password });
    navigateToMyPageMain();
  }, [loginMutation, navigateToMyPageMain, email, password]);

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
