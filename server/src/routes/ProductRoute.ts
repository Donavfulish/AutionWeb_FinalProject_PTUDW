import { BaseRoute } from "./BaseRoute";
import { ProductController } from "../controllers/ProductController";
import { ProductService } from "../services/ProductService";
import { BaseController } from "../controllers/BaseController";
import multer from "multer";
import { protectedRoutes } from "../middlewares/authMiddleware";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export class ProductRoute extends BaseRoute {
  private controller: ProductController;
  constructor() {
    super();
    this.controller = new ProductController(ProductService.getInstance());
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(
      "/",
      BaseController.handleRequest(
        this.controller.getProducts.bind(this.controller)
      )
    );
    this.router.get(
      "/category",
      BaseController.handleRequest(
        this.controller.getCategoryProductList.bind(this.controller)
      )
    );
    this.router.get(
      "/search",
      BaseController.handleRequest(
        this.controller.getProductsBySearch.bind(this.controller)
      )
    );
    this.router.get(
      "/top",
      BaseController.handleRequest(
        this.controller.getTopProduct.bind(this.controller)
      )
    );
    this.router.get(
      "/sold",
      protectedRoutes,
      BaseController.handleRequest(
        this.controller.getSoldProducts.bind(this.controller)
      )
    );
    this.router.get(
      "/selling",
      protectedRoutes,
      BaseController.handleRequest(
        this.controller.getSellingProducts.bind(this.controller)
      )
    );
    this.router.get(
      "/top_end",
      BaseController.handleRequest(
        this.controller.getTopEndingSoonProducts.bind(this.controller)
      )
    );
    this.router.get(
      "/top_bid",
      BaseController.handleRequest(
        this.controller.getTopBiddingProducts.bind(this.controller)
      )
    );
    this.router.get(
      "/top_price",
      BaseController.handleRequest(
        this.controller.getTopPriceProducts.bind(this.controller)
      )
    );
    this.router.get(
      "/search-suggestion",
      BaseController.handleRequest(
        this.controller.getProductsBySearchSuggestion.bind(this.controller)
      )
    );
    this.router.get(
      "/winning",
      protectedRoutes,
      BaseController.handleRequest(
        this.controller.getWinningProducts.bind(this.controller)
      )
    );
    this.router.get(
      "/bidding",
      protectedRoutes,
      BaseController.handleRequest(
        this.controller.getBiddingProducts.bind(this.controller)
      )
    );
    this.router.get(
      "/:productId",
      BaseController.handleRequest(
        this.controller.getProductById.bind(this.controller)
      )
    );
    this.router.get(
      "/slug/:slug",
      BaseController.handleRequest(
        this.controller.getProductBySlug.bind(this.controller)
      )
    );
    this.router.post(
      "/",
      protectedRoutes,
      upload.any(),
      BaseController.handleRequest(
        this.controller.createProduct.bind(this.controller)
      )
    );
    this.router.delete(
      "/:productId",
      protectedRoutes,
      BaseController.handleRequest(
        this.controller.deleteProductById.bind(this.controller)
      )
    );
    this.router.patch(
      "/:productId/description",
      protectedRoutes,
      BaseController.handleRequest(
        this.controller.updateProductDescription.bind(this.controller)
      )
    );
    this.router.get(
      "/:productId/questions",
      protectedRoutes,
      BaseController.handleRequest(
        this.controller.getQuestions.bind(this.controller)
      )
    );
    this.router.get(
      "/:productId/questions-by-page",
      BaseController.handleRequest(
        this.controller.getQuestionsByPage.bind(this.controller)
      )
    );
    this.router.post(
      "/:productId/questions",
      protectedRoutes,
      BaseController.handleRequest(
        this.controller.createQuestion.bind(this.controller)
      )
    );
    this.router.post(
      "/:productId/:questionId/answers",
      protectedRoutes,
      BaseController.handleRequest(
        this.controller.createAnswer.bind(this.controller)
      )
    );
    this.router.patch(
      "/:productId/extend",
      protectedRoutes,
      BaseController.handleRequest(
        this.controller.updateProductExtend.bind(this.controller)
      )
    );
  }
}
