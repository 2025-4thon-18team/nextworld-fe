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
    // 값 검증
    if (
      !name.trim() ||
      !nickname.trim() ||
      !email.trim() ||
      !password.trim() ||
      !passwordConfirm.trim()
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await signupMutation.mutateAsync({
        name: name.trim(),
        nickname: nickname.trim(),
        email: email.trim(),
        password: password,
        passwordConfirm: passwordConfirm,
      });
      navigateToLogin();
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    }
  }, [
    signupMutation,
    navigateToLogin,
    name,
    nickname,
    email,
    password,
    passwordConfirm,
  ]);

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
