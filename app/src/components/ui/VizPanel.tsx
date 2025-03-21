"use client";
import { useEffect } from "react";
import * as d3 from "d3";
import { logger } from "../../lib/helpers/logger";
import { arrayVizTemplate } from "../../lib/helpers/vizTemplates";

export default function VizPanel() {
  useEffect(() => {
    try {
      const svg = d3
        .select("#viz")
        .append("svg")
        .attr("width", 260)
        .attr("height", 100)
        .style("background", "#f9f9f9");

      const data = arrayVizTemplate([3, 2, 4]);
      const cellWidth = 40;
      const cellHeight = 40;

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * cellWidth + 10)
        .attr("y", 10)
        .attr("width", cellWidth - 5)
        .attr("height", cellHeight - 5)
        .attr("fill", "lightblue")
        .attr("stroke", "black");

      svg
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * cellWidth + 25)
        .attr("y", 35)
        .attr("text-anchor", "middle")
        .text((d) => d);

      logger.info("Visualization rendered successfully", {
        problem: "Two Sum",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logger.error("Error rendering visualization", { error: errorMessage });
    }
  }, []);

  return (
    <div className="panel">
      <h2 className="text-md font-semibold mb-2">Visualization</h2>
      <div id="viz" />
    </div>
  );
}
