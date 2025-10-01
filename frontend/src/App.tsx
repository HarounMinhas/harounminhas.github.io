import Routes from './routes';
import SearchBar from './components/SearchBar';
import GlobalPlayer from './components/GlobalPlayer';
import './styles.css';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">MusicDiscovery</div>
        <SearchBar />
        <nav style={{ display: 'flex', gap: 12 }}>
          <a className="btn" href="/">
            Home
          </a>
          <a className="btn" href="/discover">
            Discover
          </a>
          <a className="btn" href="/library">
            Library
          </a>
        </nav>
      </header>

      <main className="main">
        <div className="canvasWrap" style={{ padding: 8 }}>
          <Routes />
        </div>
        <div className="side" />
      </main>

      <footer className="footer">
        <div className="label">Global player</div>
        <GlobalPlayer />
      </footer>
    </div>
  );
}
