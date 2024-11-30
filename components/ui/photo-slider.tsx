"use client";

import React, { useRef } from "react";
import "./photo-slider.css";
import { Photo } from "../types";

interface PhotoSliderProps {
  photos: Photo[];
}

const PhotoSlider: React.FC<PhotoSliderProps> = ({ photos }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const moveSlide = (direction: "left" | "right"): void => {
    const sliderContainerWidth =
      window.innerWidth > 600 ? 600 : window.innerWidth;
    const scrollLeft =
      direction === "left" ? -sliderContainerWidth : sliderContainerWidth;
    containerRef.current?.scrollBy({ left: scrollLeft, behavior: "smooth" });
  };

  return (
    <div className="slider-wrapper">
      <div className="slider-container" ref={containerRef}>
        <div className="slider">
          {photos.map((photo) => {
            return (
              <div className="slide" key={photo.id}>
                <div className="img-title">{photo.title}</div>
                <img src={photo.src} alt={photo.title} />
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="slider-ctrl-btn slider-ctrl-btn-left"
        onClick={() => {
          moveSlide("left");
        }}
        type="button"
        aria-label="slide left"
      >
        {"<"}
      </button>
      <button
        className="slider-ctrl-btn slider-ctrl-btn-right"
        onClick={() => {
          moveSlide("right");
        }}
        type="button"
        aria-label="slide right"
      >
        {">"}
      </button>
    </div>
  );
};

export default PhotoSlider;
