import { useMutation } from "@tanstack/react-query";
import { reportApi, ReportWorkRequest } from "../apis/report";

// Mutation: 작품 신고
export const useReportWork = () => {
  return useMutation({
    mutationKey: ["useReportWork"],
    mutationFn: async ({
      workId,
      data,
    }: {
      workId: string;
      data: ReportWorkRequest;
    }) => {
      const response = await reportApi.reportWork(workId, data);
      return response.data.data;
    },
  });
};
