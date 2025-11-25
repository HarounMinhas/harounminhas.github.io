import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Ontdek nieuwe muziek</h1>
      <p>Zoek een artiest en verken het netwerk van gelijkaardige artiesten.</p>
      <div style={{ maxWidth: 640, marginTop: 16 }}>
        <SearchBar />
      </div>
    </div>
  );
}
