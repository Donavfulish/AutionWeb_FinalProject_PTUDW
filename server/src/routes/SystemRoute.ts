import { BaseRoute } from "./BaseRoute";
import { SystemService } from "../services/SystemService";
import { BaseController } from "../controllers/BaseController";
import { SystemController } from "../controllers/SystemController";

export class SystemRoute extends BaseRoute {
  private controller: SystemController;
  constructor() {
    super();
    this.controller = new SystemController(SystemService.getInstance());
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(
      "/renew-time",
      BaseController.handleRequest(
        this.controller.getProductRenewTime.bind(this.controller)
      )
    );
    this.router.patch(
      "/renew-time",
      BaseController.handleRequest(
        this.controller.updateProductRenewTime.bind(this.controller)
      )
    );
    this.router.get(
      "/min-time",
      BaseController.handleRequest(
        this.controller.getProductMinTime.bind(this.controller)
      )
    );
    this.router.patch(
      "/min-time",
      BaseController.handleRequest(
        this.controller.updateProductMinTime.bind(this.controller)
      )
    );
    this.router.get(
      "/threshold-time",
      BaseController.handleRequest(
        this.controller.getProductThresholdTime.bind(this.controller)
      )
    );
    this.router.patch(
      "/threshold-time",
      BaseController.handleRequest(
        this.controller.updateProductThresholdTime.bind(this.controller)
      )
    );
  }
}
