"use client";

import { FC, SVGProps, useState } from "react";

interface Button {
  text: string;
  textColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

export const PrimaryButton: FC<Button> = ({
  text,
  onClick,
  icon: Icon,
  textColor,
  backgroundColor,
  hoverBackgroundColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          color: textColor || "#FFFFFF",
          backgroundColor: isHovered ? (hoverBackgroundColor || "var(--chart-6)") : (backgroundColor || "var(--chart-2)"),
        }}
        className={`w-full flex items-center gap-2 justify-center py-2 font-medium rounded-lg `}
      >
        {Icon && <Icon />} {text}
      </button>
    </>
  );
};

export const SecondaryButton: FC<Button> = ({
  text,
  onClick,
  icon: Icon,
  textColor,
  backgroundColor,
  hoverBackgroundColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: textColor || "#000000",
        backgroundColor: isHovered
          ? hoverBackgroundColor || "#9CA3AF"
          : backgroundColor || "#FFFFFF",
      }}
      className={`w-full flex items-center gap-2 justify-center border border-gray-400  py-2 font-medium rounded-lg `}
    >
      {Icon && <Icon />} {text}
    </button>
  );
};


/*
 <PrimaryButton text="Click me" icon={LoveIcon} onClick={() => console.log("123")} textColor="#333333" hoverBackgroundColor="#FF00FF" backgroundColor="#808080"  />;
  <SecondaryButton text="Click me" icon={LoveIcon} onClick={() => console.log("123")} textColor="#333333" hoverBackgroundColor="#FF00FF" backgroundColor="#808080"  />;
*/