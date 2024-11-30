import ImageSlider from "@/components/ui/slider";
import { createClient } from "@/utils/supabase/server";

const image = {src: "https://images.unsplash.com/photo-1731271140119-34ad9551ff10", title: "Scenery"}
  const images = new Array(10)
    .fill("")
    .map((img, idx) => ({ ...image, title: `${idx}${image.title}` }));

export default async function Index() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>Welcome to our app!</p>
  }
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        Welcome {user.email}
       <div>


        <ImageSlider images={images}/>
       </div>
      </main>
    </>
  );
}
