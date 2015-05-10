
function makeData() {
  "use strict";
  return [makeRandomData(25),makeRandomData(25),makeRandomData(25),makeRandomData(25)];
}

function makePowerFunction(pow) {
  "use strict";
  return function(d) {
    var newY = Math.pow(10 * d.y, pow);
    return {x: d.x, y: newY, color: pow.toString()};
  };
}

function run(svg, data, Plottable) {
  "use strict";

  var d1 = new Plottable.Dataset(data[0].map(makePowerFunction(2)));
  var d2 = new Plottable.Dataset(data[1].map(makePowerFunction(4)));
  var d3 = new Plottable.Dataset(data[2].map(makePowerFunction(8)));
  var d4 = new Plottable.Dataset(data[3].map(makePowerFunction(16)));

  var colorScale = new Plottable.Scales.Color();

  //Axis
  var xScale = new Plottable.Scales.Linear();
  var yScale = new Plottable.Scales.ModifiedLog();
  var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
  var yAxis = new Plottable.Axes.Numeric(yScale, "left");

  //rendering
  var scatterPlot = new Plottable.Plots.Scatter(xScale, yScale).addDataset(d1)
                                                              .addDataset(d2)
                                                              .addDataset(d3)
                                                              .addDataset(d4)
                                                              .attr("fill", "color", colorScale)
                                                              .attr("size", function(d) {return d.x * 24;})
                                                              .project("x", "x", xScale)
                                                              .project("y", "y", yScale);

  //title + legend
  var title1 = new Plottable.Components.TitleLabel( "Two Data Series", "horizontal");
  var legend1 = new Plottable.Components.Legend(colorScale);
  legend1.maxEntriesPerRow(1);

  var titleTable = new Plottable.Components.Table().add(title1, 0, 0)
                                        .add(legend1, 0, 1);

  var basicTable = new Plottable.Components.Table().add(titleTable, 0, 2)
              .add(yAxis, 1, 1)
              .add(scatterPlot, 1, 2)
              .add(xAxis, 2, 2);

  basicTable.renderTo(svg);
}
