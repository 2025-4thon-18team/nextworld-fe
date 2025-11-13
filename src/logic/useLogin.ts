import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin as useLoginMutation } from "@/querys/useAuth";

export function useLogin() {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
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
    navigate("/my-page/main");
  }, [loginMutation, navigate, email, password]);

  const onSignupClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  return {
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onSignupClick,
  };
}
