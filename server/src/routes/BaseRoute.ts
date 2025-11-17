import { Router } from "express";

export class BaseRoute {
  public router: Router;

  constructor() {
    this.router = Router();
  }
}
