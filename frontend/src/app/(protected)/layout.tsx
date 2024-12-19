import Sidebar from "@/components/protected/sideBar/sideBar";
import RightSidebar from "@/components/protected/rightSideBar/rightSideBar";
// import MobileNav from "@/components/protected/mobileNav/mobileNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <div className="flex min-h-screen p-2 md:p-4 gap-x-4 md:gap-x-6 lg:gap-x-8">
          {/* Desktop Sidebar - hidden on mobile */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-4">
              <Sidebar />
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 w-full max-w-2xl mx-auto bg-white md:rounded-lg md:shadow-lg">
            {children}
          </main>

          {/* Desktop Right Sidebar - hidden on mobile and tablet */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-4">
              <RightSidebar />
            </div>
          </div>

          {/* Mobile Navigation - shown only on mobile
          <div className="fixed bottom-0 left-0 right-0 md:hidden">
            <MobileNav />
          </div> */}
        </div>
  );
}