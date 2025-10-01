export type Artist = {
  id: string;
  name: string;
  imageUrl?: string;
  genres?: string[];
  popularity?: number;
};

export type Track = {
  id: string;
  name: string;
  previewUrl?: string;
  durationMs: number;
  artists: { id: string; name: string }[];
};

export type NodeData = {
  id: string;
  artistId: string;
  name: string;
  imageUrl?: string;
  pinned?: boolean;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
};

export type EdgeData = { source: string; target: string };

export type GraphState = {
  nodes: NodeData[];
  edges: EdgeData[];
  pivotNodeId: string | null;
  loadedNeighbors: Record<string, string[]>;
  selectedNodeId: string | null;
};
