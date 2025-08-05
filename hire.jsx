function App() {
  return (
    <>
        <Navbar active="hire" />
      <main className="page" style={{marginTop: '56px'}}>
        <section className="portfolio-block hire-me">
          <div className="container">
              <ImageWithFallback
                className="img-fluid rounded mb-4"
                src="https://picsum.photos/800/200?random=5"
                fallback={PLACEHOLDER_800x200}
                alt="Workspace"
              />
            <div className="heading">
              <h2>Hire Me</h2>
            </div>
            <form className="border rounded border-0 shadow-lg p-3 p-md-5" data-bs-theme="light">
              <div className="mb-3">
                <label className="form-label" htmlFor="subject">Subject</label>
                <select id="subject" className="form-select">
                  <option>Web Development</option>
                  <option>Consulting</option>
                  <option>Training</option>
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
        <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
