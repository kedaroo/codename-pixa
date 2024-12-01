"use client";
import { useState } from "react";

interface SkeletonImageProps {
  className: string;
  src: string;
  alt: string;
}

const SkeletonImage = (props: SkeletonImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${props.className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-md md:rounded-2xl"></div>
      )}
      <img
        src={props.src}
        alt={props.alt}
        className={`${props.className} transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default SkeletonImage;
