import { create } from 'zustand';
import { GraphState, NodeData, EdgeData } from '../lib/types';
import { nanoid } from 'nanoid/non-secure';

function radialPosition(index: number, total: number, cx: number, cy: number, radius: number) {
  const angle = (index / Math.max(total, 1)) * Math.PI * 2;
  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius,
  };
}

type GraphStore = GraphState & {
  setPivot: (nodeId: string | null) => void;
  setSelected: (nodeId: string | null) => void;
  addNeighbors: (pivotId: string, artists: { id: string; name: string; imageUrl?: string }[]) => void;
  upsertRoot: (artist: { id: string; name: string; imageUrl?: string }) => string;
  reset: () => void;
};

export const useGraphStore = create<GraphStore>((set, get) => ({
  nodes: [],
  edges: [],
  pivotNodeId: null,
  selectedNodeId: null,
  loadedNeighbors: {},

  setPivot(nodeId) {
    set({ pivotNodeId: nodeId });
  },

  setSelected(nodeId) {
    set({ selectedNodeId: nodeId });
  },

  upsertRoot(artist) {
    const state = get();
    const existing = state.nodes.find((node) => node.artistId === artist.id);
    if (existing) {
      set({ pivotNodeId: existing.id });
      return existing.id;
    }

    const id = nanoid();
    const node: NodeData = {
      id,
      artistId: artist.id,
      name: artist.name,
      imageUrl: artist.imageUrl,
      x: 0,
      y: 0,
    };

    set({
      nodes: [node],
      edges: [],
      pivotNodeId: id,
      selectedNodeId: id,
      loadedNeighbors: {},
    });

    return id;
  },

  addNeighbors(pivotId, artists) {
    const state = get();
    const pivot = state.nodes.find((node) => node.id === pivotId);
    if (!pivot) return;

    const existingIds = new Set(state.nodes.map((node) => node.artistId));
    const newNodes: NodeData[] = [];
    const newEdges: EdgeData[] = [];

    const filtered = artists.filter((artist) => !existingIds.has(artist.id));
    const radius = 180;

    filtered.forEach((artist, index) => {
      const id = nanoid();
      const position = radialPosition(index, filtered.length, pivot.x ?? 0, pivot.y ?? 0, radius);
      newNodes.push({
        id,
        artistId: artist.id,
        name: artist.name,
        imageUrl: artist.imageUrl,
        ...position,
      });
      newEdges.push({ source: pivot.id, target: id });
    });

    artists.forEach((artist) => {
      const existing = state.nodes.find((node) => node.artistId === artist.id);
      if (
        existing &&
        !state.edges.some(
          (edge) =>
            (edge.source === pivot.id && edge.target === existing.id) ||
            (edge.target === pivot.id && edge.source === existing.id),
        )
      ) {
        newEdges.push({ source: pivot.id, target: existing.id });
      }
    });

    set({
      nodes: [...state.nodes, ...newNodes],
      edges: [...state.edges, ...newEdges],
      loadedNeighbors: {
        ...state.loadedNeighbors,
        [pivot.artistId]: artists.map((artist) => artist.id),
      },
    });
  },

  reset() {
    set({ nodes: [], edges: [], pivotNodeId: null, selectedNodeId: null, loadedNeighbors: {} });
  },
}));
