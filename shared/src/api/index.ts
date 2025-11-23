const BASE_API = "http://localhost:8080";
const CATEGORY_API = `${BASE_API}/category`;
const BID_API = `${BASE_API}/bid`;
import { Pagination } from "../types/Pagination";

const API_ROUTES = {
  user: {
    getUsers: `${BASE_API}/users`,
    getUser: (id: number) => `${BASE_API}/users${id}`,
    updateUser: (id: number) => `${BASE_API}/users${id}`,
    deleteUser: (id: number) => `${BASE_API}/users${id}`,
    createUSer: `${BASE_API}/users`,
  },
  category: {
    getCategories: `${CATEGORY_API}`, //GET
    getProductsByCategory: (pagination: Pagination) =>
      `${CATEGORY_API}/${pagination.id}/products?page${pagination.page}&limit=${pagination.limit}&sort=${pagination.sort}`, //GET
    createCategory: `${CATEGORY_API}`, //POST
    updateCategory: (id: number) => `${CATEGORY_API}/${id}`, //PATCH
    deleteCategory: (id: number) => ` ${CATEGORY_API}/${id}`, //DELETE
  },
  auction: {
    getBidLogs: (id: number) => `${BID_API}/${id}`, //GET
    createBid: `${BID_API}`, //POST
    createReject: `${BID_API}/reject`, //POST
  },
};

export default API_ROUTES;
