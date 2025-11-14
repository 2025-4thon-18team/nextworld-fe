import { FC, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { cn } from "@/utils";
import { IconSearch } from "@/assets/icons";
import { feedApi } from "@/querys/useFeed";
import { SeriesCardSmall } from "@/components/SeriesCardSmall/SeriesCardSmall";
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
import type { WorkResponseDto } from "@/querys/types";

interface SearchWorkAutocompleteProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  className?: string;
  onWorkSelect?: (work: WorkResponseDto) => void;
  selectedWorkId?: string | number;
}

export const SearchWorkAutocomplete: FC<SearchWorkAutocompleteProps> = ({
  className,
  value,
  onChange,
  onWorkSelect,
  selectedWorkId,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<WorkResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (!inputRef.current) return;

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
          map((response) => response.data.works || []),
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
      setSuggestions([]);
      setShowSuggestions(false);
    });

    return () => {
      subscription.unsubscribe();
      resetSubscription.unsubscribe();
    };
  }, []);

  const handleWorkClick = (work: WorkResponseDto) => {
    onWorkSelect?.(work);
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
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          className="text-body-medium placeholder:text-text-subtle flex-1 bg-transparent tracking-tight text-black outline-none"
          placeholder="검색어를 입력하세요"
          {...props}
        />
        {isLoading && (
          <div className="text-body-small-medium text-text-muted">
            로딩 중...
          </div>
        )}
      </div>

      {/* 자동완성 결과 - Horizontal List */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="border-default mt-xs absolute top-full z-50 w-full overflow-x-auto rounded-md border bg-white shadow-lg">
          <div className="gap-md flex items-start px-md py-md">
            {suggestions.map((work) => (
              <SeriesCardSmall
                key={work.id}
                imageUrl={work.coverImageUrl}
                title={work.title}
                selected={
                  selectedWorkId !== undefined &&
                  String(work.id) === String(selectedWorkId)
                }
                onClick={() => handleWorkClick(work)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 결과 없음 */}
      {showSuggestions && suggestions.length === 0 && !isLoading && (
        <div className="border-default mt-xs absolute top-full z-50 w-full rounded-md border bg-white shadow-lg">
          <div className="px-md py-sm text-body-medium text-text-muted text-center">
            검색 결과가 없습니다
          </div>
        </div>
      )}
    </div>
  );
};

