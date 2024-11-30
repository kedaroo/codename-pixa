"use client";
import React, { useState } from "react";
import ImageUploadModal from "./ui/image-upload-modal";

const Sidepanel = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowUploadModal(true)}>Upload image</button>
      <ImageUploadModal
        open={showUploadModal}
        closeModal={() => {
          setShowUploadModal(false);
        }}
      />
    </div>
  );
};

export default Sidepanel;
