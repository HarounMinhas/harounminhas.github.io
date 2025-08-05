window.PLACEHOLDER_120 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMjAnIGhlaWdodD0nMTIwJz48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPScjY2NjJy8+PHRleHQgeD0nNTAlJyB5PSc1MCUnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIHRleHQtYW5jaG9yPSdtaWRkbGUnIGZpbGw9JyM2NjYnIGZvbnQtc2l6ZT0nMTQnPkF2YXRhcjwvdGV4dD48L3N2Zz4K';
window.PLACEHOLDER_600x400 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc2MDAnIGhlaWdodD0nNDAwJz48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPScjY2NjJy8+PHRleHQgeD0nNTAlJyB5PSc1MCUnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIHRleHQtYW5jaG9yPSdtaWRkbGUnIGZpbGw9JyM2NjYnIGZvbnQtc2l6ZT0nMjAnPkltYWdlIFVuYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPgo=';
window.PLACEHOLDER_800x200 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4MDAnIGhlaWdodD0nMjAwJz48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPScjY2NjJy8+PHRleHQgeD0nNTAlJyB5PSc1MCUnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIHRleHQtYW5jaG9yPSdtaWRkbGUnIGZpbGw9JyM2NjYnIGZvbnQtc2l6ZT0nMjAnPkltYWdlIFVuYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPgo=';
window.PLACEHOLDER_800x600 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4MDAnIGhlaWdodD0nNjAwJz48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPScjY2NjJy8+PHRleHQgeD0nNTAlJyB5PSc1MCUnIGRvbWluYW50LWJhc2VsaW5lPSdtaWRkbGUnIHRleHQtYW5jaG9yPSdtaWRkbGUnIGZpbGw9JyM2NjYnIGZvbnQtc2l6ZT0nMjAnPkltYWdlIFVuYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPgo=';

function Navbar({ active }) {
  const items = [
    { key: 'home', href: '/index.html', label: 'Home' },
    { key: 'projects', href: '/projects-grid-cards.html', label: 'Projects' },
    { key: 'cv', href: '/cv.html', label: 'CV' },
    { key: 'hire', href: '/hire-me.html', label: 'Hire me' }
  ];
  return (
    <nav className="navbar navbar-expand-lg fixed-top portfolio-navbar gradient navbar-dark">
      <div className="container">
        <a className="navbar-brand logo" href="#">Haroun Minhas</a>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {items.map(item => (
              <li key={item.key} className="nav-item">
                <a className={`nav-link${active === item.key ? ' active' : ''}`} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="page-footer py-3 border-top">
      <div className="container my-4">
        <div className="links">
          <a href="#">About me</a>
          <a href="#">Contact me</a>
          <a href="#">Projects</a>
        </div>
        <div className="social-icons">
          <a className="me-3" href="#"><i className="icon ion-social-facebook"></i></a>
          <a className="me-3" href="#"><i className="icon ion-social-instagram-outline"></i></a>
          <a className="me-3" href="#"><i className="icon ion-social-twitter"></i></a>
        </div>
      </div>
    </footer>
  );
}

function ImageWithFallback({ src, alt, fallback, ...rest }) {
  return (
    <img
      src={src}
      alt={alt}
      onError={e => {
        if (e.target.src !== fallback) {
          e.target.src = fallback;
        }
      }}
      {...rest}
    />
  );
}

