// src/components/Graph.tsx
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Node, Link } from '../utils/graphGenerator';

interface GraphProps {
  nodes: Node[];
  links: Link[];
}

const Graph: React.FC<GraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // 以前のグラフをクリア

    const width = svgRef.current?.clientWidth || 500;
    const height = svgRef.current?.clientHeight || 500;

    // const simulation = d3.forceSimulation(nodes)
    //   .force('link', d3.forceLink(links).id((d: any) => d.id).distance(50))
    //   .force('charge', d3.forceManyBody().strength(-300))
    //   .force('center', d3.forceCenter(width / 2, height / 2))
    //   .force('collide', d3.forceCollide(30))
    //   .on('tick', ticked);

    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke-width', 2);

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', 8)
      .attr('fill', '#69b3a2')

    const labels = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      .attr('x', d => (d.x || 0) + 12)
      .attr('y', d => (d.y || 0) + 4)
      .text(d => d.id)
      .attr('font-size', '12px')
      .attr('fill', '#333');

    function ticked() {
      link
        .attr('x1', d => (d.source as Node).x || 0)
        .attr('y1', d => (d.source as Node).y || 0)
        .attr('x2', d => (d.target as Node).x || 0)
        .attr('y2', d => (d.target as Node).y || 0);

      node
        .attr('cx', d => d.x || 0)
        .attr('cy', d => d.y || 0);

      labels
        .attr('x', d => (d.x || 0) + 12)
        .attr('y', d => (d.y || 0) + 4);
    }
  }, [nodes, links]);

  return <svg ref={svgRef} className="graph" />;
};

export default Graph;
