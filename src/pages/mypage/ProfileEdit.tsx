// src/pages/my/ProfileEdit.tsx
import { FC, useEffect, useRef, useState } from "react";
import { ProfileEditView } from "./ProfileEditView";
import { ProfileEditLayoutView } from "./ProfileEditLayoutView";
import { useMyProfile, useUpdateMyProfile } from "@/querys/useProfile";

const NAME_MAX = 20;
const BIO_MAX = 200;

export const ProfileEdit: FC = () => {
  const { data: profile } = useMyProfile();
  const { mutate: updateProfile, isPending } = useUpdateMyProfile();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [twitter, setTwitter] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!profile) return;
    setName(profile.name);
    setBio(profile.bio);
    setEmail(profile.email);
    setTwitter(profile.twitter);
    setPreviewUrl(profile.profileImageUrl ?? null);
  }, [profile]);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateProfile(
      {
        name,
        bio,
        email,
        twitter,
      },
      {
        onSuccess: () => {
          alert("변경 완료!");
          history.back();
        },
      },
    );
  };

  const isValid =
    name.trim().length >= 1 &&
    name.trim().length <= NAME_MAX &&
    bio.trim().length <= BIO_MAX;

  return (
    <ProfileEditLayoutView>
      <ProfileEditView
        name={name}
        bio={bio}
        email={email}
        twitter={twitter}
        nameLength={name.length}
        bioLength={bio.length}
        previewUrl={previewUrl}
        fileName={imageFile?.name ?? null}
        onChangeName={setName}
        onChangeBio={setBio}
        onChangeEmail={setEmail}
        onChangeTwitter={setTwitter}
        onSelectFile={() => fileInputRef.current?.click()}
        onFileChange={handleFileChange}
        onSave={handleSave}
        isSaving={isPending}
        isValid={isValid}
        fileInputRef={fileInputRef}
      />
    </ProfileEditLayoutView>
  );
};

export default ProfileEdit;
