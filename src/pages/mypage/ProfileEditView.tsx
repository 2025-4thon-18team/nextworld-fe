// src/pages/my/ProfileEditView.tsx
import { FC, ChangeEvent } from "react";
import { cn } from "@/utils";
import iconMail from "@/assets/icons/icon-mail.svg";   // ⭐ 추가
import iconX from "@/assets/icons/icon-x.svg";         // ⭐ 추가

interface Props {
  className?: string;

  name: string;
  bio: string;
  email: string;
  twitter: string;

  nameLength: number;
  bioLength: number;

  previewUrl: string | null;
  fileName: string | null;

  onChangeName: (value: string) => void;
  onChangeBio: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangeTwitter: (value: string) => void;
  onSelectFile: () => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  isSaving: boolean;
  isValid: boolean;

  fileInputRef: React.RefObject<HTMLInputElement>;

  // ⭐ 추가됨: textarea auto-resize용 ref
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export const ProfileEditView: FC<Props> = ({
  className,

  name,
  bio,
  email,
  twitter,

  nameLength,
  bioLength,

  previewUrl,
  fileName,

  onChangeName,
  onChangeBio,
  onChangeEmail,
  onChangeTwitter,
  onSelectFile,
  onFileChange,
  onSave,
  isSaving,
  isValid,

  fileInputRef,
  textareaRef, // ⭐ 추가됨
}) => {
  return (
    <div className={cn("flex flex-col", className)}>

      {/* 상단 네비 */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <button
          onClick={() => history.back()}
          className="text-xl text-gray-400 hover:text-gray-600"
        >
          &lt;
        </button>
        <span>프로필 수정</span>
      </div>

      {/* 프로필 이미지 */}
      <section className="flex flex-col gap-4 mb-10">
        <h2 className="text-lg font-semibold text-black">프로필 이미지</h2>

        <div className="flex items-center gap-10">
          {/* 이미지 */}
          <div className="h-28 w-28 rounded-full overflow-hidden bg-gray-100 shadow-sm">
            {previewUrl ? (
              <img src={previewUrl} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl text-gray-300">
                👤
              </div>
            )}
          </div>

          {/* 파일 선택 */}
          <div className="w-full max-w-[600px]">
            <div
              onClick={onSelectFile}
              style={{ minHeight: "30px" }}
              className="flex h-11 items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-500 cursor-pointer"
            >
              <span className="truncate">
                {fileName || "파일을 선택해주세요."}
              </span>
              <span className="rounded-md bg-purple-500 px-3 py-1 text-xs font-medium text-white">
                파일 선택
              </span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
          </div>
        </div>
      </section>

      {/* 이름 */}
      <section className="flex flex-col gap-2 mb-8">
        <label className="text-sm font-semibold text-black">
          이름 <span className="text-purple-500">*</span>
        </label>

        <input
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          style={{ minHeight: "30px" }}
          className="h-11 w-full max-w-[628px] rounded-lg border border-gray-300 px-3 text-sm focus:border-purple-500 focus:ring-purple-500"
          placeholder="이름을 입력해주세요."
        />

        <p
          className={cn(
            "text-xs",
            nameLength < 1 || nameLength > 20
              ? "text-red-500"
              : "text-gray-400",
          )}
        >
          1자 이상 20자 이하 ({nameLength}자)
        </p>
      </section>

      {/* 자기소개 */}
      <section className="flex flex-col gap-2 mb-10">
        <label className="text-sm font-semibold text-black">자기소개</label>

        <textarea
          ref={textareaRef}
          value={bio}
          onChange={(e) => onChangeBio(e.target.value)}
          style={{ minHeight: "100px" }}
          className="
            w-full 
            max-w-[628px] 
            rounded-lg 
            border 
            border-gray-300 
            px-3 py-3 
            text-sm 
            focus:border-purple-500 
            focus:ring-purple-500 
            overflow-hidden
            resize-none
          "
          placeholder="자기소개를 입력해주세요."
        />

        <p
          className={cn(
            "text-xs",
            bioLength > 200 ? "text-red-500" : "text-gray-400",
          )}
        >
          최대 200자 ({bioLength}자)
        </p>
      </section>

      {/* 소셜 */}
      <section className="flex flex-col gap-4 mb-14">
        <h3 className="text-sm font-semibold text-black">소셜 정보</h3>

        {/* 이메일 */}
        <div className="flex items-center gap-3 max-w-[628px]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg">
            <img src={iconMail} alt="email" className="h-5 w-5" /> {/* ⭐ 변경 */}
          </div>
          <input
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            style={{ minHeight: "30px" }}
            placeholder="이메일 입력"
            className="h-11 flex-1 rounded-lg border border-gray-300 px-3 text-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        {/* 트위터(X) */}
        <div className="flex items-center gap-3 max-w-[628px]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg">
            <img src={iconX} alt="twitter-x" className="h-5 w-5" /> {/* ⭐ 변경 */}
          </div>
          <input
            value={twitter}
            onChange={(e) => onChangeTwitter(e.target.value)}
            style={{ minHeight: "30px" }}
            placeholder="Twitter 계정 입력"
            className="h-11 flex-1 rounded-lg border border-gray-300 px-3 text-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </section>

      {/* 저장 버튼 */}
      <div className="flex max-w-[600px] justify-end">
        <button
          onClick={onSave}
          disabled={!isValid || isSaving}
          className={cn(
            "h-28 w-110 rounded-full text-sm font-semibold text-white transition",
            !isValid ? "bg-purple-300" : "bg-purple-500 hover:bg-purple-600",
          )}
        >
          {isSaving ? "저장 중..." : "변경 내용 저장"}
        </button>
      </div>
    </div>
  );
};
