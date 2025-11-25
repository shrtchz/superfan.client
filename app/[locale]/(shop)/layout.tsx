import { ThemeProvider } from "next-themes";
// import { AuthFooter } from "../components/AuthFooter";
import AuthNavbar from "../components/AuthNavbar";
import { PodcastProvider } from "../(dashboard)/context/PodcastContext";
import PodcastDialog from "../(dashboard)/Components/PodCastDialog";
import { Footer } from "../components/Footer";



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
        <div className="h-screen bg-white dark:bg-black text-white flex flex-col">
          <AuthNavbar />

          {/* Main Content - Takes up remaining space */}
          <main className="flex-1 w-full flex">
            {children}
          </main>

          <Footer />
          
          {/* Podcast Dialog - Rendered here but controlled by context */}
          <PodcastDialog />
        </div>
      </PodcastProvider>
    </ThemeProvider>
  );
}