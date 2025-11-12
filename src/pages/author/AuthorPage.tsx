import { AuthorPageView } from "./AuthorPageView";
import { useAuthorPage } from "@/logic/useAuthorPage";
import { createSeriesPort } from "@/services/series.service";

const AuthorPage = () => {
  const series = createSeriesPort();
  const {
    authorName,
    authorBio,
    authorContact,
    profileImageUrl,
    activeTab,
    seriesList,
    onTabChange,
  } = useAuthorPage({ series });

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

