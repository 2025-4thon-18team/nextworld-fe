import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthPort } from "@/services/types";

export function useSignUp(params: { auth?: AuthPort }) {
  const { auth } = params;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onNameChange = useCallback((value: string) => {
    setName(value);
  }, []);

  const onNicknameChange = useCallback((value: string) => {
    setNickname(value);
  }, []);

  const onEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const onPasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onPasswordConfirmChange = useCallback((value: string) => {
    setPasswordConfirm(value);
  }, []);

  const onSubmit = useCallback(async () => {
    if (!auth) return;
    await auth.signup({
      name,
      nickname,
      email,
      password,
      passwordConfirm,
    });
    navigate("/login");
  }, [auth, navigate, name, nickname, email, password, passwordConfirm]);

  const onLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return {
    name,
    nickname,
    email,
    password,
    passwordConfirm,
    onNameChange,
    onNicknameChange,
    onEmailChange,
    onPasswordChange,
    onPasswordConfirmChange,
    onSubmit,
    onLoginClick,
  };
}

