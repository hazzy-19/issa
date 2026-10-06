import { useState, useEffect } from 'react';
import { Icon } from './UI';

export function Footer() {
  const [dark, setDark] = useState(() => localStorage.getItem("haniya-theme") === "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("haniya-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <div className="brand footer-logo"><span>Haniya deeq</span><small>COLLECTION</small></div>
        <p>Quietly elegant modest wear, made for women in motion.</p>
        <button className="theme-toggle" onClick={() => setDark(!dark)}>
          <Icon name={dark ? "sun" : "moon"} size={18} /> {dark ? "LIGHT MODE" : "DARK MODE"}
        </button>
      </div>
      <div><h3>HELP</h3><a href="#">Delivery</a><a href="#">Returns and exchanges</a><a href="#">Size guide</a></div>
      <div><h3>ABOUT</h3><a href="#">Our story</a><a href="#">Contact</a></div>
      <div><h3>ORDER HELP</h3><a href="https://wa.me/254700000000">+254 700 000 000</a><a href="mailto:hello@haniyadeeq.co.ke">hello@haniyadeeq.co.ke</a><span>Pay with M-Pesa</span></div>
      <small className="copyright">© 2025 Haniya deeq collection</small>
    </footer>
  );
}
