import { useAuth } from '../lib/auth';
import { Api } from '../lib/api';
import { useGraphStore } from '../store/graphStore';

export default function FavoriteButton() {
  const { token } = useAuth();
  const node = useGraphStore((state) => {
    if (state.selectedNodeId) {
      return state.nodes.find((item) => item.id === state.selectedNodeId);
    }
    if (state.pivotNodeId) {
      return state.nodes.find((item) => item.id === state.pivotNodeId);
    }
    return undefined;
  });

  const save = async () => {
    if (!node || !token) return;
    await Api.addFavorite(token, {
      artistId: node.artistId,
      name: node.name,
      imageUrl: node.imageUrl,
    });
    alert('Toegevoegd aan favorieten');
  };

  if (!node) return null;

  return (
    <button className="btn" onClick={save} disabled={!token}>
      Favoriet
    </button>
  );
}
