console.log("script loaded");
const map = L.map('map').setView([37.832, -122.264], 12);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap & CARTO",
  subdomains: "abcd",
  maxZoom: 20
}).addTo(map);

let stationLayer = null;

const yearSlider = document.getElementById("yearSlider");
const yearLabel = document.getElementById("yearLabel");

function renderStations(selectedYear) {
  if (stationLayer) {
    map.removeLayer(stationLayer);
  }

  fetch(`assets/data/stations_${String(selectedYear).slice(-2)}.geojson`)
    .then(response => response.json())
    .then(data => {
      stationLayer = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 2 + Math.sqrt(feature.properties.combined_count) / 4,
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
}

renderStations(yearSlider.value);

yearSlider.addEventListener("input", function () {
  yearLabel.textContent = this.value;
  renderStations(this.value);
});

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

// second map
const map2 = L.map('map2').setView([37.87, -122.27], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map2);

// new line layer
fetch("assets/data/BerkeleySidewalk.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: function(feature) {
        return {
          weight: 3,
          opacity: 1
        };
      }
    }).addTo(map2);
  });
