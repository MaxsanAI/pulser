import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/settings-form";
import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="relative min-h-screen bg-background">
      <MobileHeader />
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="min-h-screen pt-14 pb-16 lg:pl-20 lg:pt-0 lg:pb-0">
        <div className="mx-auto max-w-2xl p-4">
          <SettingsForm
            user={user}
            profile={profile}
          />
        </div>
      </div>
    </div>
  );
}
