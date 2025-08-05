function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top portfolio-navbar gradient navbar-dark">
        <div className="container">
          <a className="navbar-brand logo" href="#">Haroun Minhas</a>
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
            <div className="row">
              <div className="col-md-4 text-center">
                <img
                  className="img-fluid rounded mb-3"
                  src="https://avatars.githubusercontent.com/u/152099124?v=4"
                  alt="Haroun Minhas"
                />
                <p>Ostend, Belgium</p>
                <p>
                  <a href="https://github.com/HarounMinhas" target="_blank">github.com/HarounMinhas</a>
                </p>
              </div>
              <div className="col-md-8">
                <h2 className="mb-3">Profile</h2>
                <p>
                  Background in the social sector, strong in project management and
                  communication. Now in IT, skilled in C# .NET and honing HTML, CSS,
                  JavaScript and SQL skills.
                </p>
                <h3 className="mt-4">Skills</h3>
                <ul>
                  <li>Project management & communication</li>
                  <li>C# .NET development</li>
                  <li>HTML, CSS, JavaScript & SQL</li>
                </ul>
              </div>
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
