import { BaseRoute } from "./BaseRoute";
import { AuthController } from "../controllers/AuthController";
import { BaseController } from "../controllers/BaseController";
import { AuthService } from "../services/AuthService";
import multer from "multer";

const storage = multer.memoryStorage();

export class AuthRoute extends BaseRoute {
  private controller: AuthController;
  constructor() {
    super();
    this.controller = new AuthController(AuthService.getInstance());
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      "/signUp",
      BaseController.handleRequest(
        this.controller.signUp.bind(this.controller)
      )
    );

     this.router.post(
      "/signIn",
      BaseController.handleRequest(
        this.controller.signIn.bind(this.controller)
      )
    );

      this.router.post(
      "/signOut",
      BaseController.handleRequest(
        this.controller.signOut.bind(this.controller)
      )
    );

    
      this.router.post(
      "/refresh",
      BaseController.handleRequest(
        this.controller.refreshToken.bind(this.controller)
      )
    );
  }
}
