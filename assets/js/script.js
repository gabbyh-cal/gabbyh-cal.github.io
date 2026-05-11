console.log("script loaded");
const map = L.map('map').setView([37.832, -122.264], 12);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap & CARTO",
  subdomains: "abcd",
  maxZoom: 20
}).addTo(map);

let stationLayer = null;

const yearSlider = document.getElementById("yearSlider");

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
/*
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap & CARTO",
  subdomains: "abcd",
  maxZoom: 20
}).addTo(map2);

// new line layer
fetch("assets/data/sidewalkbuffers.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: function(feature) {
        return {
          weight: 1,
          opacity: 1
        };
      }
    }).addTo(map2);
  });
*/

const clusterColors = {
  0: "#E74C3C",
  1: "#2ECC71",
  2: "#3498DB",
  3: "#F39C12",
};

const clusterLabels = {
  0: "Residential - Low Transit Access",
  1: "Transit-Oriented Commercial Core",
  2: "High Access Mixed Urban",
  3: "Residential - Transit Access",
};

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap & CARTO",
  subdomains: "abcd",
  maxZoom: 20
}).addTo(map2);

fetch("assets/data/stations_clustered.geojson")
  .then(res => res.json())
  .then(data => console.log(data.features[0].properties));

fetch("assets/data/stations_clustered.geojson")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        const cluster = feature.properties.cluster;
        return L.circleMarker(latlng, {
          radius: 3,
          fillColor: clusterColors[cluster],
          color: clusterColors[cluster],
          fillOpacity: 0.8,
          stroke: false,
        });
      },
      onEachFeature: function (feature, layer) {
        const p = feature.properties;
        layer.bindPopup(`
          <strong>${p.name}</strong><br>
          Cluster: ${clusterLabels[p.cluster]}<br>
          Activity: ${Math.round(p.estimated_activity).toLocaleString()}<br>
          Emp/Pop Balance: ${p.emp_pop_balance.toFixed(2)}<br>
          Dist to BART: ${p.dist_to_bart_mi.toFixed(2)} mi
        `);
      }
    }).addTo(map2);
  });

const legend = L.control({ position: "topright" });

legend.onAdd = function () {
  const div = L.DomUtil.create("div");
  div.style.cssText = `
    background: white;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 13px;
    line-height: 1.8;
  `;

  div.innerHTML = "<b>Station Typology</b><br>";
  Object.entries(clusterLabels).forEach(([cluster, label]) => {
    div.innerHTML += `
      <span style="display:inline-block; width:12px; height:12px; 
        border-radius:50%; background:${clusterColors[cluster]}; 
        margin-right:6px;"></span>${label}<br>
    `;
  });

  return div;
};

legend.addTo(map2);
