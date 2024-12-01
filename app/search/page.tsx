"use client";
import { Photo } from "@/components/types";
import ImageUploadModal from "@/components/ui/image-upload-modal";
import PhotoGallery from "@/components/ui/photo-gallery";
import PhotoSlider from "@/components/ui/photo-slider";
import { createClient } from "@/utils/supabase/client";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default function Search(props: IPageProps) {
  const query = useSearchParams().get("query");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  if (!query) {
    return <p>Search for something!</p>;
  }

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true)
      setError('')
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        redirect("/sign-up");
        setLoading(false)
        return;
      }

      const embeddingRes = await fetch(`/api/embedding`, {
        method: "POST",
        body: JSON.stringify({ query }),
      });

      const embedding = await embeddingRes.json();

      const { data, error } = await supabase.rpc("match_images", {
        query_embedding: embedding.values,
        match_threshold: 0.3,
        match_count: 100,
        match_user_id: user.id,
      });

      if (error) {
        setError("Couldn't find anything :(");
        setLoading(false)
        return;
      }

      if (!data.length) {
        setError("Couldn't find anything :(");
        setLoading(false)
        return;
      }

      const urls: Photo[] = [];

      for (const img of data) {
        const { data: signedData, error: signedError } = await supabase.storage
          .from("pictures")
          .createSignedUrl(img.path, 60 * 60);

        if (!signedError)
          urls.push({
            id: img.id,
            title: img.path,
            src: signedData.signedUrl,
          });
      }

      setPhotos(urls)
      setLoading(false)
    };

    getPhotos();
  }, [query]);

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        Showing results for "{query}"
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <PhotoGallery photos={photos} />
      </main>
    </>
  );
}
