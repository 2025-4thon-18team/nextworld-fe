import { AuthorPageView } from "./AuthorPageView";
import { useAuthorPage } from "@/logic/useAuthorPage";

const AuthorPage = () => {
  const {
    authorName,
    authorBio,
    authorContact,
    profileImageUrl,
    activeTab,
    seriesList,
    onTabChange,
  } = useAuthorPage();

  return (
    <AuthorPageView
      authorName={authorName}
      authorBio={authorBio}
      authorContact={authorContact}
      profileImageUrl={profileImageUrl}
      activeTab={activeTab}
      seriesList={seriesList}
      onTabChange={onTabChange}
    />
  );
};

export default AuthorPage;

