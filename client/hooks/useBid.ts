import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { STALE_10_MIN } from "@/config/query.config";
import { BidService } from "@/services/bidService";
import { BidLog, CreateBidLog } from "../../shared/src/types";

class BidHook {
  static useBidLogs(product_id: number) {
    return useQuery({
      queryKey: ["bid_logs", product_id],
      queryFn: () => BidService.getBidlogs(product_id),
      staleTime: STALE_10_MIN,
      enabled: !!product_id,
      select: (data) => {
        return data.data.bid_logs;
      },
    });
  }

  static useUserBid(product_id: number) {
    return useQuery({
      queryKey: ["user_bid", product_id],
      queryFn: () => BidService.getUserBid(product_id),
      staleTime: STALE_10_MIN,
      enabled: !!product_id,
      select: (data) => {
        return data.data.userBid;
      },
    });
  }

  static useCreateBid() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (bid: CreateBidLog) => BidService.createBid(bid),
      onSuccess: (_, params) => {
        queryClient.invalidateQueries({
          queryKey: ["bid_logs", params.product_id],
        });
        queryClient.invalidateQueries({
          queryKey: ["product_by_slug", params.product_slug],
        });
      },
    });
  }
  static useCreateReject() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (bid: BidLog) => BidService.createReject(bid),
      onSuccess: (_, params) => {
        queryClient.invalidateQueries({
          queryKey: ["bid_logs"],
        });
      },
    });
  }
}

export default BidHook;
