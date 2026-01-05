// "use client";

// import CategoryHook from "@/hooks/useCategory";
// import ProductCategoryTable from "@/components/ProductCategoryTable";
// import LoadingSpinner from "@/components/LoadingSpinner";

// export default function SidebarLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { data, isLoading, error } = CategoryHook.useCategories();

//   console.log("Layout chung");
//   return (
//     <>
//       {isLoading && <LoadingSpinner />}
//       {error && <div>Error...</div>}
//       {data && (
//         <>
//           <aside>
//             <ProductCategoryTable productCategories={data} />
//           </aside>
//           <main className="w-full">{children}</main>
//         </>
//       )}
//     </>
//   );
// }

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
      {isLoading && (
        <div className="fixed inset-0">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 py-10">
          Error loading categories...
        </div>
      )}

      {data && (
        <>
          <div className="w-full flex flex-col lg:flex-row gap-6 relative">
            {/* --- DESKTOP SIDEBAR (Cũ) --- */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <ProductCategoryTable productCategories={data} />
              </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="w-full flex-1 min-w-0">{children}</main>
          </div>
        </>
      )}
    </>
  );
}
