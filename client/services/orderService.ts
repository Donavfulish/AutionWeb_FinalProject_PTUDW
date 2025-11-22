import { api, safeRequest } from "@/config/axios.config";


export class OrderService {
  static async getOrder(): Promise<any> {
    return safeRequest(async () => {
      const res = await api.get('/order');
      return res.data;
    })
  }

  static async getOrderById(productId: number): Promise<any> {
    return safeRequest(async () => {
      const res = await api.get(`/order/${productId}`);
      return res.data;
    })
  }

  static async createOrder(payload: any): Promise<any> {
    return safeRequest(async() => {
      const res = await api.post(`/order`, payload);
      return res.data;
    })
  }

  static async updateOrderStatus(productId: number, status: boolean): Promise<any> {
    return safeRequest(async() => {
      const res = await api.patch(`/order/${productId}/${status}`);
      return res.data;
    })
  }

  static async getOrderChat(productId: number): Promise<any> {
    return safeRequest(async() => {
      const res = await api.get(`/order/${productId}/chat`);
      return res.data;
    })
  }

  static async createOrderChat(productId: number, payload: any): Promise<any> {
    return safeRequest(async() => {
      const res = await api.post(`/order/${productId}/chat`, payload);
      return res.data;
    })
  }
}