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
