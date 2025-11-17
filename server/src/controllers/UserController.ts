import { BaseController } from "./BaseController";
import { Request, Response, NextFunction } from "express";

export class UserController extends BaseController {
  constructor(service: any) {
    super(service); // inject service
  }



  async getUsers(req: Request, res: Response) {
      const users = await this.service.getUsers();
      return {user: users}
  }
}


// user/