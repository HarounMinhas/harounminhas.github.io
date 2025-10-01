import { useEffect, useMemo, useRef, useState } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';
import { useGraphStore } from '../store/graphStore';
import { drawCircularImage } from './NodeImage';
import { Api } from '../lib/api';
import { globalAudio } from '../lib/audio';
import { ContextMenu } from './ContextMenu';

export default function GraphCanvas() {
  const { nodes, edges, pivotNodeId, setPivot, addNeighbors, setSelected } = useGraphStore();
  const graphRef = useRef<ForceGraphMethods>();
  const [menu, setMenu] = useState<{ x: number; y: number; nodeId: string } | null>(null);
  const imageCache = useMemo(() => new Map<string, HTMLImageElement>(), []);

  const graphData = useMemo(() => ({ nodes, links: edges }), [nodes, edges]);

  const getImage = (url?: string) => {
    if (!url) return undefined;
    if (imageCache.has(url)) {
      return imageCache.get(url);
    }
    const img = new Image();
    img.src = url;
    imageCache.set(url, img);
    return img;
  };

  useEffect(() => {
    if (!pivotNodeId || !graphRef.current) return;
    const node = nodes.find((item) => item.id === pivotNodeId);
    if (node) {
      graphRef.current.centerAt(node.x ?? 0, node.y ?? 0, 800);
      graphRef.current.zoom(1.6, 800);
    }
  }, [pivotNodeId, nodes]);

  return (
    <div className="canvasWrap" onContextMenu={(event) => event.preventDefault()}>
      <ForceGraph2D
        ref={graphRef as any}
        graphData={graphData as any}
        nodeRelSize={6}
        linkColor={() => '#3a4460'}
        linkWidth={1}
        cooldownTicks={50}
        enableNodeDrag
        onNodeClick={(node: any, event) => {
          const mouse = event as MouseEvent;
          setSelected(node.id);
          setMenu({ x: mouse.clientX, y: mouse.clientY, nodeId: node.id });
        }}
        onBackgroundClick={() => setMenu(null)}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const radius = 22;
          const img = getImage(node.imageUrl);
          if (img) {
            drawCircularImage(ctx, img, node.x, node.y, radius);
          } else {
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = '#233152';
            ctx.fill();
          }
          ctx.font = `${12 / Math.max(globalScale, 1)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillStyle = 'white';
          ctx.fillText(node.name, node.x, node.y + radius + 6);
        }}
      />

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          title={useGraphStore.getState().nodes.find((n) => n.id === menu.nodeId)?.name}
          onClose={() => setMenu(null)}
          items={[
            {
              label: 'More Similar Artists',
              onClick: async () => {
                const pivot = useGraphStore.getState().nodes.find((n) => n.id === menu.nodeId);
                if (!pivot) return;
                setPivot(pivot.id);
                const related = await Api.getRelated(pivot.artistId);
                addNeighbors(pivot.id, related);
              },
            },
            {
              label: 'Listen',
              onClick: async () => {
                const pivot = useGraphStore.getState().nodes.find((n) => n.id === menu.nodeId);
                if (!pivot) return;
                const tracks = await Api.getTopTracks(pivot.artistId, import.meta.env.VITE_DEFAULT_MARKET);
                const playable = tracks.find((track) => track.previewUrl);
                if (playable) {
                  globalAudio.play(playable.id, playable.previewUrl);
                }
              },
              disabled: false,
            },
          ]}
        />
      )}
    </div>
  );
}
