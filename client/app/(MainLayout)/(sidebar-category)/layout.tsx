"use client";

import CategoryHook from "@/hooks/useCategory";
import ProductCategoryTable from "@/components/ProductCategoryTable";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, error } = CategoryHook.useCategories();

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <div>Error...</div>}
      {data && (
        <>
          <aside>
            <ProductCategoryTable productCategories={data} />
          </aside>
          <main className="w-full">{children}</main>
        </>
      )}
    </>
  );
}
