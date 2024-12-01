import Sidepanel from "@/components/sidepanel";
import { Photo } from "@/components/types";
import ImageUploadModal from "@/components/ui/image-upload-modal";
import PhotoGallery from "@/components/ui/photo-gallery";
import PhotoSlider from "@/components/ui/photo-slider";
import { createClient } from "@/utils/supabase/server";

const photo = {
  src: "https://images.unsplash.com/photo-1731271140119-34ad9551ff10",
  title: "Scenery",
};
const photos: Photo[] = new Array(10).fill("").map((_, idx) => ({
  ...photo,
  title: `${idx} ${photo.title}`,
  id: Math.random().toString(),
}));

export default async function Index() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>Welcome to our app!</p>;
  }
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        Welcome {user.email}
        <Sidepanel />
        <div>
          <h2 className="my-4 font-bold text-3xl">Photo Slider</h2>
          <PhotoSlider photos={photos} />
          <h2 className="my-4 font-bold text-3xl">Photo Gallery</h2>
          <PhotoGallery photos={photos} />
        </div>
      </main>
    </>
  );
}
