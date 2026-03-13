import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const MainLayout = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/vender' || location.pathname === '/checkout';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
