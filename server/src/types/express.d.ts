import { UserEntity } from "./../../../shared/src/types/User";

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}

export {};