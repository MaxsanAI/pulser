import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { Feed } from "@/components/feed";
import { RightPanel } from "@/components/right-panel";
import { createClient } from "@/utils/supabase/server"; // Proveri da li je kod tebe @/utils ili @/lib
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  // 1. Provera sesije (da te ne izbaci 405 ili 401 greška)
  const { data: { user } } = await supabase.auth.getUser();
  
  // Ako nema korisnika, šaljemo ga na sign-in stranicu koja već postoji u starteru
  if (!user) {
    return redirect("/sign-in");
  }

  // 2. Povlačenje postova iz tabele 'posts'
  // Ako tabela ne postoji, javi mi da ti dam SQL kod za Supabase!
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Supabase error:", error.message);
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      {/* Mobilno zaglavlje */}
      <MobileHeader />

      {/* Desktop Sidebar (Leva strana) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Glavni kontejner */}
      <div className="flex min-h-screen pt-14 pb-16 lg:pl-20 lg:pt-0 lg:pb-0">
        
        {/* Sredina: Feed sa podacima iz baze */}
        {/* BITNO: Ovde prosleđujemo posts i user */}
        <Feed initialPosts={posts || []} user={user} />

        {/* Desna strana: News & Weather */}
        <div className="hidden border-l border-white/5 xl:block w-80">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
