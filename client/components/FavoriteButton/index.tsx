"use client";

import React, { useEffect, useState } from "react";
import { LoveFullIcon, LoveIcon } from "../icons";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick?: () => void;
};
// favorite
export default function FavoriteButton({
  isFavorite = false,
  onClick,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState<boolean>(isFavorite);
  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleClick = () => {
    setFavorite(!favorite);
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-8 h-8 cursor-pointer rounded-full bg-black/50 flex items-center justify-center"
    >
      {/* Outline icon */}
      <LoveIcon
        className={`absolute text-white transition-opacity duration-200 ${
          favorite ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Filled icon */}
      <LoveFullIcon
        className={`absolute text-red transition-opacity duration-200 ${
          favorite ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
