import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";

const MainLayout = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/vender' || location.pathname === '/checkout' || location.pathname === '/obrigado';

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
