import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Icon } from './UI';
import { useCartStore } from '../store/cartStore';
import { useSanityStore, computeVisibleCategories } from '../store/sanityStore';
import { siteConfig } from '../config/site';

export function Header({ setBagOpen }: { setBagOpen: (open: boolean) => void }) {
  const [announcement, setAnnouncement] = useState(true);
  const { categories, products, announcementBar } = useSanityStore();
  const announcements = announcementBar?.isActive ? (announcementBar.messages?.map((m: any) => m.text) || []) : [];
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const timer = setInterval(() => {
      setAnnouncementIndex(prev => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q') || '';
  const filterId = searchParams.get('filter') || '';
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const saved = useCartStore((state) => state.saved);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Compute visible departments
  const visibleCats = computeVisibleCategories(categories, products, true);
  const departments = visibleCats.filter(c => !c.parentId && (c.name.toLowerCase() === 'women' || c.name.toLowerCase() === 'men'));

  // Determine active department based on current filter or default to the first one (Women)
  let activeDepartmentId = departments[0]?.id;
  if (filterId) {
    if (departments.find(d => d.id === filterId)) {
      activeDepartmentId = filterId;
    } else {
      let current = visibleCats.find(c => c.id === filterId);
      while (current?.parentId) {
        current = visibleCats.find(c => c.id === current!.parentId);
      }
      if (current && departments.find(d => d.id === current!.id)) {
        activeDepartmentId = current.id;
      }
    }
  }

  const subcategories = visibleCats.filter(c => c.parentId === activeDepartmentId);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      navigate(`/?q=${e.target.value}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <>
      {announcements.length > 0 && (
        <div className="announcement">
          <span key={announcementIndex} className="fade-in-text">{announcements[announcementIndex]}</span>
        </div>
      )}
      <header className="site-header">
        <div className="header-main">
          <button aria-label="Open menu" className="bare icon-button mobile-only" onClick={() => setMobileMenu(true)}>
            <Icon name="menu" />
          </button>
          
          <Link to="/" className="brand bare" style={{ textDecoration: 'none' }}>
            <span>Haniya Deeq</span>
            <small>COLLECTION</small>
          </Link>
          
          <nav aria-label="Primary navigation" className="desktop-nav primary-nav">
            {departments.map((dept) => (
              <Link 
                to={`/?filter=${dept.id}`} 
                className={`bare nav-link ${activeDepartmentId === dept.id ? 'active' : ''}`} 
                key={dept.id}
              >
                {dept.name}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Search Bar */}
          <div className="desktop-search" style={{ flex: 1, margin: '0 20px', maxWidth: '600px' }}>
            <label className="search-wrap" style={{ width: '100%', display: 'flex', alignItems: 'center', background: 'var(--surface)', border: '1px solid var(--line)', padding: '0 15px', height: '44px', borderRadius: '22px' }}>
              <Icon name="search" size={18} />
              <input
                aria-label="Search products"
                onChange={handleSearch}
                placeholder="Search for items..."
                value={search}
                style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, marginLeft: '10px', color: 'var(--ink)' }}
              />
            </label>
          </div>

          <div className="header-actions">
            <button aria-label="Search" className="bare icon-button mobile-only" onClick={() => setSearchOpen(!searchOpen)}>
              <Icon name={searchOpen ? "close" : "search"} />
            </button>
            <Link to="/saved" aria-label={`Saved items, ${saved.length} items`} className="bare icon-button count-button" style={{ display: 'flex' }}>
              <Icon name="heart" /><span>{saved.length}</span>
            </Link>
            <button aria-label={`Shopping bag, ${cartCount} items`} className="bare icon-button count-button" onClick={() => setBagOpen(true)}>
              <Icon name="bag" /><span>{cartCount}</span>
            </button>
          </div>
        </div>

        {/* Expandable Search Bar for Mobile */}
        {searchOpen && (
          <div className="mobile-only" style={{ background: 'var(--surface)', padding: '10px 4vw', display: 'flex', borderBottom: '1px solid var(--line)', width: '100%' }}>
            <label className="search-wrap" style={{ flex: 1, border: '1px solid var(--line)', background: 'var(--surface)' }}>
              <Icon name="search" size={18} />
              <input
                autoFocus
                aria-label="Search products"
                onChange={handleSearch}
                placeholder="Search for items..."
                value={search}
                style={{ color: 'var(--ink)' }}
              />
            </label>
          </div>
        )}
        
        {/* Secondary Navigation (Subcategories) */}
        {!searchOpen && subcategories.length > 0 && (
          <div className="header-secondary">
            <nav className="secondary-nav">
              {subcategories.map(sub => (
                <Link to={`/?filter=${sub.id}`} className="bare secondary-link" key={sub.id}>
                  {sub.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {mobileMenu && (
        <div className="overlay" onMouseDown={() => setMobileMenu(false)}>
          <aside aria-label="Mobile menu" className="mobile-drawer" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drawer-head">
              <div className="brand">
                <span>Haniya Deeq</span>
                <small>COLLECTION</small>
              </div>
              <button aria-label="Close menu" className="bare icon-button" onClick={() => setMobileMenu(false)}><Icon name="close" /></button>
            </div>
            <nav>
              {departments.map((dept) => (
                <div key={dept.id} className="mobile-dept-group">
                  <button onClick={() => { navigate(`/?filter=${dept.id}`); setMobileMenu(false); }} className="mobile-dept-title">
                    {dept.name} <Icon name="chevron" />
                  </button>
                  {visibleCats.filter(c => c.parentId === dept.id).map(sub => (
                    <button key={sub.id} className="mobile-sub-link" onClick={() => { navigate(`/?filter=${sub.id}`); setMobileMenu(false); }}>
                      {sub.name}
                    </button>
                  ))}
                </div>
              ))}
              <a href={`https://wa.me/${(siteConfig.whatsappNumber || '254700000000').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="mobile-dept-title" style={{ color: '#25D366' }}>CHAT ON WHATSAPP <Icon name="chevron" /></a>
            </nav>
            <p>Modest pieces, thoughtfully chosen.</p>
          </aside>
        </div>
      )}
    </>
  );
}
