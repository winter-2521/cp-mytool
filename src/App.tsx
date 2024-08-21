// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import VisualizeInput from './components/VisualizeInput';
import Graph from './components/Graph';
import { generateGraphData, Node, Link } from './utils/graphGenerator';
import './App.css';

const App: React.FC = () => {
  const [nodes, setNodes] = useState<number>(5);
  const [edges, setEdges] = useState<number>(4);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'generate' | 'visualize'>('generate');

  const { nodes: graphNodes, links: graphLinks } = generateGraphData(nodes, edges, isConnected);

  const visualizeGraph = () => {
    // ここでグラフを再描画するロジックを実装できます
  };

  return (
    <div className="app">
      <Header />
      <div className="content">
        <div className="graph-visualization">
          <Graph nodes={graphNodes} links={graphLinks} />
        </div>
        <div className="controls">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'generate' ? 'active' : ''}`}
              onClick={() => setActiveTab('generate')}
            >
              Generate
            </button>
            <button
              className={`tab ${activeTab === 'visualize' ? 'active' : ''}`}
              onClick={() => setActiveTab('visualize')}
            >
              Visualize
            </button>
          </div>
          {activeTab === 'generate' ? (
            <Controls
              nodes={nodes}
              edges={edges}
              isConnected={isConnected}
              setNodes={setNodes}
              setEdges={setEdges}
              setIsConnected={setIsConnected}
            />
          ) : (
            <VisualizeInput
              setNodes={setNodes}
              setEdges={setEdges}
              visualizeGraph={visualizeGraph}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
