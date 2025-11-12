import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthPort } from "@/services/types";

export function useLogin(params: { auth?: AuthPort }) {
  const { auth } = params;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const onPasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onSubmit = useCallback(async () => {
    if (!auth) return;
    await auth.login(email, password);
    navigate("/my-page/main");
  }, [auth, navigate, email, password]);

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

