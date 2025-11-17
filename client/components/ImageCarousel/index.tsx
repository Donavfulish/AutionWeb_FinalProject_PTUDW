"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  //"https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg",
  "https://tse3.mm.bing.net/th/id/OIP.IaM8CpqbgQeegBKYt6P1JwHaHa?pid=Api",
  "https://tse4.mm.bing.net/th/id/OIP.SzZxoYZazNktjqd9SgRpvAHaLH?pid=Api",
  "https://tse4.mm.bing.net/th/id/OIP.RuFeLPm3iUIxSx5JH9JJKwHaCe?pid=Api",
];

export const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handleMoveLeft = () => {
    if (currentImage === 0) setCurrentImage(images.length - 1);
    else setCurrentImage((pre) => pre - 1);
  };

  const handleMoveRight = () => {
    if (currentImage === images.length - 1) setCurrentImage(0);
    else setCurrentImage((pre) => pre + 1);
  };
  const hanldeSwitchImage = (imageSlected: number) => {
    setCurrentImage(imageSlected);
  };
  return (
    <div className="flex flex-col gap-2 w-full h-full ">
      {/* Main*/}
      <div className="relative ">
        <div
          className="flex rounded-lg bg-gray-200 justify-center overflow-hidden aspect-square hover:cursor-pointer "
          onClick={() => openModal(images[currentImage])}
        >
          <Image
            src={images[currentImage]}
            width={800}
            height={800}
            alt="..."
          />
        </div>

        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 ">
          <div className="bg-gray-700 text-white text-[14px] md:text-[8px] lg:text-[16px] px-4 py-1 rounded-[30px]">
            {currentImage + 1} / {images.length}
          </div>
        </div>

        <button
          type="button"
          className="absolute top-1/2 start-0 z-30 flex items-center justify-center  px-4 cursor-pointer group focus:outline-none"
          onClick={handleMoveLeft}
        >
          <span className="inline-flex items-center justify-center w-7 h-7 md:w-10 md:h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-3 h-3 md:w-4 md:h-4 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-1/2 end-0 z-30 flex items-center justify-center  px-4 cursor-pointer group focus:outline-none"
          onClick={handleMoveRight}
        >
          <span className="inline-flex items-center justify-center w-7 h-7 md:w-10 md:h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-3 h-3 md:w-4 md:h-4  text-white  rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
      {/*Extra */}
      <div className="grid grid-cols-4 gap-2  ">
        {images.map((link, index) => {
          return (
            <div
              key={index}
              className={`  rounded-[6px] bg-gray-200   aspect-square overflow-hidden flex justify-center hover:cursor-pointer ${
                currentImage == index ? "border-accent-dark border-2" : ""
              }`}
              onClick={() => hanldeSwitchImage(index)}
            >
              <Image src={link} width={200} height={200} alt="..." />
            </div>
          );
        })}
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div>
            <div
              className="max-w-4xl max-h-4/5 p-4 rounded-lg bg-white relative "
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected View"
                className="max-w-full max-h-[80vh]  "
                width={1200}
                height={1200}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
