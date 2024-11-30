"use client";

import React, { useRef } from "react";
import "./slider.css";

interface SliderProps {
  images: Array<{ src: string; title?: string }>;
}

const ImageSlider: React.FC<SliderProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="slider-wrapper">
      <div className="slider-container" ref={containerRef}>
        <div className="slider">
          {images.map((image) => {
            return (
              <div className="slide" key={Math.random()}>
                <div className="img-title">{image.title}</div>
                <img src={image.src} alt={image.title} />
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="slider-ctrl-btn slider-ctrl-btn-left"
        onClick={() => {
          const width = window.innerWidth > 600 ? 600 : window.innerWidth
          containerRef.current?.scrollBy({ left: -width, behavior: "smooth" });
        }}
      >
        {"<"}
      </div>
      <div
        className="slider-ctrl-btn slider-ctrl-btn-right"
        onClick={() => {
          const width = window.innerWidth > 600 ? 600 : window.innerWidth;
          
          containerRef.current?.scrollBy({ left: width, behavior: "smooth" });
        }}
      >
        {">"}
      </div>
    </div>
  );
};

export default ImageSlider;
