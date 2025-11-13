import { http, HttpResponse } from "msw";
import { serverUrl } from "../utils";

// 가짜 작품 데이터 생성
const createMockFeedWork = (id: number) => ({
  workId: `work-${id}`,
  title: `작품 제목 ${id}`,
  content: `작품 내용 ${id}입니다. 이것은 멋진 이야기입니다...`,
  type: id % 3 === 0 ? "derivative" : ("original" as "original" | "derivative"),
  authorId: `author-${(id % 10) + 1}`,
  authorName: `작가${(id % 10) + 1}`,
  authorProfileImage: `https://placehold.co/50?text=Author${(id % 10) + 1}`,
  likesCount: Math.floor(Math.random() * 1000),
  commentsCount: Math.floor(Math.random() * 100),
  bookmarksCount: Math.floor(Math.random() * 500),
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  thumbnailUrl: `https://placehold.co/300x200?text=Work${id}`,
  tags: [`태그${id % 5}`, `장르${id % 3}`],
  category: `카테고리${(id % 4) + 1}`,
});

// 가짜 포스트 데이터 생성 함수
const createMockPost = (id: number, workId?: number) => ({
  id,
  workId,
  workTitle: workId ? `작품 제목 ${workId}` : undefined,
  postType: workId ? ("EPISODE" as const) : ("POST" as const),
  episodeNumber: workId ? id : undefined,
  parentWorkId: workId ? undefined : Math.floor(Math.random() * 10) + 1,
  parentWorkTitle: workId
    ? undefined
    : `원작 작품 ${Math.floor(Math.random() * 10) + 1}`,
  authorName: `작가${(id % 10) + 1}`,
  creationType: workId
    ? undefined
    : ((Math.random() > 0.5 ? "ORIGINAL" : "DERIVATIVE") as
        | "ORIGINAL"
        | "DERIVATIVE"),
  title: workId ? `회차 제목 ${id}` : `포스트 제목 ${id}`,
  content: `포스트 내용 ${id}입니다. 이것은 멋진 이야기입니다...`,
  hasImage: Math.random() > 0.5,
  isPaid: Math.random() > 0.7,
  price:
    Math.random() > 0.7 ? Math.floor(Math.random() * 500) + 100 : undefined,
  tags: [`태그${id % 5}`, `장르${id % 3}`],
  viewsCount: Math.floor(Math.random() * 1000),
  commentsCount: Math.floor(Math.random() * 100),
  rating: Number((Math.random() * 5).toFixed(2)),
  status: "PUBLISHED" as const,
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  updatedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
});

