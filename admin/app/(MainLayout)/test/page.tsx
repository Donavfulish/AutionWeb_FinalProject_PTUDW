import CategoryCard from "@/components/CategoryCard";
import React from "react";
import { ProductCategoryTree } from "../../../shared/src/types/Product";

const category: ProductCategoryTree = {
  id: 2,
  slug: "do-gia-dung",
  name: "Đồ gia dụng",
  children: [
    {
      id: 8,
      slug: "laptop",
      parent_id: 2,
      name: "Laptop",
    },
    {
      id: 10,
      slug: "dien-thoai-ma",
      parent_id: 2,
      name: "Điện thoại ma",
    },
    {
      id: 7,
      slug: "dien-thoai",
      parent_id: 2,
      name: "Điện thoại",
    },
  ],
};

const TestPage = () => {
  return (
    <div className="w-200 flex flex-col gap-2">
      <CategoryCard category={category} />
      <CategoryCard category={category} />
      <CategoryCard category={category} />
    </div>
  );
};

export default TestPage;
