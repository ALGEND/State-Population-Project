function simpleChart(entry) {
    d3.json(`/data/${entry}`).then((data) => {
        // console.log(data);

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
        // console.log(stateNames)
        stateNames.forEach((state) => {
            selector
                .append("option")
                .text(state)
                .property("value", state);
        });

        const firstState = stateNames[0];
        simpleChart(firstState);
        buildCharts(firstState);

    });
};

function optionChanged(newState) {
    simpleChart(newState);
    buildCharts(newState);
};

function buildCharts(newChart) {
    console.log(newChart);

    var year= [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023];
    var pop = []
  
    d3.json(`/data/${newChart}`).then(function(newState) {
        var trace1 = {
            x: year,
            y: [
                newState.yr2010,
                newState.yr2011,
                newState.yr2012,
                newState.yr2013,
                newState.yr2014,
                newState.yr2015,
                newState.yr2016,
                newState.yr2017,
                newState.yr2018,
                newState.yr2019,
                newState.yr2020,
                newState.yr2021,
                newState.yr2022,
                newState.yr2023,
            ],
            type: "line",
            mode: 'line',
            marker: {
                color:"red",
            }
        };
        
        console.log(trace1);
        var dataPlot= [trace1];
        var layout = {xaxis: {title:"Years"}};
        Plotly.newPlot('plot', dataPlot, layout);
    });
};

init();