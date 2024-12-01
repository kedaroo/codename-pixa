import LandingPage from "@/components/landing-page";
import Sidepanel from "@/components/sidepanel";
import { Photo } from "@/components/types";
import ImageUploadModal from "@/components/ui/image-upload-modal";
import PhotoGallery from "@/components/ui/photo-gallery";
import PhotoSlider from "@/components/ui/photo-slider";
import { createClient } from "@/utils/supabase/server";
import { toast } from "react-toastify";

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
    return <LandingPage/>;
  }

  const { data, error } = await supabase
  .storage
  .from('pictures')
  .list(user.id, {
    limit: 100,
    offset: 0,
    // sortBy: { column: 'name', order: 'asc' },
  })

  if (error) {
    toast.error("Couldn't load images!");
    throw new Error("Couldn't load images");
  }

  const imgUrls: Photo[] = []

  for (const img of data) {
    const { data: signedData, error: signedError } = await supabase.storage
    .from("pictures")
    .createSignedUrl(`${user.id}/${img.name}`, 60 * 60);

    if (!signedError) imgUrls.push({
      id: img.id,
      title: img.name,
      src: signedData.signedUrl
    })  
  }

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        Welcome {user.email}
        <Sidepanel />
        <div>
          {/* <h2 className="my-4 font-bold text-3xl">Photo Slider</h2> */}
          {/* <PhotoSlider photos={photos} /> */}
          <h2 className="my-4 font-bold text-3xl">Photo Gallery</h2>
          <PhotoGallery photos={imgUrls} />
        </div>
      </main>
    </>
  );
}
