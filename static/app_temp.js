function simpleChart(entry) {
    d3.json(`/data/${entry}`).then((data) => {
        console.log(data);

        var basic = d3.select('#state-data')

        basic.html("");

        Object.entries(data).forEach(([key, value]) => {
            basic.append("h6").text(`${key}: ${value}`);
        });
    });
};

function init() {
    var selector = d3.select("#selState");

    d3.json('/names').then((stateNames) => {
        console.log(stateNames)
        stateNames.forEach((state) => {
            selector
                .append("option")
                .text(state)
                .property("value", state);
        });

        const firstState = stateNames[0];
        simpleChart(firstState);

    });
};

function optionChanged(newState) {
    simpleChart(newState);
};

init();


function buildCharts(newChart) 
{
  // @TODO: Use `d3.json` to fetch the sample data for the plots
var year= [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023];

d3.json('/names').then(function(newStates)
{
    // @TODO: Build a Bubble Chart using the sample data
    newStates.forEach((state) => {
  var trace1 ={
  x: year,
  y: population_new.States,
  mode: 'markers',
marker: {
  color:"red",  
}   
};

var dataPlot= [trace1];

var layout ={xaxis:
  {title:"Years"}
};
Plotly.newPlot('line', dataPlot, state, layout);