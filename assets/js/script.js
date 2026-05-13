console.log("script loaded");

// MAP OF STATION RIDERSHIP VOLUME WITH BIKE NETWORK ------------------------------
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

// Add bike network
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

// MAP OF STATIONS BY TYPOLOGY -------------------------------------
const map2 = L.map('map2').setView([37.83, -122.26], 12);
const clusterColors = {
  0: "#2ECC71",
  1: "#3498DB",
  2: "#F39C12",
  3: "#E74C3C",
};

const clusterLabels = {
  0: "Transit-Oriented Commercial Core",
  1: "High Access Mixed Urban",
  2: "Residential - Transit Access",
  3: "Residential - Low Transit Access",
};

// For better table and legend ordering
const clusterRemap = {
  1: 0,  // old cluster 1 (Transit Core) -> display as 0
  2: 1,  // old cluster 2 (Mixed Urban) -> display as 1
  3: 2,  // old cluster 3 (Residential Transit) -> display as 2
  0: 3,  // old cluster 0 (Low Access) -> display as 3
};

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap & CARTO",
  subdomains: "abcd",
  maxZoom: 20
}).addTo(map2);

fetch("assets/data/stations25_clustered.geojson")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        const cluster = clusterRemap[feature.properties.cluster];
        const p = feature.properties;

        // large transparent circle for hit detection
        const hitArea = L.circleMarker(latlng, {
          radius: 12,
          fillOpacity: 0,
          stroke: false,
          interactive: true,
        }).bindTooltip(`
          <strong>${p.name}</strong><br>
          Cluster: ${clusterLabels[cluster]}<br>
          Activity: ${Math.round(p.estimated_activity).toLocaleString()}<br>
          Emp/Pop Balance: ${p.emp_pop_balance.toFixed(2)}<br>
          Dist to BART: ${p.dist_to_bart_mi.toFixed(2)} mi
        `,).addTo(map2);

        // small visible circle
        return L.circleMarker(latlng, {
          radius: 4,
          fillColor: clusterColors[cluster],
          color: clusterColors[cluster],
          fillOpacity: 0.8,
          stroke: false,
          interactive: false,  // clicks fall through to hitArea
        });
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

// INTERACTIVE SCATTER PLOT AND BAR CHART OF STATION CLUSTERS--------------------------------
fetch("assets/data/stations25_clustered.geojson")
  .then(res => res.json())
  .then(data => {
    const features = data.features.map(f => f.properties);
    
    // SCATTER PLOT
    const xVars = {
      "Distance to BART (mi)": "dist_to_bart_mi",
      "Employment-Population Balance": "emp_pop_balance",
      "Activity": "estimated_activity",
    };

    const yVars = {
      "Combined Ridership": "combined_count",
      "Origin Ridership": "start_count",
      "Destination Ridership": "end_count",
    };

    function getTrace(xKey, yKey) {
      return [{
        x: features.map(f => f[xKey]),
        y: features.map(f => f[yKey]),
        mode: "markers",
        type: "scatter",
        text: features.map(f => f.name),
        marker: {
          color: features.map(f => clusterColors[clusterRemap[f.cluster]]),
          size: 7,
          opacity: 0.8,
        },
        hovertemplate: "<b>%{text}</b><br>x: %{x}<br>y: %{y}<extra></extra>",
      }];
    }

    const layout = {
      xaxis: { title: Object.keys(xVars)[0] },
      yaxis: { title: Object.keys(yVars)[0] },
      margin: { t: 20 },
      paper_bgcolor: "white",
      plot_bgcolor: "#f9f9f9",
    };

    Plotly.newPlot("scatterplot", getTrace("dist_to_bart_mi", "combined_count"), layout);
    
    document.getElementById("xSelect").addEventListener("change", function () {
      const xKey = xVars[this.value];
      const yKey = yVars[document.getElementById("ySelect").value];
      Plotly.react("scatterplot", getTrace(xKey, yKey), {
        ...layout,
        xaxis: { title: this.value },
        yaxis: { title: document.getElementById("ySelect").value },
      });
    });

    document.getElementById("ySelect").addEventListener("change", function () {
      const yKey = yVars[this.value];
      const xKey = xVars[document.getElementById("xSelect").value];
      Plotly.react("scatterplot", getTrace(xKey, yKey), {
        ...layout,
        xaxis: { title: document.getElementById("xSelect").value },
        yaxis: { title: this.value },
      });
    });
 });

// BAR CHART---------------------------------------------------
const barYearSlider = document.getElementById("barYearSlider");
const barYearLabel = document.getElementById("barYearLabel");

function renderBarChart(year) {
  const suffix = String(year).slice(-2);
  fetch(`assets/data/stations${suffix}_clustered.geojson`)
    .then(res => res.json())
    .then(data => {
      const features = data.features.map(f => f.properties);
      const sortedFeatures = [...features].sort((a, b) => clusterRemap[a.cluster] - clusterRemap[b.cluster]);

      const barTrace = [{
        x: sortedFeatures.map(f => f.id),
        y: sortedFeatures.map(f => f.combined_count),
        type: "bar",
        marker: {
          color: sortedFeatures.map(f => clusterColors[clusterRemap[f.cluster]]),
        },
        hovertemplate: "<b>%{x}</b><br>Combined Ridership: %{y}<extra></extra>",
      }];

      const barLayout = {
        xaxis: { title: "Station ID", tickangle: -45 },
        yaxis: { title: "Combined Ridership", range: [0, 23000] },
        margin: { t: 20, b: 100 },
        paper_bgcolor: "white",
        plot_bgcolor: "#f9f9f9",
      };

      Plotly.react("barchart", barTrace, barLayout);
      barYearLabel.textContent = year;
    });
}

renderBarChart(barYearSlider.value);

barYearSlider.addEventListener("input", function () {
  renderBarChart(this.value);
});

