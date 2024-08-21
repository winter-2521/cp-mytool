// src/components/VisualizeInput.tsx
import React, { useState } from 'react';

interface VisualizeInputProps {
  setNodes: (nodes: number) => void;
  setEdges: (edges: number) => void;
  visualizeGraph: () => void;
}

const VisualizeInput: React.FC<VisualizeInputProps> = ({ setNodes, setEdges, visualizeGraph }) => {
  const [nodesInput, setNodesInput] = useState<string>('');
  const [edgesInput, setEdgesInput] = useState<string>('');

  const handleVisualize = () => {
    const nodes = parseInt(nodesInput, 10);
    const edges = parseInt(edgesInput, 10);
    if (!isNaN(nodes) && !isNaN(edges)) {
      setNodes(nodes);
      setEdges(edges);
      visualizeGraph();
    }
  };

  return (
    <div className="visualize-input">
      <label>
        N (Nodes):
        <input
          type="text"
          value={nodesInput}
          onChange={(e) => setNodesInput(e.target.value)}
        />
      </label>
      <label>
        M (Edges):
        <input
          type="text"
          value={edgesInput}
          onChange={(e) => setEdgesInput(e.target.value)}
        />
      </label>
      <button onClick={handleVisualize}>Visualize</button>
    </div>
  );
};

export default VisualizeInput;
