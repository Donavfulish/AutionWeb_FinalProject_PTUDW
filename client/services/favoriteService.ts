import { api, safeRequest } from "../config/axios.config";
import API_ROUTES from "../../shared/src/api";
import { Pagination } from "../../shared/src/types/Pagination";

export class FavoriteService {
  static async getAllFavorite(): Promise<any> {
    return safeRequest(async () => {
      const res = await api.get(API_ROUTES.favorite.getAllFavorite);
      return res.data;
    });
  }

  static async getFavorite(pagination: Pagination): Promise<any> {
    return safeRequest(async () => {
      const res = await api.get(API_ROUTES.favorite.getFavorite(pagination));
      return res.data;
    });
  }

  static async addFavorite(productId: number): Promise<any> {
    return safeRequest(async () => {
      const res = await api.post(API_ROUTES.favorite.addFavorite(productId));
      return res.data;
    });
  }

  static async removeFavorite(productId: number): Promise<any> {
    return safeRequest(async () => {
      const res = await api.delete(
        API_ROUTES.favorite.removeFavorite(productId)
      );
      return res.data;
    });
  }
}
