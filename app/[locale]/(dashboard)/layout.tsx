import { ThemeProvider } from "next-themes";
// import { AuthFooter } from "../components/AuthFooter";
import AuthNavbar from "../components/AuthNavbar";
import { PodcastProvider } from "./context/PodcastContext";
// import PodcastDialog from "./Components/PodCastDialog";
import { Footer } from "../components/Footer";
import AuthSidebar from "../components/AuthSidebar";
import AdPlayer from "./Components/AdsPlayer";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PodcastProvider>
        <div className="h-screen  dark:bg-black text-white flex flex-col">
          <AuthNavbar />

          {/* Main Content - Takes up remaining space */}
          <main className="flex-1 w-full flex justify-center  ">
          <div className="w-full xl:w-[90%] grid gap-2 grid-cols-4">
            <div className="col-span-1">
              <AuthSidebar />
            </div>
            <div className="col-span-2 w-full  2xl:ml-12 flex justifycenter">

            {children}
            </div>
              <div className="relative col-span-1 pt-2 items-start h-full py3 flex flex-row justifyend">

      <AdPlayer/>

            </div>
            </div>
          </main>

          <Footer />
          
          {/* Podcast Dialog - Rendered here but controlled by context */}
        </div>
      </PodcastProvider>
    </ThemeProvider>
  );
}