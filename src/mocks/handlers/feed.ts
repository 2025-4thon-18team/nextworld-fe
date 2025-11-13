import { http, HttpResponse } from "msw";

// 가짜 작품 데이터 생성
const createMockFeedWork = (id: number) => ({
  workId: `work-${id}`,
  title: `작품 제목 ${id}`,
  content: `작품 내용 ${id}입니다. 이것은 멋진 이야기입니다...`,
  type: id % 3 === 0 ? "derivative" : ("original" as "original" | "derivative"),
  authorId: `author-${(id % 10) + 1}`,
  authorName: `작가${(id % 10) + 1}`,
  authorProfileImage: `https://via.placeholder.com/50?text=Author${(id % 10) + 1}`,
  likesCount: Math.floor(Math.random() * 1000),
  commentsCount: Math.floor(Math.random() * 100),
  bookmarksCount: Math.floor(Math.random() * 500),
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  thumbnailUrl: `https://via.placeholder.com/300x200?text=Work${id}`,
  tags: [`태그${id % 5}`, `장르${id % 3}`],
  category: `카테고리${(id % 4) + 1}`,
});

export const feedHandlers = [
  // 메인 피드 조회
  http.get("/api/feed", ({ request }) => {
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
  http.get("/api/feed/search", ({ request }) => {
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
  http.get("/api/feed/:author_id", ({ request, params }) => {
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
          profileImage: `https://via.placeholder.com/150?text=${author_id}`,
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
];
