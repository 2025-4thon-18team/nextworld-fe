import { FC, useCallback, useState } from "react";
import { LayoutView } from "./LayoutView";
import { useNavigate } from "react-router-dom";
import { useGetMe, useIsAuthenticated } from "@/querys";

export const Layout: FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const { data: profileData } = useGetMe({ enabled: isAuthenticated });
  const [searchValue, setSearchValue] = useState("");

  const onWriteClick = useCallback(() => {
    navigate("/editor");
  }, [navigate]);

  const onProfileClick = useCallback(() => {
    navigate("/my-page/main");
  }, [navigate]);

  return (
    <LayoutView
      isAuthorized={isAuthenticated}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      onWriteClick={onWriteClick}
      profileImageUrl={profileData?.profileImageUrl}
      onProfileClick={onProfileClick}
    />
  );
};
