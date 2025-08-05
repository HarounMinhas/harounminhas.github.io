function App() {
  const [repos, setRepos] = React.useState([]);

  React.useEffect(() => {
    fetch('https://api.github.com/users/HarounMinhas/repos')
      .then(res => res.json())
      .then(setRepos)
      .catch(console.error);
  }, []);

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
              <h2>Projects</h2>
            </div>
            <div className="row">
              {repos.map(repo => (
                <div key={repo.id} className="col-md-6 col-lg-4">
                  <div className="card border-0">
                    <a href={repo.html_url} target="_blank">
                      <img className="card-img-top scale-on-hover" src={`https://picsum.photos/seed/${repo.id}/600/400`} alt={repo.name} />
                    </a>
                    <div className="card-body">
                      <h6><a href={repo.html_url} target="_blank">{repo.name}</a></h6>
                      <p className="text-muted card-text">{repo.description || 'No description provided.'}</p>
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
