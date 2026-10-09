import { useState, useEffect } from 'react';
import { Icon } from './UI';
import { siteConfig } from '../config/site';

export function Footer() {
  const [dark, setDark] = useState(() => localStorage.getItem("haniya-theme") === "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("haniya-theme", dark ? "dark" : "light");
  }, [dark]);

  const cleanWhatsApp = (siteConfig.whatsappNumber || '').replace(/\D/g, '');

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <div className="brand footer-logo"><span>{siteConfig.businessName}</span><small>COLLECTION</small></div>
        <p>{siteConfig.tagline}</p>
        <button className="theme-toggle" onClick={() => setDark(!dark)}>
          <Icon name={dark ? "sun" : "moon"} size={18} /> {dark ? "LIGHT MODE" : "DARK MODE"}
        </button>
      </div>
      <div><h3>HELP</h3><a href="#">Delivery</a><a href="#">Returns and exchanges</a><a href="#">Size guide</a></div>
      <div><h3>ABOUT</h3><a href="#">Our story</a><a href="#">Contact</a></div>
      <div>
        <h3>ORDER HELP</h3>
        <a href={`https://wa.me/${cleanWhatsApp}`} target="_blank" rel="noopener noreferrer">{siteConfig.phoneNumber}</a>
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <span>Pay with M-Pesa</span>
      </div>
      <small className="copyright">© {new Date().getFullYear()} {siteConfig.businessName} collection</small>
    </footer>
  );
}

