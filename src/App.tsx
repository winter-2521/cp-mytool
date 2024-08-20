import React, { useState } from 'react';
import Graph from './Graph';

type Node = { id: number };
type Edge = { source: number; target: number };

const generateGraph = (nodes: number, edges: number): { nodes: Node[]; edges: Edge[] } => {
  const graphNodes: Node[] = Array.from({ length: nodes }, (_, i) => ({ id: i }));
  const graphEdges: Edge[] = [];

  for (let i = 0; i < edges; i++) {
    const source = Math.floor(Math.random() * nodes);
    const target = Math.floor(Math.random() * nodes);
    if (source !== target) {
      graphEdges.push({ source, target });
    }
  }

  return { nodes: graphNodes, edges: graphEdges };
};

const App: React.FC = () => {
  const [nodes, setNodes] = useState<number>(5);
  const [edges, setEdges] = useState<number>(4);
  const [graphData, setGraphData] = useState<{ nodes: Node[]; edges: Edge[] } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const graph = generateGraph(nodes, edges);
    setGraphData(graph);
  };

  return (
    <div>
      <h1>Graph Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nodes:
          <input
            type="number"
            value={nodes}
            onChange={(e) => setNodes(Number(e.target.value))}
            min="5"
            max="1500"
          />
        </label>
        <label>
          Edges:
          <input
            type="number"
            value={edges}
            onChange={(e) => setEdges(Number(e.target.value))}
            min="4"
            max="1400"
          />
        </label>
        <button type="submit">Generate</button>
      </form>
      {graphData && <Graph nodes={graphData.nodes} edges={graphData.edges} />}
    </div>
  );
};

export default App;
