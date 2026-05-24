import { useState } from "react";
import { useGetPostsByUserApi } from "@/features/post/hooks/useGetPostsByUserApi";

export const useUserPostsTab = (authorId: string) => {
  const [page, setPage] = useState(0);

  const { data, isLoading } = useGetPostsByUserApi(authorId, {
    page,
    size: 10,
    sort: "createdAt",
    direction: "DESC",
  });

  return {
    posts: data?.posts ?? [],
    meta: data?.meta,
    isLoading,
    page,
    setPage,
  };
};
