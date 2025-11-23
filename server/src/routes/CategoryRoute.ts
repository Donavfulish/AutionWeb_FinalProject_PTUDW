import { BaseRoute } from "./BaseRoute";

import { BaseController } from "../controllers/BaseController";
import { CategoryController } from "../controllers/CategoryController";
import { CategoryService } from "../services/CategoryService";
export class CategoryRoute extends BaseRoute {
  private controller: CategoryController;
  constructor() {
    super();
    this.controller = new CategoryController(CategoryService.getInstance());
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(
      "/",
      BaseController.handleRequest(
        this.controller.getCategories.bind(this.controller)
      )
    );
    this.router.get(
      "/:id/products",
      BaseController.handleRequest(
        this.controller.getProductsByCategory.bind(this.controller)
      )
    );
    this.router.post(
      "/",
      BaseController.handleRequest(
        this.controller.createCategory.bind(this.controller)
      )
    );
    this.router.patch(
      "/:id",
      BaseController.handleRequest(
        this.controller.updateCategory.bind(this.controller)
      )
    );
    this.router.delete(
      "/:id",
      BaseController.handleRequest(
        this.controller.deleteCategory.bind(this.controller)
      )
    );
  }
}
