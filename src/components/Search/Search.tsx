import { FC, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { cn } from "@/utils";
import { IconSearch } from "@/assets/icons";
import { useNavigation } from "@/hooks/useNavigation";
import { feedApi } from "@/querys/useFeed";
import {
  fromEvent,
  map,
  distinctUntilChanged,
  debounceTime,
  partition,
  switchMap,
  retry,
  finalize,
  share,
  from,
} from "rxjs";
import type { ListResponse } from "@/querys/types";

interface SearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  className?: string;
  enableAutocomplete?: boolean;
}

export const Search: FC<SearchProps> = ({
  className,
  value,
  onChange,
  enableAutocomplete = false,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<ListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { navigateToSeries, navigateToPost } = useNavigation();

  useEffect(() => {
    if (!enableAutocomplete || !inputRef.current) return;

    const input = inputRef.current;

    const keyup$ = fromEvent(input, "keyup").pipe(
      debounceTime(300),
      map((e) => (e.target as HTMLInputElement).value),
      distinctUntilChanged(),
      share(),
    );

    const [user$, reset$] = partition(
      keyup$,
      (query) => query.trim().length > 0,
    );

    const search$ = user$.pipe(
      switchMap((query) => {
        setIsLoading(true);
        return from(feedApi.search(query)).pipe(
          map((response) => response.data),
          retry(2),
        );
      }),
      finalize(() => setIsLoading(false)),
    );

    const subscription = search$.subscribe((data) => {
      setSuggestions(data);
      setShowSuggestions(true);
    });

    const resetSubscription = reset$.subscribe(() => {
      setSuggestions(null);
      setShowSuggestions(false);
    });

    return () => {
      subscription.unsubscribe();
      resetSubscription.unsubscribe();
    };
  }, [enableAutocomplete]);

  const handleSuggestionClick = (type: "work" | "post", id: number) => {
    if (type === "work") {
      navigateToSeries(String(id));
    } else {
      navigateToPost(String(id));
    }
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "border-md border-grayscale-g2 px-lg py-md flex items-center gap-10 rounded-md",
        )}
      >
        <IconSearch className="size-24 shrink-0 overflow-hidden" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => {
            if (enableAutocomplete && suggestions) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            // 약간의 지연을 두어 클릭 이벤트가 먼저 처리되도록
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          className="text-body-medium placeholder:text-text-subtle flex-1 bg-transparent tracking-tight text-black outline-none"
          placeholder="검색어를 입력하세요"
          {...props}
        />
        {enableAutocomplete && isLoading && (
          <div className="text-body-small-medium text-text-muted">
            로딩 중...
          </div>
        )}
      </div>

      {/* 자동완성 결과 */}
      {enableAutocomplete && showSuggestions && suggestions && (
        <div className="border-default mt-xs absolute top-full z-50 max-h-400 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
          {/* 작품 목록 */}
          {suggestions.works && suggestions.works.length > 0 && (
            <div className="border-default border-b">
              <div className="px-md py-xs text-body-small-medium text-text-muted bg-background-subtle">
                작품
              </div>
              {suggestions.works.map((work) => (
                <button
                  key={work.id}
                  type="button"
                  onClick={() => handleSuggestionClick("work", work.id)}
                  className="hover:bg-background-muted px-md py-sm text-body-medium w-full text-left text-black"
                >
                  {work.title}
                </button>
              ))}
            </div>
          )}

          {/* 포스트 목록 */}
          {suggestions.posts && suggestions.posts.length > 0 && (
            <div>
              <div className="px-md py-xs text-body-small-medium text-text-muted bg-background-subtle">
                포스트
              </div>
              {suggestions.posts.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => handleSuggestionClick("post", post.id)}
                  className="hover:bg-background-muted px-md py-sm text-body-medium w-full text-left text-black"
                >
                  {post.title}
                </button>
              ))}
            </div>
          )}

          {/* 결과 없음 */}
          {(!suggestions.works || suggestions.works.length === 0) &&
            (!suggestions.posts || suggestions.posts.length === 0) && (
              <div className="px-md py-sm text-body-medium text-text-muted text-center">
                검색 결과가 없습니다
              </div>
            )}
        </div>
      )}
    </div>
  );
};
