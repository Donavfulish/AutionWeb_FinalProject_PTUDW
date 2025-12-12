"use client"

import CategoryCard from "@/components/CategoryCard";
import AdminHeader from "@/components/AdminHeader/AdminHeader";
import { useMemo, useState } from "react";
import CategoryHook from "@/hooks/useCategory";
import { ProductCategoryTree } from "../../../../shared/src/types";
import Pagination from "@/components/Pagination";
import Fuse from "fuse.js"

const page = () => {

    const limit = 2;
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [showCreateModal, setShowCreateModal] = useState(false)

    const {
        data: categoriesData,
        isLoading: isCategoriesLoading
    } = CategoryHook.useCategories() as {
        data: ProductCategoryTree[],
        isLoading: boolean,
    };

    const fuse = new Fuse(categoriesData, {
        keys: ["name"],
        threshold: 0.4
    })

    const pageData = useMemo(() => {
        if (!categoriesData) return [];

        const searchResult = fuse.search(searchQuery);
        const filterData = searchQuery ? searchResult.map(r => r.item) : categoriesData

        const page = Number(currentPage);
        const start = limit * (page - 1);
        const end = Math.min(categoriesData.length, start + limit);

        return filterData.slice(start, end);
    }, [currentPage, limit, categoriesData, searchQuery])

    const totalPages = useMemo(() => {
        if (!categoriesData) return 0;

        const searchResult = fuse.search(searchQuery);
        const filterData = searchQuery ? searchResult.map(r => r.item) : categoriesData

        return Math.ceil(filterData.length / limit);
    }, [categoriesData, searchQuery]);

    if (isCategoriesLoading)
        return <div>Loading...</div>
    return (
        <>
            <AdminHeader onSearch={setSearchQuery} onCreateClick={() => setShowCreateModal(true)} />
            <div className="p-6">
                <h1 className="text-2xl font-bold text-text mb-6">Quản lý danh mục</h1>
                {pageData.map((item, index) => (
                    <CategoryCard category={item} key={index} />
                ))}
                <div className="mt-10 flex justify-center">
                    <Pagination totalPages={totalPages} onPageChange={setCurrentPage} currentPage={currentPage} />
                </div>
                {/* <CategoryManagement categories={filteredCategories} /> */}
            </div>

            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                        <h2 className="text-xl font-bold text-text mb-4r">Tạo danh mục mới</h2>
                        <input
                            type="text"
                            placeholder="Tên danh mục"
                            className="w-full px-4 py-2 border border-surface rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2 text-text border border-surface rounded-lg hover:bg-surface transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => {
                                    setShowCreateModal(false)
                                }}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Tạo
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default page

