import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-up')
  }
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        Collections!
      </main>
    </>
  );
}
