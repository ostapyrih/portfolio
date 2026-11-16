import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dock from "./components/Dock";
import Home from "./pages/Home";
import Services from "./pages/Services";

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title =
      pathname === "/services"
        ? "Services - Ostap Pyrih"
        : "Ostap Pyrih - Full Stack & DevOps Engineer";
  }, [pathname]);

  return (
    <div className="min-h-dvh px-5 pt-16 pb-32 sm:pt-24">
      <main className="mx-auto max-w-2xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Dock />
    </div>
  );
}
