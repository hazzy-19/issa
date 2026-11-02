import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import ChefsPicks from "../components/ChefsPicks";
import Menu from "../components/Menu";
import Gallery from "../components/Gallery";
import FindUs from "../components/FindUs";

export default function HomePage() {
  return (
    <>
      {/* Hero with 5-image slideshow and true liquid frosted glass card */}
      <Hero />

      {/* About section moving through history & principles */}
      <About />

      {/* Chef's picks in 2-column mobile layout */}
      <ChefsPicks />

      {/* Menu favorites preview in 2-column mobile layout */}
      <Menu />

      {/* Gallery Pinterest masonry preview */}
      <Gallery />

      {/* Find us */}
      <FindUs />
    </>
  );
}