export const feedHandlers = [
  // 포스트 목록 조회 (workId 필터링 가능)
  http.get(serverUrl("/api/posts"), ({ request }) => {
    const url = new URL(request.url);
    const workIdParam = url.searchParams.get("workId");
    const workId = workIdParam ? parseInt(workIdParam) : undefined;

    const allPosts = Array.from({ length: 100 }, (_, i) => {
      // workId가 있으면 해당 작품의 회차만, 없으면 독립 포스트만
      const postWorkId =
        workId ||
        (i % 3 === 0 ? undefined : Math.floor(Math.random() * 10) + 1);
      return createMockPost(i + 1, postWorkId);
    });

    const filteredPosts = workId
      ? allPosts.filter((post) => post.workId === workId)
      : allPosts.filter((post) => !post.workId);

    return HttpResponse.json(filteredPosts);
  }),

  // 포스트 상세 조회
  http.get(serverUrl("/api/posts/:id"), ({ params }) => {
    const { id } = params;
    const postId = parseInt(id as string);
    const workId =
      postId % 3 === 0 ? undefined : Math.floor(Math.random() * 10) + 1;
    const post = createMockPost(postId, workId);

    return HttpResponse.json(post);
  }),

  // 메인 피드 조회
  http.get(serverUrl("/api/feed"), ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20");
    const sortBy = url.searchParams.get("sortBy") || "latest";

    const totalWorks = Array.from({ length: 100 }, (_, i) =>
      createMockFeedWork(i + 1),
    );

    // sortBy에 따라 정렬
    if (sortBy === "popular") {
      totalWorks.sort((a, b) => b.likesCount - a.likesCount);
    } else if (sortBy === "trending") {
      totalWorks.sort(
        (a, b) =>
          b.likesCount + b.commentsCount - (a.likesCount + a.commentsCount),
      );
    }

    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const works = totalWorks.slice(startIdx, endIdx);

    return HttpResponse.json({
      data: {
        works,
        totalCount: totalWorks.length,
        page,
        pageSize,
        hasMore: endIdx < totalWorks.length,
      },
    });
  }),

  // 작품 검색
  http.get(serverUrl("/api/feed/search"), ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("query") || "";
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20");
    const category = url.searchParams.get("category");
    const type = url.searchParams.get("type");

    let works = Array.from({ length: 50 }, (_, i) => createMockFeedWork(i + 1));

    // 검색 필터링
    if (query) {
      works = works.filter(
        (work) =>
          work.title.includes(query) ||
          work.content.includes(query) ||
          work.authorName.includes(query),
      );
    }

    if (category) {
      works = works.filter((work) => work.category === category);
    }

    if (type && type !== "all") {
      works = works.filter((work) => work.type === type);
    }

    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const pageWorks = works.slice(startIdx, endIdx);

    return HttpResponse.json({
      data: {
        works: pageWorks,
        totalCount: works.length,
        page,
        pageSize,
        hasMore: endIdx < works.length,
      },
    });
  }),

  // 작가 피드 조회
  http.get(serverUrl("/api/feed/:author_id"), ({ request, params }) => {
    const { author_id } = params;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20");

    const authorWorks = Array.from({ length: 30 }, (_, i) => ({
      ...createMockFeedWork(i + 1),
      authorId: author_id,
      authorName: "작가이름",
    }));

    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const works = authorWorks.slice(startIdx, endIdx);

    return HttpResponse.json({
      data: {
        author: {
          userId: author_id,
          nickname: "작가이름",
          profileImage: `https://placehold.co/150?text=${author_id}`,
          bio: "작가 소개입니다.",
          followersCount: Math.floor(Math.random() * 10000),
          worksCount: authorWorks.length,
        },
        works,
        totalCount: authorWorks.length,
        page,
        pageSize,
        hasMore: endIdx < authorWorks.length,
      },
    });
  }),

  // 주간 유니버스 조회 (ContentPort.getUniverseOfWeek)
  http.get(serverUrl("/api/feed/universe-of-week"), () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "주간 유니버스 조회 성공",
      data: {
        id: "1",
        imageUrl: "https://placehold.co/310x476",
        title: "[작품 제목]",
        tags: ["현대로맨스", "판타지"],
      },
    });
  }),

  // 인기 작품 조회 (ContentPort.getPopularSeries)
  http.get(serverUrl("/api/feed/popular-series"), () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "인기 작품 조회 성공",
      data: [
        {
          id: "1",
          imageUrl: "https://placehold.co/203x305",
          title: "[작품 제목]",
          tags: ["현대로맨스"],
        },
        {
          id: "2",
          imageUrl: "https://placehold.co/203x305",
          title: "[작품 제목]",
          tags: ["현대로맨스"],
        },
        {
          id: "3",
          imageUrl: "https://placehold.co/203x305",
          title: "[작품 제목]",
          tags: ["현대로맨스"],
        },
        {
          id: "4",
          imageUrl: "https://placehold.co/203x305",
          title: "[작품 제목]",
          tags: ["현대로맨스"],
        },
      ],
    });
  }),

  // 인기 포스트 조회 (ContentPort.getPopularPosts)
  http.get(serverUrl("/api/feed/popular-posts"), () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "인기 포스트 조회 성공",
      data: [
        {
          id: "1",
          title: "그녀가 웃던 마지막 봄날 2화",
          content:
            '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
          points: 100,
          tags: ["현대로맨스", "판타지"],
          rating: 4.4,
          views: 44,
          comments: 44,
          date: "2025.10.01",
        },
        {
          id: "2",
          title: "그녀가 웃던 마지막 봄날 2화",
          content:
            '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
          points: 100,
          tags: ["현대로맨스", "판타지"],
          rating: 4.4,
          views: 44,
          comments: 44,
          date: "2025.10.01",
        },
      ],
    });
  }),

  // 신규 작품 조회 (ContentPort.getNewSeries)
  http.get(serverUrl("/api/feed/new-series"), () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "신규 작품 조회 성공",
      data: Array.from({ length: 12 }, (_, i) => ({
        id: String(i + 1),
        imageUrl: "https://placehold.co/203x305",
        title: "[작품 제목]",
        tags: ["현대로맨스"],
      })),
    });
  }),

  // 신규 포스트 조회 (ContentPort.getNewPosts)
  http.get(serverUrl("/api/feed/new-posts"), () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "신규 포스트 조회 성공",
      data: Array.from({ length: 9 }, (_, i) => ({
        id: String(i + 1),
        title: "그녀가 웃던 마지막 봄날 2화",
        content:
          '처형장에선 늘 바람이 분다.그리고 그날도 마찬가지였다 — 나의 세 번째 사형식이 시작되던 아침. "이번엔 제발 죽게 해주세요." ....',
        points: 100,
        tags: ["현대로맨스", "판타지"],
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      })),
    });
  }),

  // 관심 작품 조회 (ContentPort.getFavoriteSeries)
  http.get(serverUrl("/api/feed/favorite-series"), () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "관심 작품 조회 성공",
      data: Array.from({ length: 5 }, (_, i) => ({
        id: String(i + 1),
        imageUrl: "https://placehold.co/203x305",
        title: "[작품 제목]",
        tags: ["현대로맨스", "판타지"],
      })),
    });
  }),

  // 최신 업데이트 조회 (ContentPort.getLatestUpdates)
  http.get(serverUrl("/api/feed/latest-updates"), () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "최신 업데이트 조회 성공",
      data: Array.from({ length: 4 }, (_, i) => ({
        id: String(i + 1),
        title: "제목제목",
        points: 100,
        rating: 4.4,
        views: 44,
        comments: 44,
        date: "2025.10.01",
      })),
    });
  }),

  // 신규 유니버스 작품 조회 (ContentPort.getNewUniverseSeries)
  http.get(serverUrl("/api/feed/new-universe-series"), () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: "신규 유니버스 작품 조회 성공",
      data: Array.from({ length: 6 }, (_, i) => ({
        id: String(i + 1),
        imageUrl: "https://placehold.co/203x305",
        title: "[작품 제목]",
        tags: ["현대로맨스"],
      })),
    });
  }),
];
