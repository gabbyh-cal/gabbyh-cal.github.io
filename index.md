---
layout: page
title: Home
permalink: /
---

<div id="map" style="height: 600px;"></div>

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script>
  window.STATIONS_URL = "{{ '/assets/data/stations.geojson' | relative_url }}";
</script>
<script src="{{ '/assets/js/script.js' | relative_url }}"></script>
