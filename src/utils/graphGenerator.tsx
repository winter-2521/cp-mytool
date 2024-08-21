// src/utils/graphGenerator.ts
export interface Node {
    id: string;
    x?: number;
    y?: number;
    fx?: number | null;
    fy?: number | null;
  }
  
  export interface Link {
    source: string | Node;
    target: string | Node;
  }
  
  export const generateGraphData = (nodeCount: number, edgeCount: number, isConnected: boolean): { nodes: Node[], links: Link[] } => {
    const nodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({ id: (i + 1).toString() }));
    const links: Link[] = [];
  
    if (isConnected) {
      // 連結グラフを生成
      for (let i = 1; i < nodeCount; i++) {
        links.push({ source: nodes[i - 1].id, target: nodes[i].id });
      }
      for (let i = nodeCount; i < edgeCount; i++) {
        const source = nodes[Math.floor(Math.random() * nodeCount)].id;
        const target = nodes[Math.floor(Math.random() * nodeCount)].id;
        if (source !== target) {
          links.push({ source, target });
        }
      }
    } else {
      // 非連結グラフを生成
      for (let i = 0; i < edgeCount; i++) {
        const source = nodes[Math.floor(Math.random() * nodeCount)].id;
        const target = nodes[Math.floor(Math.random() * nodeCount)].id;
        if (source !== target) {
          links.push({ source, target });
        }
      }
    }
  
    return { nodes, links };
  };
  