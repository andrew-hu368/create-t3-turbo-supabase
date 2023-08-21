import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { SignIn, SignOut } from "~/components/auth";

export async function AuthShowcase() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <SignIn className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
        Sign in with Discord
      </SignIn>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {session && <span>Logged in as {session.user.email}</span>}
      </p>

      <SignOut className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
        Sign out
      </SignOut>
    </div>
  );
}
