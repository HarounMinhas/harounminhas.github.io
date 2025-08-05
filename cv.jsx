function App() {
  return (
    <>
        <Navbar active="cv" />
      <main className="page" style={{marginTop: '56px'}}>
        <section className="portfolio-block cv">
          <div className="container">
            <div className="row">
              <div className="col-md-4 text-center">
                  <ImageWithFallback
                    className="img-fluid rounded mb-3"
                    src="https://avatars.githubusercontent.com/u/152099124?v=4"
                    fallback={PLACEHOLDER_120}
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
        <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
