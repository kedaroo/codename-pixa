import { Photo } from "@/components/types";
import ImageUploadModal from "@/components/ui/image-upload-modal";
import PhotoGallery from "@/components/ui/photo-gallery";
import PhotoSlider from "@/components/ui/photo-slider";
import { createClient } from "@/utils/supabase/server";
import { toast } from "react-toastify";

interface IPageProps {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function Search(props: IPageProps) {
  const query = await props.searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>Welcome to our app!</p>;
  }

  if (!query.query) {
    return <p>Search for something!</p>;
  }

  const embeddingRes = await fetch(`${process.env.URL}/api/embedding`, {
    method: "POST",
    body: JSON.stringify({ query }),
  });

  const embedding = await embeddingRes.json();

  const { data, error } = await supabase.rpc("match_images", {
    query_embedding: embedding.values,
    match_threshold: 0.5,
    match_count: 100,
    match_user_id: user.id,
  });
  
  if(error){
    return <p>Couldn't find anything {":("}</p>
  }

  const photos: Photo[] = []

  for (const img of data) {
    const { data: signedData, error: signedError } = await supabase.storage
    .from("pictures")
    .createSignedUrl(img.path, 60 * 60);

    if (!signedError) photos.push({
      id: img.id,
      title: img.path,
      src: signedData.signedUrl
    })  
  }

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        Showing results for "{query.query}"
        <PhotoGallery photos={photos} />
      </main>
    </>
  );
}
