import { BaseService } from "./BaseService";

export class UserService extends BaseService {
  private static instance: UserService;
  private users = [
    { id: 1, name: "Minh Tri" },
    { id: 2, name: "Nguyen Van A" },
  ];

  private constructor() {
    super();
  }

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getUsers() {
    const sql = `SELECT * FROM product.products`;
    const users = await this.safeQuery(sql);
    // const users = await this.safeQuery(sql, params);
    return users;
  }
}
