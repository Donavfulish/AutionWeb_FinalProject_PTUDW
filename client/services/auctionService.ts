import { api, safeRequest } from "../config/axios.config";
import API_ROUTES from "../../shared/src/api";
import { BidLog } from "../../shared/src/types";

export class AuctionService {
  static async getBidlogs(product_id: number): Promise<any> {
    return safeRequest(async () => {
      const res = await api.get(API_ROUTES.auction.getBidLogs(product_id));
      return res.data;
    });
  }

  static async createBid(payload: BidLog) {
    return safeRequest(async () => {
      const res = await api.post(API_ROUTES.auction.createBid, payload);
      return res.data;
    });
  }
  static async createReject(payload: BidLog) {
    return safeRequest(async () => {
      const res = await api.post(API_ROUTES.auction.createReject, payload);
      return res.data;
    });
  }
}
