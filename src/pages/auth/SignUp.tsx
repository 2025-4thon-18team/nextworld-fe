import { SignUpView } from "./SignUpView";
import { useSignUp } from "@/logic/useSignUp";
import { createAuthPort } from "@/services/auth.service";

const SignUp = () => {
  const auth = createAuthPort();
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
  } = useSignUp({ auth });

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
