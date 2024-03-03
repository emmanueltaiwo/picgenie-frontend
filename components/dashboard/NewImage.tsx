"use client";

import React from "react";
import { useAppSelector } from "@/lib/hooks";
import ImageCard from "./ImageCard";

const NewImage = () => {
  const image = useAppSelector((state) => state.image.imageGenerated);

  return (
    <div className="w-full">
      {!image || image.length < 1 ? (
        <p className="text-center">Your image will show here once it&apos;s generated</p>
      ) : (
        <div
          className={`w-full grid grid-cols-1 gap-5 ${
            image.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"
          } `}
        >
          {image?.map((i: string) => (
            <ImageCard key={i} imageUrl={i} newImage={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewImage;
