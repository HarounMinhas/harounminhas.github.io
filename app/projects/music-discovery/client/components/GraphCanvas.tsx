'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ForceGraphMethods } from 'react-force-graph-2d';
import { useGraphStore } from '../store/graphStore';
import { drawCircularImage } from './NodeImage';
import { Api } from '../lib/api';
import { globalAudio } from '../lib/audio';
import { ContextMenu } from './ContextMenu';
import styles from '../styles.module.css';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

type MenuState = { x: number; y: number; nodeId: string } | null;

export default function GraphCanvas() {
  const { nodes, edges, pivotNodeId, setPivot, addNeighbors, setSelected } = useGraphStore();
  const graphRef = useRef<ForceGraphMethods>();
  const [menu, setMenu] = useState<MenuState>(null);
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
      graphRef.current.zoom(1.5, 800);
    }
  }, [pivotNodeId, nodes]);

  return (
    <div className={styles.canvasWrap} onContextMenu={(event) => event.preventDefault()}>
      <ForceGraph2D
        ref={graphRef as any}
        graphData={graphData as any}
        nodeRelSize={6}
        linkColor={() => '#3a4460'}
        linkWidth={1}
        cooldownTicks={60}
        enableNodeDrag
        backgroundColor="rgba(10,12,20,0)"
        onNodeClick={(node: any, event) => {
          const mouse = event as MouseEvent;
          setSelected(node.id);
          setMenu({ x: mouse.clientX, y: mouse.clientY, nodeId: node.id });
        }}
        onNodeRightClick={(node: any, event) => {
          event.preventDefault();
          const mouse = event as MouseEvent;
          setSelected(node.id);
          setMenu({ x: mouse.clientX, y: mouse.clientY, nodeId: node.id });
        }}
        onBackgroundClick={() => setMenu(null)}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const radius = 26;
          const img = getImage(node.imageUrl);
          if (img) {
            drawCircularImage(ctx, img, node.x, node.y, radius);
          } else {
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = '#233152';
            ctx.fill();
          }
          ctx.font = `${12 / Math.max(globalScale, 1)}px 'Inter', sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillStyle = 'rgba(230,233,239,0.95)';
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
              label: 'Meer gelijkaardige artiesten',
              onClick: async () => {
                const pivot = useGraphStore.getState().nodes.find((n) => n.id === menu.nodeId);
                if (!pivot) return;
                setPivot(pivot.id);
                const related = await Api.getRelated(pivot.artistId);
                addNeighbors(pivot.id, related);
              },
            },
            {
              label: 'Luister preview',
              onClick: async () => {
                const pivot = useGraphStore.getState().nodes.find((n) => n.id === menu.nodeId);
                if (!pivot) return;
                const tracks = await Api.getTopTracks(pivot.artistId);
                const playable = tracks.find((track) => track.previewUrl);
                if (playable) {
                  globalAudio.play(playable.id, playable.previewUrl);
                }
              },
            },
          ]}
        />
      )}
    </div>
  );
}
