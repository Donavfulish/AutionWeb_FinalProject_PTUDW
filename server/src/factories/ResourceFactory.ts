import { BidRoute } from "../routes/BidRoute";
import { CategoryRoute } from "../routes/CategoryRoute";
import { UserRoute } from "../routes/UserRoute";
import { ProductRoute } from "../routes/ProductRoute";

const resourceMap: Record<string, any> = {
  user: UserRoute,
  category: CategoryRoute,
  bid: BidRoute,
  product: ProductRoute
};
export class ResourceFactory {
  static createResource(resource: string) {
    const ResourceClass = resourceMap[resource];
    if (!ResourceClass) throw new Error("Unknown resource");
    return new ResourceClass();
  }
}
