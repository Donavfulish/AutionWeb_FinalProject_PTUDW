import { BaseRoute } from "./BaseRoute";

import { BaseController } from "../controllers/BaseController";
import { BidController } from "../controllers/BidController";
import { BidService } from "../services/BidService";

export class BidRoute extends BaseRoute {
  private controller: BidController;
  constructor() {
    super();
    this.controller = new BidController(BidService.getInstance());
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(
      "/:id",
      BaseController.handleRequest(
        this.controller.getBidLogs.bind(this.controller)
      )
    );
    this.router.post(
      "/",
      BaseController.handleRequest(
        this.controller.createBid.bind(this.controller)
      )
    );
    this.router.post(
      "/reject",
      BaseController.handleRequest(
        this.controller.createReject.bind(this.controller)
      )
    );
  }
}
