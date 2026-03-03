import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const MainLayout = () => {
  const location = useLocation();
  const isVenderPage = location.pathname === '/vender';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {!isVenderPage && <Footer />}
    </div>
  );
};

export default MainLayout;
