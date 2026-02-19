import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { Feed } from "@/components/feed";
import { RightPanel } from "@/components/right-panel";
import { createClient } from "@/lib/supabase/server"; // DODATO
import { redirect } from "next/navigation"; // DODATO

export default async function ProtectedPage() {
  const supabase = await createClient();

  // 1. Provera da li je korisnik ulogovan
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in"); // Ako nije ulogovan, šalji ga na login
  }

  // 2. Povlačenje postova iz Supabase
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="relative min-h-screen bg-background">
      <MobileHeader />
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex min-h-screen pt-14 pb-16 lg:pl-20 lg:pt-0 lg:pb-0">
        {/* Ovde šaljemo prave postove u Feed komponentu */}
        <Feed initialPosts={posts} user={user} />

        <div className="hidden border-l border-border xl:block">
          <div className="sticky top-0 h-screen overflow-y-auto">
            {/* Ovde ćemo posle dodati News i Weather */}
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
