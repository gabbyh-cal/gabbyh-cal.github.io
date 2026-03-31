console.log("script loaded");
const map = L.map('map').setView([37.87, -122.27], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

fetch(window.STATIONS_URL)
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: Math.sqrt(feature.properties.combined_count) / 2,
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
  })
  .catch(error => console.error("Error loading GeoJSON:", error));
