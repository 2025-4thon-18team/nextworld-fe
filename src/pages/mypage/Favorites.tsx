import { FC } from "react";

const Favorites: FC = () => {
  return (
    <div className="flex flex-col gap-24 p-24">
      <h1 className="text-headings-heading-1 text-black">선호 작품</h1>
      <p className="text-body-regular text-text-muted">
        선호 작품 페이지입니다.
      </p>
    </div>
  );
};

export default Favorites;
