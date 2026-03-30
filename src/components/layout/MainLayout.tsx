import { useEffect } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";

const MainLayout = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const hideFooter = location.pathname === '/vender' || location.pathname === '/checkout' || location.pathname === '/obrigado';

  // Persistência Global de UTMs
  useEffect(() => {
    const utmSource = searchParams.get("utm_source");
    if (utmSource) {
      const utms = {
        utm_source: searchParams.get("utm_source"),
        utm_medium: searchParams.get("utm_medium"),
        utm_campaign: searchParams.get("utm_campaign"),
        utm_content: searchParams.get("utm_content"),
        utm_term: searchParams.get("utm_term"),
        timestamp: new Date().getTime()
      };
      localStorage.setItem("karcash_utms", JSON.stringify(utms));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
