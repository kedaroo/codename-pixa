"use client";
import { createClient } from "@/utils/supabase/client";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./button";

interface ImageUploadModalProps {
  open: boolean;
  closeModal: () => void;
}

export const uploadAllImages = async (images: File[]) => {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.success("Couldn't fetch user data");
      throw new Error("Couldn't fetch user data");
    }

    // const imageUploads = images.map(async(file) => {

    // if (error) {
    //   throw new Error(`Error uploading ${file.name}: ${error.message}`);
    // }
    // return data;
    // })
    // await Promise.all(imageUploads);

    for (const img of images) {
      const { data, error } = await supabase.storage
        .from("pictures")
        .upload(user.id + "/" + nanoid(), img);

      if (error) {
        toast.error("Image couldn't get uploaded");
        throw new Error("Image couldn't get uploaded");
      }

      const { data: signedData, error: signedError } = await supabase.storage
        .from("pictures")
        .createSignedUrl(data.path, 60 * 60);

      if (signedError) {
        toast.error("Image couldn't get uploaded");
        throw new Error("Image couldn't get uploaded");
      }

      await fetch('/api/imageupload', {
        method: 'POST',
        body : JSON.stringify({
          image_url: signedData.signedUrl,
          path: data.path,
          user_id: user.id
        })
      })
    }

    toast.success("Images uploaded successfully");
  } catch {
    toast.error("Oops! Something went wrong while uploading images");
  }
};

export const getAllImages = async () => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.success("Couldn't fetch user data");
      throw new Error("Couldn't fetch user data");
    }

    const { data, error } = await supabase.storage
      .from("pictures")
      .list(user.id, {
        limit: 100,
        offset: 0,
      });

    if (error) {
      throw new Error("Couldn't fetch the images");
    }

    return data;
  } catch {
    toast.error("Couldn't fetch images");
  }
};

export default function ImageUploadModal(props: ImageUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false)
  const uploadFiles = async (filesList: FileList | null) => {
    if(loading) {
      toast.error('Currently also loading');
      return;
    }
    if (!filesList || filesList.length === 0) {
      toast.error("Please select files");
      return;
    }

    const files = Array.from(filesList);

    const isAnyOfTheFilesNotImage = files.some(
      (file) => !file.type.startsWith("image")
    );

    if (isAnyOfTheFilesNotImage) {
      if (files.length === 1) {
        toast.error("File uploaded should be of type image");
      } else {
        toast.error("All files uploaded should be of type image");
      }

      return;
    }
    setLoading(true);
    await uploadAllImages(Array.from(files));
    setLoading(false);
    toast.success("Files uploaded " + files.length);
  };

  return (
    <>
      <Dialog.Root open={props.open}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0" />
          <Dialog.Content 
            className={`fixed z-[10000000]  ${props.open ? 'animate-modal-open' : 'animate-modal-closed'} shadow-[0px_0px_10000px_1000px_rgba(0,0,0,0.5)] inset-1/4 bg-background textp-6 rounded-xl p-4 flex flex-col justify-between`}>
            <div className="flex justify-between">
              <Dialog.Title className="text-xl">Modal Title</Dialog.Title>
              <button onClick={() => {
                setTimeout(() => {
                  props.closeModal()
                },100)
              }}>
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
                className={`border border-2 border-dashed border-gray-300 p-4 rounded-2xl min-h-[100px] flex items-center justify-center h-full ${isDragOver ? "bg-blue-400/10" : ""}`}
              >
                Select images or drag them here
              </span>

              <span className="mt-4 flex justify-end gap-2">
                <Button
                  variant={'outline'}
                  type="button"
                  onClick={props.closeModal}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                >
                  Upload
                </Button>
                <input
                  type="file"
                  multiple
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
      </>
  );
}
