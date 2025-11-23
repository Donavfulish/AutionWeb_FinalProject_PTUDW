import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { STALE_10_MIN } from "@/config/query.config";
import { AuctionService } from "@/services/auctionService";
import { BidLog } from "../../shared/src/types";

class AuctionHook {
  static useBidLogs(product_id: number) {
    return useQuery({
      queryKey: ["bid_logs"],
      queryFn: () => AuctionService.getBidlogs(product_id),
      staleTime: STALE_10_MIN,
      select: (data) => {
        return data.data;
      },
    });
  }

  static useCreateBid() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (bid: BidLog) => AuctionService.createBid(bid),
      onSuccess: (_, params) => {
        queryClient.invalidateQueries({
          queryKey: ["bid_logs"],
        });
      },
    });
  }
  static useCreateReject() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (bid: BidLog) => AuctionService.createReject(bid),
      onSuccess: (_, params) => {
        queryClient.invalidateQueries({
          queryKey: ["bid_logs"],
        });
      },
    });
  }
}

export default AuctionHook;
