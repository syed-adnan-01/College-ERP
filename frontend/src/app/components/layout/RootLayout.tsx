import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#12172B] relative selection:bg-[#E8B93F]/30 selection:text-[#12172B]">
      {/* Subtle organic ambient glow in background */}
      <div className="fixed top-0 right-1/4 w-[600px] h-[600px] rounded-full ambient-glow-amber pointer-events-none -z-10 blur-3xl opacity-60" />
      <div className="fixed bottom-10 left-1/6 w-[500px] h-[500px] rounded-full ambient-glow-navy pointer-events-none -z-10 blur-2xl opacity-40" />

      <Navbar />
      <main className="flex-1 w-full relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

