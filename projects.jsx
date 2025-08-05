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
        <Navbar active="projects" />
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
                      <ImageWithFallback
                        className="card-img-top scale-on-hover"
                        src={`https://picsum.photos/seed/${repo.id}/600/400`}
                        fallback={PLACEHOLDER_600x400}
                        alt={repo.name}
                      />
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
        <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
