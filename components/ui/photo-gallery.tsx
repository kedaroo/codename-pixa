"use client";
import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Photo } from "../types";
import "./photo-gallery.css";
import { ChevronLeftCircle, ChevronRightCircle, XIcon } from "lucide-react";

interface Props {
  photos: Photo[];
}

const PhotoGallery = ({ photos }: Props) => {
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);

  return (
    <div className="grid grid-cols-3 gap-1 sm:gap-2 md:flex flex-wrap">
      {photos.slice(0).map((photo) => {
        return (
          <div
            key={photo.id}
            className="cursor-pointer hover:scale-95 transition-all ease-in"
            onClick={() => {
              setCurrentPhoto(photo);
            }}
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="rounded-md sm:rounded-lg md:rounded-xl object-cover w-full h-28 md:h-36 lg:h-48"
            />
          </div>
        );
      })}
      <PhotoModal
        initialPhoto={currentPhoto}
        closeModal={() => {
          setCurrentPhoto(null);
        }}
        photos={photos}
      />
    </div>
  );
};

interface PhotoModalProps {
  photos: Photo[];
  initialPhoto: Photo | null;
  closeModal: () => void;
}

const PhotoModal = ({ initialPhoto, photos, closeModal }: PhotoModalProps) => {
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCurrentPhoto(initialPhoto);
    setShowModal(!!initialPhoto);
  }, [initialPhoto]);

  const showNextPhoto = (direction: "prev" | "next") => {
    setCurrentPhoto((prev) => {
      const idx = photos.findIndex((photo) => photo.id === prev?.id);

      if (direction === "prev") if (idx <= 0) return prev;
      if (direction === "next") if (idx === photos.length - 1) return prev;

      const offset = direction === "prev" ? -1 : 1;

      return photos[idx + offset];
    });
  };

  return (
    <div>
      <Dialog.Root open={Boolean(currentPhoto && showModal)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/90" />
          <div className="fixed inset-1/4 bg-background textp-6 rounded-md shadow-lg rounded-xl p-4 flex flex-col justify-between">
            <button className="absolute top-2 right-2" onClick={closeModal}>
              <XIcon />
            </button>
            {currentPhoto && (
              <>
                <img
                  className="h-full w-auto object-contain"
                  src={currentPhoto.src}
                  alt={currentPhoto.title}
                />
                <button
                  className={`
                    absolute top-1/2 left-2 z-[9999999]
                    ${photos.at(0)?.id === currentPhoto.id ? "hidden" : ""}
                `}
                  onClick={() => {
                    showNextPhoto("prev");
                  }}
                >
                  <ChevronLeftCircle />
                </button>
                <button
                  className={`
                    absolute top-1/2 right-2 z-[9999999]
                    ${photos.at(-1)?.id === currentPhoto.id ? "hidden" : ""}
                `}
                  onClick={() => {
                    showNextPhoto("next");
                  }}
                >
                  <ChevronRightCircle />
                </button>
              </>
            )}
          </div>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default PhotoGallery;
