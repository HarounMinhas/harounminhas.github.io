import FavoriteButton from './FavoriteButton';
import SnapshotDialog from './SnapshotDialog';
import TopTracks from './TopTracks';

export default function SidePanel() {
  return (
    <div className="side">
      <div style={{ display: 'flex', gap: 8, padding: 12 }}>
        <FavoriteButton />
        <SnapshotDialog />
      </div>
      <TopTracks />
    </div>
  );
}
