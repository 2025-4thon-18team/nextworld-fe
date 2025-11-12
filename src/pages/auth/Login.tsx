import { LoginView } from "./LoginView";
import { useLogin } from "@/logic/useLogin";
import { createAuthPort } from "@/services/auth.service";

const Login = () => {
  const auth = createAuthPort();
  const {
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onSignupClick,
  } = useLogin({ auth });

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
