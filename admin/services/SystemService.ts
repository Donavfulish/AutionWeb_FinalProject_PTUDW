import { api, safeRequest } from "@/config/axios.config";
import API_ROUTES from "../../shared/src/api";

export class SystemService {
  static async getProductRenewTime(): Promise<any> {
    return safeRequest(async () => {
      const res = await api.get(API_ROUTES.system.getProductRenewTime);
      return res.data;
    });
  }
  static async updateProductRenewTime(time: number): Promise<any> {
    return safeRequest(async () => {
      const res = await api.patch(API_ROUTES.system.updateProductRenewTime, {
        time,
      });
      return res.data;
    });
  }
  static async getProductMinTime(): Promise<any> {
    return safeRequest(async () => {
      const res = await api.get(API_ROUTES.system.getProductMinTime);
      return res.data;
    });
  }
  static async updateProductMinTime(time: number): Promise<any> {
    return safeRequest(async () => {
      const res = await api.patch(API_ROUTES.system.updateProductMinTime, {
        time,
      });
      return res.data;
    });
  }
  static async getProductThresholdTime(): Promise<any> {
    return safeRequest(async () => {
      const res = await api.get(API_ROUTES.system.getProductThresholdTime);
      return res.data;
    });
  }
  static async updateProductThresholdTime(time: number): Promise<any> {
    return safeRequest(async () => {
      const res = await api.patch(
        API_ROUTES.system.updateProductThresholdTime,
        {
          time,
        }
      );
      return res.data;
    });
  }
}
