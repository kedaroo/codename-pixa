"use client";
import React, { useState } from "react";
import ImageUploadModal from "./ui/image-upload-modal";
import { Button } from "./ui/button";
import { UploadIcon } from "lucide-react";

const ImgUploadBtn = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  return (
    <div>
      <Button title="Upload images" variant={'outline'} size={'icon'} onClick={() => setShowUploadModal(true)}><UploadIcon /></Button>
      <ImageUploadModal
        open={showUploadModal}
        closeModal={() => {
          setShowUploadModal(false);
        }}
      />
    </div>
  );
};

export default ImgUploadBtn;
