"use client";
import { createClient } from "@/utils/supabase/client";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

interface ImageUploadModalProps {
  open: boolean;
  closeModal: () => void;
}

export const uploadAllImages = async (images : File[]) => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if(!user) {
      toast.success("Couldn't fetch user data")
      throw new Error("Couldn't fetch user data")
    }


    // const imageUploads = images.map(async(file) => {
      
      

    // if (error) {
    //   throw new Error(`Error uploading ${file.name}: ${error.message}`);
    // }
    // return data;
    // })
    // await Promise.all(imageUploads);


    for (const img of images) {
      const { data, error } = await supabase
      .storage
      .from('pictures')
      .upload(user.id +'/'+ nanoid(), img);

      if(error) {
        toast.error("Image couldn't get uploaded");
        throw new Error("Image couldn't get uploaded");
      }

    }

    toast.success('Images uploaded successfully')
    const fetchedImages = await getAllImages()

    if(fetchedImages === undefined) {
      toast.error("Couldn't fetch the images");
      throw new Error("Couldn't fetch the images")
    }

    for (const img of fetchedImages) {
      const { data: signedData, error: signedError } = await supabase
        .storage
        .from('pictures')
        .createSignedUrl(user.id + '/' + img.name, 60 * 60);
        
      console.log(img.name);
      if(signedError) {
        toast.error("Image couldn't get uploaded");
        throw new Error("Image couldn't get uploaded");
      }

      console.log('>>> signed url ->', signedData.signedUrl);
    }

    return fetchedImages;
  } catch {
    toast.error('Oops! Something went wrong while uploading images')
  }
}

export const getAllImages = async () => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if(!user) {
      toast.success("Couldn't fetch user data")
      throw new Error("Couldn't fetch user data")
    }

    const { data, error } = await supabase
      .storage
      .from('pictures')
      .list(user.id, {
        limit: 100,
        offset: 0,
      })
    
    if(error) {
      throw new Error("Couldn't fetch the images");
    }

    return data;
  } catch {
    toast.error("Couldn't fetch images")
  }
}

export default function ImageUploadModal(props: ImageUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);



  const uploadFiles = async (filesList: FileList | null) => {
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

    console.log(">>> files", Array.from(files));
    // TODO: add file upload logic
    await uploadAllImages(Array.from(files))
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
