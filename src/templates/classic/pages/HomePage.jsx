import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import ChefsPicks from "../components/ChefsPicks";
import MenuPreview from "../components/MenuPreview";
import GalleryPreview from "../components/GalleryPreview";
import FindUs from "../components/FindUs";

export default function HomePage() {
  return (
    <>

      <Hero />

      <About />

      <ChefsPicks />

      <MenuPreview />

      <GalleryPreview />

      <FindUs />
    </>
  );
}
