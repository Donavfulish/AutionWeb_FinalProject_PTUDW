import { FavoriteRoute } from "../routes/FavoriteRoute";
import { UserRoute } from "../routes/UserRoute";


const resourceMap: Record<string, any> = {
    user: UserRoute,
    favorite: FavoriteRoute
}
export class ResourceFactory {
    static createResource(resource: string){
        const ResourceClass = resourceMap[resource];
        if (!ResourceClass) throw new Error("Unknown resource");
        return new ResourceClass();
    }
}


