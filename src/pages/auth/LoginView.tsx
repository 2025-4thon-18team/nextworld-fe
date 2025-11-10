import { FC } from "react";
import { InputLabel, TextInput } from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { LogoBig } from "@/assets/logo";

type Props = {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  onSignupClick: () => void;
};

export const LoginView: FC<Props> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onSignupClick,
}) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-60 bg-white">
      <div className="flex w-459 flex-col items-center gap-32 pt-0">
        <LogoBig className="h-204 w-110" />

        <div className="flex w-full flex-col items-start gap-40">
          {/* Form Fields */}
          <div className="flex w-full flex-col items-start gap-24">
            <div className="gap-sm flex h-76 w-full flex-col items-start">
              <InputLabel>이메일</InputLabel>
              <TextInput
                placeholder="sample@gmail.com"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
              />
            </div>
            <div className="gap-sm flex h-76 w-full flex-col items-start">
              <InputLabel>비밀번호</InputLabel>
              <TextInput
                type="password"
                placeholder="영문, 숫자 포함 8자 이상"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex w-full flex-col items-start gap-24">
            <Button variant="default" className="w-full" onClick={onSubmit}>
              로그인
            </Button>

            {/* Divider */}
            <div className="flex h-23 w-full items-center gap-12">
              <div className="border-grayscale-g2 h-0 flex-1 border-t" />
              <p className="text-body-small-medium text-center tracking-tight text-[#a6a6a6]">
                서비스가 처음이라면
              </p>
              <div className="border-grayscale-g2 h-0 flex-1 border-t" />
            </div>

            <Button variant="subtle" className="w-full" onClick={onSignupClick}>
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

