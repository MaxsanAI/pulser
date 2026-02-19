import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { Feed } from "@/components/feed";
import { RightPanel } from "@/components/right-panel";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Mobile header + bottom nav */}
      <MobileHeader />

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex min-h-screen pt-14 pb-16 lg:pl-20 lg:pt-0 lg:pb-0">
        {/* Central feed */}
        <Feed />

        {/* Right panel - divider + content */}
        <div className="hidden border-l border-border xl:block">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
