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

interface Props {
  photos: Photo[];
}

const PhotoGallery = ({ photos }: Props) => {
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);

  return (
    <div className="w-full flex justify-center">
      <LightGallery 
        elementClassNames="justify-center"
        speed={500} 
        plugins={[lgThumbnail, lgFullscreen]}
      >
      {photos.map((image, index) => (
        <a className="w-fit inline-block pr-2" key={index} href={image.src}>
          <img className="block object-cover aspect-video w-[280px] rounded-md" src={image.src} alt={image.title} />
        </a>
      ))}
    </LightGallery>
    </div>
  )
};

export default PhotoGallery;
