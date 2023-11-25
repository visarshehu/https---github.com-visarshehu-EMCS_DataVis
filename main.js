d3.csv("weekly_temperature.csv", d3.autoType).then(data => {
    visualize(data);
});

const visualize = (data) => {
    const margin = {top: 50, right: 200, left: 50, bottom:50 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
  
    const svg = d3.select("#line-chart")
                    .append("svg")
                    .attr("viewBox", '0, 0, 1000, 500');
    const innerChart = svg.append("g")
                            .attr("transform", "translate(50, 50)");

                            const firstDate = new Date(2021, 00, 01, 0, 0, 0);
                            const lastDate = d3.max(data, d =>d.date);
                            const xScale = d3.scaleTime()
                              .domain([firstDate, lastDate])
                              .range([0, innerWidth]);
                          
                            // Y scale
                            const maxTemp = d3.max(data, d => d.max_temp_F);
                            const yScale = d3.scaleLinear()
                              .domain([0, maxTemp])
                              .range([innerHeight, 0]);
                          
                            const xAxis = d3.axisBottom(xScale)
                              .tickFormat(d3.timeFormat("%b"));
                            innerChart
                              .append("g")
                                .attr("class", "axis-x")
                                .attr("transform", `translate(0, ${innerHeight})`)
                                .call(xAxis);
                                
                            d3.selectAll(".axis-x text")
                              .attr("x", d => {
                                 const currentMonth = d;
                                 const nextMonth = new Date(2021, currentMonth.getMonth() + 1, 1);
                                 return (xScale(nextMonth) - xScale(currentMonth)) / 2;
                              })
                              .attr("y", "10px");
                          
                            // Left axis
                            const leftAxis = d3.axisLeft(yScale);
                            innerChart
                              .append("g")
                                .attr("class", "axis-y")
                                .call(leftAxis);
                            d3.selectAll(".axis-y text")
                              .attr("x", "-5px");
                        
                            d3.selectAll(".axis-x text, .axis-y text")
                              .style("font-family", "Roboto, sans-serif")
                              .style("font-size", "14px");
                        
                            svg
                              .append("text")
                                .text("Temperature (°F)")
                                .attr("y", 20);

                    innerChart
                                .selectAll("circle") 
                                .data(data) 
                                .join("circle") 
                                .attr("r", 4)
                                .attr("cx", d => xScale(d.date)) 
                                .attr("cy", d => yScale(d.avg_temp_F)) 
                                .attr("fill", red);
                                
};