import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import { Saved } from "./pages/Saved";
import { useSanityStore } from "./store/sanityStore";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [bagOpen, setBagOpen] = useState(false);
  const { loading, fetchData } = useSanityStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-shell">
        <Header setBagOpen={setBagOpen} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails setBagOpen={setBagOpen} />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
        <Footer />
        <CartDrawer isOpen={bagOpen} setOpen={setBagOpen} />
      </div>
    </BrowserRouter>
  );
}
