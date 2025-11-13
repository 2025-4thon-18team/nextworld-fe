import { useState, useCallback } from "react";
import { SignUpView } from "./SignUpView";
import { useSignup } from "@/querys/useAuth";
import { useNavigation } from "@/hooks/useNavigation";

const SignUp = () => {
  const signupMutation = useSignup();
  const { navigateToLogin } = useNavigation();
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
    await signupMutation.mutateAsync({
      name,
      nickname,
      email,
      password,
    });
    navigateToLogin();
  }, [signupMutation, navigateToLogin, name, nickname, email, password]);

  const onLoginClick = useCallback(() => {
    navigateToLogin();
  }, [navigateToLogin]);

  return (
    <SignUpView
      name={name}
      nickname={nickname}
      email={email}
      password={password}
      passwordConfirm={passwordConfirm}
      onNameChange={onNameChange}
      onNicknameChange={onNicknameChange}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      onPasswordConfirmChange={onPasswordConfirmChange}
      onSubmit={onSubmit}
      onLoginClick={onLoginClick}
    />
  );
};

export default SignUp;
