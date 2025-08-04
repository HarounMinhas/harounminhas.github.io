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
              <li className="nav-item"><a className="nav-link active" href="/projects-grid-cards.html">Projects</a></li>
              <li className="nav-item"><a className="nav-link" href="/cv.html">CV</a></li>
              <li className="nav-item"><a className="nav-link" href="/hire-me.html">Hire me</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="page" style={{marginTop: '56px'}}>
        <section className="portfolio-block projects-cards">
          <div className="container">
            <div className="heading">
              <h2>Recent Work</h2>
            </div>
            <div className="row">
              {Array.from({length:6}).map((_, i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <div className="card border-0">
                    <a href="#"><img className="card-img-top scale-on-hover" src={`https://via.placeholder.com/600x400?text=Image+${i+1}`} alt="Card" /></a>
                    <div className="card-body">
                      <h6><a href="#">Lorem Ipsum</a></h6>
                      <p className="text-muted card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna.</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
