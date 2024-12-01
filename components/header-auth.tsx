import { Input } from "@/components/ui/input";
import { searchAction, signOutAction } from "@/app/actions";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { ThemeSwitcher } from "./theme-switcher";
import { LogOutIcon, Search } from "lucide-react";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="mt-4 flex items-center justify-between w-[90%] md:w-[80%] max-w-[1080px] py-2 px-3 rounded-full bg-opacity-20 bg-neutral-400 dark:bg-white/5 mx-auto backdrop-filter backdrop-blur-lg gap-2">
      <h2 className="text-lg font-[600] ml-3">Pixa</h2>
      <form action={searchAction} className="flex w-full mx-auto gap-1 items-center justify-center">
        <Input
          type="text"
          name="query"
          placeholder="Show me beach photos"
          required
          className="w-[80%] rounded-full"
        />
        <Button type="submit" size="icon" variant={"ghost"}>
          <Search />
        </Button>
      </form>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <form action={signOutAction}>
          <Button
            title="Log out"
            type="submit"
            variant={"outline"}
            size={"icon"}
            className="rounded-full"
          >
            <LogOutIcon />
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <div className="mt-4 flex items-center justify-between w-[90%] md:w-[60%] max-w-[1080px] py-2 px-3 rounded-full bg-opacity-20 bg-neutral-400 dark:bg-white/10 mx-auto backdrop-filter backdrop-blur-lg gap-2">
      <h2 className="text-lg font-[600] ml-4">Pixa</h2>
      <div className="flex items-center justify-center gap-4 ml-2">
        <a
          className="hover:font-[600] transition-all duration-100 border-b border-b-transparent hover:border-b-black dark:hover:border-b-white"
          href="https://github.com/kedaroo/codename-pixa"
        >
          Github
        </a>
        <a
          className="hover:font-[600] transition-all duration-100 border-b border-b-transparent hover:border-b-black dark:hover:border-b-white"
          href="https://github.com/kedaroo/codename-pixa/blob/main/README.md"
        >
          Docs
        </a>
      </div>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <Button asChild size="sm" className="rounded-full" variant={"outline"}>
          <Link href="/sign-in">Log in</Link>
        </Button>
      </div>
    </div>
  );
}
