"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { useRef, useState } from "react";

interface ImageUploadModalProps {
  open: boolean;
}

export default function ImageUploadModal(props: ImageUploadModalProps) {
  const [open, setOpen] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => setOpen(false);

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/90" />
          <Dialog.Content className="fixed inset-1/4 bg-background textp-6 rounded-md shadow-lg rounded-xl p-4">
            <div className="flex justify-between">
              <Dialog.Title className="text-xl">Modal Title</Dialog.Title>
              <button onClick={closeModal}>
                {" "}
                <XIcon />
              </button>
            </div>
            <Dialog.Description className="my-4 h-full">
              <div className="h-[70%] flex flex-col justify-between">
                <div className="border border-2 border-dashed border-gray-500 p-4 rounded-md h-[100px] flex items-center justify-center h-full">
                  Select images or drag them here
                </div>

                <div className="mt-2 flex justify-end gap-2">
                  <button
                    className="border border-1 border-dashed border-gray-500 rounded-sm px-3 py-1"
                    type="button"
                    onClick={closeModal}
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
                  ></input>
                </div>
              </div>
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
