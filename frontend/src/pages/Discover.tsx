import GraphCanvas from '../components/GraphCanvas';
import SidePanel from '../components/SidePanel';

export default function Discover() {
  return (
    <div className="main">
      <div className="canvasWrap" style={{ padding: 8 }}>
        <GraphCanvas />
      </div>
      <SidePanel />
    </div>
  );
}
