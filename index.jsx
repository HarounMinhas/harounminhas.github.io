function App() {
  return (
    <>
        <Navbar active="home" />
      <main className="page" style={{marginTop: '56px'}}>
        <section className="portfolio-block block-intro">
          <div className="container text-center">
              <ImageWithFallback
                className="avatar mx-auto mb-3"
                src="https://avatars.githubusercontent.com/u/152099124?v=4"
                fallback={PLACEHOLDER_120}
                alt="Haroun Minhas"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            <div className="about-me">
              <p>
                Hello! I am <strong>Haroun Minhas</strong> from Ostend, Belgium. I have a
                background in the social sector with strong project management and
                communication skills. I am now focused on C# .NET while honing my HTML,
                CSS, JavaScript and SQL abilities.
              </p>
              <a className="btn btn-outline-primary" role="button" href="/hire-me.html">Hire me</a>
            </div>
          </div>
        </section>
        <section className="portfolio-block photography">
          <div className="container">
            <div className="row g-0">
                <div className="col-md-6 col-lg-4 item zoom-on-hover">
                  <a href="#"><ImageWithFallback className="img-fluid image" src="https://picsum.photos/600/400?random=1" fallback={PLACEHOLDER_600x400} alt="Sample work 1" /></a>
                </div>
                <div className="col-md-6 col-lg-4 item zoom-on-hover">
                  <a href="#"><ImageWithFallback className="img-fluid image" src="https://picsum.photos/600/400?random=2" fallback={PLACEHOLDER_600x400} alt="Sample work 2" /></a>
                </div>
                <div className="col-md-6 col-lg-4 item zoom-on-hover">
                  <a href="#"><ImageWithFallback className="img-fluid image" src="https://picsum.photos/600/400?random=3" fallback={PLACEHOLDER_600x400} alt="Sample work 3" /></a>
                </div>
            </div>
          </div>
        </section>
        <section className="portfolio-block call-to-action border-bottom">
          <div className="container">
            <div className="d-flex justify-content-center align-items-center content">
              <h3>Like what you see?</h3>
              <button className="btn btn-outline-primary btn-lg ms-3" type="button">Hire me</button>
            </div>
          </div>
        </section>
        <section className="portfolio-block skills">
          <div className="container">
            <div className="heading">
              <h2>Special Skills</h2>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card special-skill-item border-0">
                  <div className="card-header bg-transparent border-0">
                    <i className="icon ion-ios-star-outline"></i>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">Project Management</h3>
                    <p className="card-text">
                      Experienced in coordinating teams and initiatives within the social
                      sector.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card special-skill-item border-0">
                  <div className="card-header bg-transparent border-0">
                    <i className="icon ion-ios-lightbulb-outline"></i>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">C# .NET Development</h3>
                    <p className="card-text">
                      Building applications with C# and the .NET framework.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card special-skill-item border-0">
                  <div className="card-header bg-transparent border-0">
                    <i className="icon ion-ios-gear-outline"></i>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">Web Development</h3>
                    <p className="card-text">
                      Creating responsive interfaces using HTML, CSS, JavaScript and SQL.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <section className="portfolio-block website gradient">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 col-lg-5 offset-lg-1 text">
              <h3>Tapp Project</h3>
              <p>
                Simple task manager built with C# showcasing clean architecture and
                practical features.
              </p>
            </div>
            <div className="col-md-12 col-lg-5">
                <div className="portfolio-laptop-mockup">
                  <div className="screen">
                    <ImageWithFallback
                      className="screen-content"
                      src="https://picsum.photos/800/600?random=4"
                      fallback={PLACEHOLDER_800x600}
                      alt="Tapp Project screenshot"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="keyboard"></div>
                </div>
            </div>
          </div>
        </div>
      </section>
        <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
