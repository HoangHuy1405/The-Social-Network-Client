import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useFeedApi } from "./useFeedApi";
import { useSearchPostsApi } from "@/features/post/hooks/useSearchPostsApi";
import type { PostData } from "@/types/post";

export type UseFeedPageReturn = {
  posts: PostData[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  searchQuery: string;
  isSearchMode: boolean;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
};

export const useFeedPage = (): UseFeedPageReturn => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";
  const isSearchMode = searchQuery.length > 0;

  const [searchResults, setSearchResults] = useState<PostData[]>([]);
  const [searchPage, setSearchPage] = useState<number>(0);

  const {
    posts: feedPosts,
    fetchNextPage: feedFetchNextPage,
    hasNextPage: feedHasNextPage,
    isFetchingNextPage: feedIsFetchingNextPage,
    isLoading: feedIsLoading,
  } = useFeedApi();

  const isHashtag = searchQuery.startsWith("#");
  const params = isHashtag
    ? { q: undefined, hashtag: searchQuery.slice(1), page: searchPage, size: 10 }
    : { q: searchQuery, hashtag: undefined, page: searchPage, size: 10 };

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
  } = useSearchPostsApi(params);

  useEffect(() => {
    setSearchPage(0);
    setSearchResults([]);
  }, [searchQuery]);

  useEffect(() => {
    if (!searchData) return;

    setSearchResults((prev) => {
      if (searchPage === 0) {
        return searchData.posts;
      }
      const existingIds = new Set(prev.map((p) => p.id));
      const newPosts = searchData.posts.filter((p) => !existingIds.has(p.id));
      return [...prev, ...newPosts];
    });
  }, [searchData, searchPage]);

  const hasNextSearchPage = searchData?.meta ? searchPage < searchData.meta.pages - 1 : false;

  const posts = isSearchMode ? searchResults : feedPosts;
  const isLoading = isSearchMode ? (isSearchLoading && searchPage === 0) : feedIsLoading;
  const isFetchingNextPage = isSearchMode ? (isSearchFetching && searchPage > 0) : feedIsFetchingNextPage;
  const hasNextPage = isSearchMode ? hasNextSearchPage : feedHasNextPage;

  const fetchNextPage = useCallback(async () => {
    if (isSearchMode) {
      setSearchPage((p) => p + 1);
    } else {
      await feedFetchNextPage();
    }
  }, [isSearchMode, feedFetchNextPage]);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage && !isLoading) {
        void fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "200px",
    });
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [handleIntersection]);

  return {
    posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    searchQuery,
    isSearchMode,
    sentinelRef,
  };
};
