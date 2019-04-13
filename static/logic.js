var mapData = "http://127.0.0.1:5000/dataMap"
console.log(mapData)

// Set up a 'create map' function
function createMap(popData) {

  var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4,
  });

  var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }).addTo(myMap);

  // Create a baseMaps object to hold the light layer
  var baseMaps = {
    Light: light
  };

  // Create an overlays object to hold the State population data
  var overlayMaps = {
    "Population 2010": popData[0],
    "Population 2017": popData[1],
    "Population 2023 (projection)": popData[2],
    "% Change 2010-17": popData[3]
  };

  // Layer control 
  L.control.layers(overlayMaps).addTo(myMap);
};

// Set up a 'create markers' function
function createMarkers(response) {

  // Initialize an array to hold
  var pop2010 = [];
  var pop2017 = [];
  var pop2023 = [];
  var popChange = [];

  // Loop through the response array
  for (var i = 0; i < response.length; i++) {

    // Assign latitude, longitude, and magnitude variables
    var lat = response[i].Latitude;
    var lon = response[i].Longitude;
    var pop10 = response[i].yr2010;
    var pop17 = response[i].yr2017;
    var pop23 = response[i].yr2023;
    var change = response[i].percentChange;

    var location = L.latLng(lat, lon);

      // Create circle markers for population 2010
      pop2010.push(
          L.circle(location, {
              fillOpacity: 0.75,
              color: "blue",
              radius: pop10 / 100
          }).bindPopup("<h1>State: " + response[i].State + "<h1>" + "<h1>Population: " + response[i].yr2010 + "<h1>")
      );

      // Create circle markers for population 2017
      pop2017.push(
        L.circle(location, {
            fillOpacity: 0.75,
            color: "blue",
            radius: pop17 / 100
        }).bindPopup("<h1>State: " + response[i].State + "<h1>" + "<h1>Population: " + response[i].yr2017 + "<h1>")
      );

      // Create circle markers for population projection 2023
      pop2023.push(
        L.circle(location, {
            fillOpacity: 0.75,
            color: "blue",
            radius: pop23 / 100
        }).bindPopup("<h1>State: " + response[i].State + "<h1>" + "<h1>Population: " + response[i].yr2017 + "<h1>")
      );

    if (change >= 9) {
      var markColor = "red"
    } else if (change >= 6) {
      var markColor = "orange"
    } else if (change >= 3) {
      var markColor = "yellow"
    } else if (change >= 0) {
      var markColor = "green"
    } else {
      var markColor = "purple"
      change = -change
    };

      // Create circle markers for population 2010
      popChange.push(
        L.circle(location, {
            fillOpacity: 0.75,
            color: markColor,
            radius: change * 20000
        }).bindPopup("<h1>State: " + response[i].State + "<h1>" + "<h1>Change: " + response[i].percentChange + "%<h1>")
      );
      
      
      
  };

  return [L.layerGroup(pop2010), L.layerGroup(pop2017), L.layerGroup(pop2023), L.layerGroup(popChange)];
};

d3.json(mapData, function(response) {
  createMap(createMarkers(response));
});