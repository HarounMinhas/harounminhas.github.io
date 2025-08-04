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
              <li className="nav-item"><a className="nav-link" href="/cv.html">CV</a></li>
              <li className="nav-item"><a className="nav-link active" href="/hire-me.html">Hire me</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="page" style={{marginTop: '56px'}}>
        <section className="portfolio-block hire-me">
          <div className="container">
            <div className="heading">
              <h2>Hire Me</h2>
            </div>
            <form className="border rounded border-0 shadow-lg p-3 p-md-5" data-bs-theme="light">
              <div className="mb-3">
                <label className="form-label" htmlFor="subject">Subject</label>
                <select id="subject" className="form-select">
                  <optgroup label="This is a group">
                    <option value="12" selected>This is item 1</option>
                    <option value="13">This is item 2</option>
                    <option value="14">This is item 3</option>
                  </optgroup>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">Email</label>
                <input id="email" className="form-control" type="email" />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea id="message" className="form-control"></textarea>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="hire-date">Date</label>
                    <input id="hire-date" className="form-control" type="date" />
                  </div>
                  <div className="col-md-6 button">
                    <button className="btn btn-primary d-block w-100" type="submit">Hire Me</button>
                  </div>
                </div>
              </div>
            </form>
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
