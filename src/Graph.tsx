import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

type Node = {
  id: number;
  x?: number;  // d3.jsが追加するプロパティ
  y?: number;  // d3.jsが追加するプロパティ
};

type Edge = {
  source: number | Node;
  target: number | Node;
};

type GraphProps = {
  nodes: Node[];
  edges: Edge[];
};

const Graph: React.FC<GraphProps> = ({ nodes, edges }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // 以前のグラフをクリア

      const width = 800;
      const height = 600;

      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(edges).id((d: any) => d.id))
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter(width / 2, height / 2));

      const link = svg.append('g')
        .selectAll('line')
        .data(edges)
        .enter()
        .append('line')
        .style('stroke', '#aaa');

      const node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', 5)
        .style('fill', '#69b3a2');

      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => (d.source as Node).x ?? 0)  // xがundefinedなら0を返す
          .attr('y1', (d: any) => (d.source as Node).y ?? 0)  // yがundefinedなら0を返す
          .attr('x2', (d: any) => (d.target as Node).x ?? 0)
          .attr('y2', (d: any) => (d.target as Node).y ?? 0);

        node
          .attr('cx', (d: Node) => d.x ?? 0)  // xがundefinedなら0を返す
          .attr('cy', (d: Node) => d.y ?? 0); // yがundefinedなら0を返す
      });
    }
  }, [nodes, edges]);

  return (
    <svg ref={svgRef} width={800} height={600}></svg>
  );
};

export default Graph;
