"use client";
import React, { useEffect, useState } from "react";
import { Photo } from "../types";
import "./photo-gallery.css";
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import SkeletonImage from "./image-skeleton";

interface Props {
  photos: Photo[];
}

const PhotoGallery = ({ photos }: Props) => {
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);

  return (
    <div className="w-full flex justify-center">
    <LightGallery
      closable
      download={false}
      elementClassNames="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 w-full"
      speed={500} 
      plugins={[lgThumbnail, lgFullscreen]}
    >
      {photos.map((image, index) => (
        <a className="inline-block" key={index} href={image.src}>
          <SkeletonImage className="block object-cover rounded-md md:rounded-2xl h-28 sm:h-32 md:h-40 lg:h-48 w-full" src={image.src} alt={image.title || ''} />
        </a>
      ))}
    </LightGallery>
    </div>
  )
};

export default PhotoGallery;
