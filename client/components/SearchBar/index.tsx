"use client";

import { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { SearchIcon } from "../icons";
import ProductHook from "@/hooks/useProduct";
import { SearchProduct } from "../../../shared/src/types";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/app/(MainLayout)/product/[product_slug]/components/Question";

const defaultImage =
  "https://img.freepik.com/premium-photo/white-colors-podium-abstract-background-minimal-geometric-shape-3d-rendering_48946-113.jpg?semt=ais_hybrid&w=740&q=80";

export const SearchBar = () => {
  const router = useRouter();
  const per_page = 10;
  const [query, setQuery] = useState("");
  const {
    data: suggestionData,
    isLoading: isLoadingSuggestion,
    error: isErrorSuggestion,
  } = ProductHook.useGetProductsBySearchSuggestion(query, per_page) as {
    data: SearchProduct[];
    isLoading: boolean;
    error: any;
  };
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.length > 0) {
      router.push(`/search?query=${query}`);
      setShowSuggestions(false);
      setQuery("");
    }
  };

  const handleSuggestionClick = (item: SearchProduct) => {
    router.push(`/product/${item.slug}`);
    setShowSuggestions(false);
    setQuery("");
  };

  const handleSearchClick = () => {
    router.push(`/search?query=${query}`);
    setShowSuggestions(false);
    setQuery("");
  };

  return (
    <>
      <div className="relative w-full">
        {/* Input + nút Search */}
        <div className="flex relative ">
          <button>
            <SearchIcon className="absolute top-[11px] l-1 w-5 h-5 left-2.5" />
          </button>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={"Tìm kiếm sản phẩm ..."}
            className="flex-1 p-2 pl-10 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
          />
        </div>
        {/* Dropdown gợi ý */}
        {showSuggestions && query && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-[100]">
            <li className="flex items-center gap-2 p-2 hover:bg-blue-50 cursor-pointer rounded-md transition-colors">
              <div
                onClick={handleSearchClick}
                className="py-2 text-gray-700 text-sm"
              >
                Từ khoá tìm kiếm{" "}
                <span className="font-medium text-blue-600">{query}</span>
              </div>
            </li>
            {(suggestionData || []).map((item) => (
              <li
                key={item.id}
                onClick={() => handleSuggestionClick(item)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="w-12 h-12 relative">
                  <Image
                    src={item.main_image || defaultImage}
                    alt={item.name}
                    fill // ảnh sẽ fill container div
                    className="rounded-sm object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  {item.current_price && (
                    <span className="text-blue-600 text-sm font-medium">
                      {formatCurrency(item.current_price)}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

/*
flex-1: làm cho phần tử chiếm toàn bộ không gian còn lại trong container flex. (flex-1 = flex-grow: 1; flex-shrink: 1; flex-basis: 0%;)
*/

/*
"use client";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import { LoveIcon } from "@/components/icons";
import { SearchBar } from "@/components/SearchBar";
import { SearchProduct } from "@/components/SearchBar";
const sampleData: SearchProduct[] = [
  { id: 1, title: "Apple", image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000", price: "Fresh fruit" },
  { id: 2, title: "Banana", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykzoZeCE0p7LeuyHnLYCdPP2jju9d5PaMeA&s" },
  { id: 3, title: "Orange", image: "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg", price: "Vitamin C" },
  { id: 4, title: "Apple", image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000", price: "Fresh fruit" },
  { id: 5, title: "Banana", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykzoZeCE0p7LeuyHnLYCdPP2jju9d5PaMeA&s" },
  { id: 6, title: "Orange", image: "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg", price: "Vitamin C" },
];

function Page() {
  return (
    <>
      <SearchBar
        data={sampleData}
        handleClick={(item) => console.log("Clicked item:", item)}
        handleEnter={(query) => console.log("Enter search:", query)}
      />
    </>
  );
}
export default Page;
*/
