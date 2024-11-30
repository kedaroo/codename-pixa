import React from "react";
import { Photo } from "../types";
import "./photo-gallery.css";

interface Props {
  photos: Photo[];
}

const PhotoGallery = ({ photos }: Props) => {
  return (
    <div className="photo-gallery-con">
      {photos.map((photo) => {
        return (
          <div key={photo.id} className="photo-con">
            <img src={photo.src} alt={photo.title} />
          </div>
        );
      })}
    </div>
  );
};

export default PhotoGallery;
