import { SignUpView } from "./SignUpView";
import { useSignUp } from "@/logic/useSignUp";

const SignUp = () => {
  const {
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
  } = useSignUp();

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
