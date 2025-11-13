import { LoginView } from "./LoginView";
import { useLogin } from "@/logic/useLogin";

const Login = () => {
  const {
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onSignupClick,
  } = useLogin();

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
