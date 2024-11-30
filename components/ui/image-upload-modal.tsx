"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

interface ImageUploadModalProps {
  open: boolean;
  closeModal: () => void;
}

export default function ImageUploadModal(props: ImageUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const uploadFiles = (filesList: FileList | null) => {
    if (!filesList || filesList.length === 0) {
      console.log(">>> no files uploaded");
      toast.error("Please select files");
      return;
    }

    const files = Array.from(filesList);

    const isAnyOfTheFilesNotImage = files.some(
      (file) => !file.type.startsWith("image")
    );

    if (isAnyOfTheFilesNotImage) {
      if (files.length === 1) {
        console.log(">>> file uploaded should be of type image");
        toast.error("File uploaded should be of type image");
      } else {
        console.log(">>> all files uploaded should be of type image");
        toast.error("All files uploaded should be of type image");
      }

      return;
    }

    console.log(">>> files", Array.from(files));
    // TODO: add file upload logic
    toast.success("Files uploaded " + files.length);
  };

  return (
    <div>
      <Dialog.Root open={props.open}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/90" />
          <Dialog.Content className="fixed inset-1/4 bg-background textp-6 rounded-md shadow-lg rounded-xl p-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <Dialog.Title className="text-xl">Modal Title</Dialog.Title>
              <button onClick={props.closeModal}>
                {" "}
                <XIcon />
              </button>
            </div>
            <Dialog.Description className="my-4 flex flex-col justify-between flex-grow">
              <span
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragOver(false);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragOver(true);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const files = e.dataTransfer.files;
                  uploadFiles(files);
                  setIsDragOver(false);
                }}
                className={`border border-2 border-dashed border-gray-500 p-4 rounded-md h-[100px] flex items-center justify-center h-full ${isDragOver ? "bg-blue-400/10" : ""}`}
              >
                Select images or drag them here
              </span>

              <span className="mt-4 flex justify-end gap-2">
                <button
                  className="border border-1 border-dashed border-gray-500 rounded-sm px-3 py-1"
                  type="button"
                  onClick={props.closeModal}
                >
                  Cancel
                </button>
                <button
                  className="rounded-sm px-3 py-1 bg-blue-400"
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                >
                  Upload
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const files = e.target.files;
                    uploadFiles(files);
                  }}
                ></input>
              </span>
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
