export type RouterPort = {
  getPath: () => string;
  goTo: (path: string) => void;
};

export type UserPort = {
  getPoints: () => Promise<number>;
  getProfile: () => Promise<{
    name: string;
    bio: string[];
    contact: string;
    profileImageUrl?: string;
  }>;
};

export type SeriesPort = {
  getMySeries: () => Promise<
    Array<{
      id: number;
      imageUrl: string;
      title: string;
    }>
  >;
  getLibrarySeries: () => Promise<
    Array<{
      id: number;
      imageUrl: string;
      title: string;
    }>
  >;
  getSeriesDetail: (id: string) => Promise<{
    imageUrl: string;
    universeName: string;
    seriesName: string;
    authorName: string;
    description: string;
    category: string;
    rating: number;
    views: number;
    isSerializing: boolean;
    tags: string[];
    likes: number;
  }>;
  getEpisodes: (seriesId: string) => Promise<
    Array<{
      id: string;
      title: string;
      points: number;
      rating: number;
      views: number;
      comments: number;
      date: string;
    }>
  >;
  getUniverseWorks: (seriesId: string) => Promise<
    Array<{
      id: string;
      imageUrl: string;
      title: string;
      tags: string[];
    }>
  >;
  getPopularPosts: (seriesId: string) => Promise<
    Array<{
      id: string;
      title: string;
      points: number;
      content: string;
      tags: string[];
      rating: number;
      views: number;
      comments: number;
      date: string;
    }>
  >;
  searchOriginalSeries: (query: string) => Promise<
    Array<{
      id: string;
      imageUrl: string;
      title: string;
    }>
  >;
};

export type PointPort = {
  getChargeHistory: () => Promise<
    Array<{
      id: number;
      title: string;
      date: string;
      points: number;
    }>
  >;
  getUsageHistory: () => Promise<
    Array<{
      id: number;
      type: "post";
      title: string;
      subtitle: string;
      points: number;
      date: string;
    }>
  >;
};

export type RevenuePort = {
  getRevenueData: () => Promise<{
    totalSales: number;
    totalRevenue: number;
    authorFee: number;
    platformFee: number;
  }>;
  getSalesHistory: () => Promise<
    Array<{
      id: number;
      contentTitle: string;
      buyer: string;
      points: number;
      date: string;
    }>
  >;
};

export type AuthPort = {
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    name: string;
    nickname: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => Promise<void>;
};

export type ContentPort = {
  getUniverseOfWeek: () => Promise<{
    id: string;
    imageUrl: string;
    title: string;
    tags: string[];
  } | null>;
  getPopularSeries: () => Promise<
    Array<{
      id: string;
      imageUrl: string;
      title: string;
      tags: string[];
    }>
  >;
  getPopularPosts: () => Promise<
    Array<{
      id: string;
      title: string;
      content: string;
      points: number;
      tags: string[];
      rating: number;
      views: number;
      comments: number;
      date: string;
    }>
  >;
  getNewSeries: () => Promise<
    Array<{
      id: string;
      imageUrl: string;
      title: string;
      tags: string[];
    }>
  >;
  getNewPosts: () => Promise<
    Array<{
      id: string;
      title: string;
      content: string;
      points: number;
      tags: string[];
      rating: number;
      views: number;
      comments: number;
      date: string;
    }>
  >;
  getFavoriteSeries: () => Promise<
    Array<{
      id: string;
      imageUrl: string;
      title: string;
      tags: string[];
    }>
  >;
  getLatestUpdates: () => Promise<
    Array<{
      id: string;
      title: string;
      points: number;
      rating: number;
      views: number;
      comments: number;
      date: string;
    }>
  >;
  getNewUniverseSeries: () => Promise<
    Array<{
      id: string;
      imageUrl: string;
      title: string;
      tags: string[];
    }>
  >;
};
