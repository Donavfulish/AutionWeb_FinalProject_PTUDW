import { BaseService } from "./BaseService";

export class SystemService extends BaseService {
  private static instance: SystemService;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!SystemService.instance) {
      SystemService.instance = new SystemService();
    }
    return SystemService.instance;
  }

  async getProductRenewTime(time: number) {
    const sql = `
                SELECT product_renew_time
                FROM public.system_config
                `;
    return await this.safeQuery(sql);
  }

  async updateProductRenewTime(time: number) {
    const sql = `
                UPDATE public.system_config
                SET product_renew_time = $1
                `;
    const params = [time];

    return await this.safeQuery(sql, params);
  }

  async getProductMinTime(time: number) {
    const sql = `
                SELECT new_product_min_time
                FROM public.system_config
                `;
    return await this.safeQuery(sql);
  }

  async updateProductMinTime(time: number) {
    const sql = `
                UPDATE public.system_config
                SET new_product_min_time = $1
                `;
    const params = [time];

    return await this.safeQuery(sql, params);
  }
  async getProductThresholdTime(time: number) {
    const sql = `
                SELECT product_threshold_time
                FROM public.system_config
                `;
    return await this.safeQuery(sql);
  }

  async updateProductThresholdTime(time: number) {
    const sql = `
                UPDATE public.system_config
                SET product_threshold_time = $1
                `;
    const params = [time];

    return await this.safeQuery(sql, params);
  }
}
