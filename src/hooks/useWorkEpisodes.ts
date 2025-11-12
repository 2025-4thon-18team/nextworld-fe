import { useQuery } from "@tanstack/react-query";
import { workApi, Episode } from "@/apis/workApi";

export const useWorkEpisodes = (workId: number) => {
  return useQuery<Episode[], Error>({
    queryKey: ["workEpisodes", workId],
    queryFn: () => workApi.getEpisodes(workId),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
