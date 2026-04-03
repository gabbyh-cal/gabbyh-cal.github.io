console.log("script loaded");
const map = L.map('map').setView([37.832, -122.264], 12);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap & CARTO",
  subdomains: "abcd",
  maxZoom: 20
}).addTo(map);

fetch(window.STATIONS_URL)
  .then(response => response.json())
  .then(data => {
    const layer = L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 2+ Math.sqrt(feature.properties.combined_count) / 5,
          fillOpacity: 0.7,
          stroke: false
        });
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`
          <strong>${feature.properties.name}</strong><br>
          Start count: ${feature.properties.start_count}<br>
          End count: ${feature.properties.end_count}<br>
          Combined count: ${feature.properties.combined_count}
        `);
      }
    }).addTo(map);
    //map.fitBounds(layer.getBounds());
  })
  .catch(error => console.error("Error loading GeoJSON:", error));

fetch("assets/data/bike_network.geojson")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: function(feature) {
        return {
          color: "#2ca25f",
          weight: 2,
          opacity: 0.8
        };
      }
    }).addTo(map);
  });
