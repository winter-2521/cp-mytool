// src/components/Controls.tsx
import React from 'react';

interface ControlsProps {
  nodes: number;
  edges: number;
  isConnected: boolean;
  setNodes: (nodes: number) => void;
  setEdges: (edges: number) => void;
  setIsConnected: (isConnected: boolean) => void;
}

const Controls: React.FC<ControlsProps> = ({ nodes, edges, isConnected, setNodes, setEdges, setIsConnected }) => {
  return (
    <div className="controls">
      <div className="tabs">
        <button className="tab">Generate</button>
        <button className="tab">Visualize</button>
      </div>
      <div className="control-panel">
        <label>
          Nodes:
          <input
            type="number"
            value={nodes}
            onChange={(e) => setNodes(Number(e.target.value))}
          />
        </label>
        <label>
          Edges:
          <input
            type="number"
            value={edges}
            onChange={(e) => setEdges(Number(e.target.value))}
          />
        </label>
        <label>
          Connected:
          <input
            type="checkbox"
            checked={isConnected}
            onChange={(e) => setIsConnected(e.target.checked)}
          />
        </label>
        <textarea
          className="edges-input"
          value={`5 4\n1 2\n1 3\n2 4\n3 5`}
          readOnly
        />
      </div>
    </div>
  );
};

export default Controls;
