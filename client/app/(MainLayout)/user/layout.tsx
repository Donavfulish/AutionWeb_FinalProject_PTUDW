"use client";

import CategoryHook from "@/hooks/useCategory";
import LoadingSpinner from "@/components/LoadingSpinner";
import UserCategoryTable from "@/components/UserCategoryTable";
import { userCategories } from "@/app/const";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuthStore } from "@/store/auth.store";
import ShortUserSidebar from "@/components/ShortUserSidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, error } = CategoryHook.useCategories();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const role = user?.role;
  const visibleCategories = userCategories.filter((c) =>
    c.roles.includes(role)
  );

  useEffect(() => {
    if (!user || user.role === "guest") router.replace("/login");
    else return;
  }, [user, router]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <div>Error...</div>}
      {data && (
        <>
          <ProtectedRoute>
            <div className="flex flex-col lg:flex-row w-full">
              <aside className="lg:hidden w-full">
                <ShortUserSidebar />
              </aside>
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24">
                  <UserCategoryTable userCategories={visibleCategories} />
                </div>
              </aside>
              <main className=" w-full lg:pl-8">{children}</main>
            </div>
          </ProtectedRoute>
        </>
      )}
    </>
  );
}
