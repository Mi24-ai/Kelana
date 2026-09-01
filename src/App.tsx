import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FlightsPage from "./pages/FlightsPage";
import TrainsPage from "./pages/TrainsPage";
import HotelsPage from "./pages/HotelsPage";
import GuidesPage from "./pages/GuidesPage";
import RoadTripPage from "./pages/RoadTripPage";
import VillaPage from "./pages/VillaPage";
import CampingPage from "./pages/CampingPage";
import BusPage from "./pages/BusPage";
import SoloBoxPage from "./pages/SoloBoxPage";
import type { PageKey } from "./types";

export default function App() {
  const [page, setPage] = useState<PageKey>("home");
  const [interest, setInterest] = useState("");

  const handleNavigate = (next: PageKey) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[var(--color-parchment-100)]">
      <Navbar active={page} onNavigate={handleNavigate} />
      <main key={page} className="animate-rise">
        {page === "home" && <Home onNavigate={handleNavigate} interest={interest} onInterestChange={setInterest} />}
        {page === "flights" && <FlightsPage />}
        {page === "trains" && <TrainsPage />}
        {page === "hotels" && <HotelsPage />}
        {page === "guides" && <GuidesPage interest={interest} />}
        {page === "roadtrip" && <RoadTripPage onNavigate={handleNavigate} interest={interest} />}
        {page === "villas" && <VillaPage />}
        {page === "camping" && <CampingPage />}
        {page === "buses" && <BusPage />}
        {page === "solobox" && <SoloBoxPage />}
      </main>
      <Footer />
    </div>
  );
}
