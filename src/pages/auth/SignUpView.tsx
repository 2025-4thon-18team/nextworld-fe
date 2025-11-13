import { FC } from "react";
import { InputLabel, TextInput } from "@/components/Input/Input";
import { LogoBig } from "@/assets/logo";
import Button from "@/components/Button/Button";
import { Link } from "react-router-dom";
type Props = {
  name: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  onNameChange: (value: string) => void;
  onNicknameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmChange: (value: string) => void;
  onSubmit: () => void;
  onLoginClick: () => void;
};

export const SignUpView: FC<Props> = ({
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
}) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-60 bg-white">
      <div className="flex w-456 flex-col items-center gap-32 pt-0">
        <LogoBig className="h-204 w-110" />

        <div className="flex w-full flex-col items-start gap-40">
          {/* Form Fields */}
          <div className="flex w-full flex-col items-start gap-24">
            <div className="gap-sm flex w-full flex-col items-start">
              <InputLabel>이름</InputLabel>
              <TextInput
                placeholder="영문, 숫자 포함 8자 이상"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
              />
            </div>
            <div className="gap-sm flex w-full flex-col items-start">
              <InputLabel>닉네임</InputLabel>
              <TextInput
                placeholder="영문, 숫자 포함 8자 이상"
                value={nickname}
                onChange={(e) => onNicknameChange(e.target.value)}
              />
            </div>
            <div className="gap-sm flex w-full flex-col items-start">
              <InputLabel>이메일</InputLabel>
              <TextInput
                placeholder="sample@gmail.com"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
              />
            </div>
            <div className="gap-sm flex w-full flex-col items-start">
              <InputLabel>비밀번호</InputLabel>
              <TextInput
                type="password"
                placeholder="영문, 숫자 포함 8자 이상"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
              />
            </div>
            <div className="gap-sm flex w-full flex-col items-start">
              <InputLabel>비밀번호 확인</InputLabel>
              <TextInput
                type="password"
                placeholder="영문, 숫자 포함 8자 이상"
                value={passwordConfirm}
                onChange={(e) => onPasswordConfirmChange(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="gap-sm flex w-full flex-col items-center">
            <Button onClick={onSubmit} variant="subtle" className="w-full">
              회원가입
            </Button>
            <Link
              to="/login"
              className="text-body-small-medium text-center tracking-tight text-[#a6a6a6]"
            >
              이미 가입된 회원이면? 로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
