---
layout: page
title: Home
permalink: /
---

<label for="yearSlider">Year: <span id="yearLabel">2024</span></label>
<input
  type="range"
  id="yearSlider"
  min="2019"
  max="2024"
  step="1"
  value="2024"
>

<div id="map" style="height: 600px;"></div>

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script src="{{ '/assets/js/script.js' | relative_url }}"></script>
