function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top portfolio-navbar gradient navbar-dark">
        <div className="container">
          <a className="navbar-brand logo" href="#">Brand</a>
          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarNav" className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="/index.html">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="/projects-grid-cards.html">Projects</a></li>
              <li className="nav-item"><a className="nav-link active" href="/cv.html">CV</a></li>
              <li className="nav-item"><a className="nav-link" href="/hire-me.html">Hire me</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="page" style={{marginTop: '56px'}}>
        <section className="portfolio-block cv">
          <div className="container">
            <h2 className="mb-4">Curriculum Vitae</h2>
            <p>Coming soon...</p>
          </div>
        </section>
      </main>
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
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
