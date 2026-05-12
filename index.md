---
layout: page
permalink: /
---
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />

<div class="hero">
  <h1 class="hero-title">Last Mile for the Last Mile</h1>
  <p class="hero-subtitle">Effects of the Built Environment and Implications for Equity</p>
  <p class="hero-meta"><strong>Group 7</strong> · Urban Informatics Final Project</p>
</div>
<div id="map" style="height: 600px;"></div>
<label style="padding-top: 20px" for="yearSlider">Year</label>
<div class="slider-container">
  <input type="range" id="yearSlider" min="2020" max="2025" step="1" value="2025">
  <div class="slider-labels">
    <span>2020</span>
    <span>2021</span>
    <span>2022</span>
    <span>2023</span>
    <span>2024</span>
    <span>2025</span>
  </div>
</div>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
<h1> Greater Ridership Trends </h1>
<iframe src="/assets/charts/ridership-trends.html" width="100%" height="500px" frameborder="0"></iframe>
<div class="side-by-side">
  <img src="/assets/charts/E-Bike Shift.jpg" alt="E-Bike Shift">
  <div class="side-text">
    <p>Large rollout of E-bikes in 2024 and their impact on ridership</p>
  </div>
</div>
<div class="side-by-side reverse">
  <div class="side-text">
    <p>As we can see to the right, average trip time was reduced with the introduction of e-bikes</p>
  </div>
  <img src="/assets/charts/Median Trip Duration.jpg" alt="Median Trip Duration">
</div>
<h1> Station Typology: Observations Across Similar Stations </h1>
<div id="map2" style="height: 500px; margin-top: 20px;"></div>
<table style="border-collapse: collapse; width: 100%; font-size: 13px; table-layout: fixed; margin-top: 20px">
  <thead>
    <tr style="background: #f5f5f5;">
      <th style="padding: 10px; border: 1px solid #ddd; text-align: left; width: 8%;">Cluster</th>
      <th style="padding: 10px; border: 1px solid #ddd; text-align: left; width: 18%;">Type</th>
      <th style="padding: 10px; border: 1px solid #ddd; text-align: right; width: 8%;">Stations</th>
      <th style="padding: 10px; border: 1px solid #ddd; text-align: right; width: 12%;">Avg. Activity</th>
      <th style="padding: 10px; border: 1px solid #ddd; text-align: right; width: 14%;">Jobs/ Residents</th>
      <th style="padding: 10px; border: 1px solid #ddd; text-align: right; width: 12%;">Dist. to BART</th>
      <th style="padding: 10px; border: 1px solid #ddd; text-align: left; width: 28%;">Description</th>
    </tr>
  </thead>
  <tbody>
   <tr style="background: #fafafa;">
      <td style="padding: 10px; border: 1px solid #ddd;"><span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:#2ECC71; margin-right:6px;"></span>0</td>
      <td style="padding: 10px; border: 1px solid #ddd;">Transit-Oriented Commercial Core</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">13</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">67,428</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">4.21</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">0.16 mi</td>
      <td style="padding: 10px; border: 1px solid #ddd;">Highest activity and employment concentration, anchored near BART. Well-suited for commute and intermodal trips.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:#3498DB; margin-right:6px;"></span>1</td>
      <td style="padding: 10px; border: 1px solid #ddd;">High-Density Mixed Urban</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">32</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">32,649</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">1.38</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">0.39 mi</td>
      <td style="padding: 10px; border: 1px solid #ddd;">Dense, walkable neighborhoods blending residential and commercial uses with good transit proximity.</td>
    </tr>
    <tr style="background: #fafafa;">
      <td style="padding: 10px; border: 1px solid #ddd;"><span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:#F39C12; margin-right:6px;"></span>2</td>
      <td style="padding: 10px; border: 1px solid #ddd;">Residential – Transit Access</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">86</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">16,300</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">0.34</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">0.60 mi</td>
      <td style="padding: 10px; border: 1px solid #ddd;">The largest cluster. Predominantly residential neighborhoods within reasonable BART distance, likely generating first- and last-mile commute trips.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;"><span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:#E74C3C; margin-right:6px;"></span>3</td>
      <td style="padding: 10px; border: 1px solid #ddd;">Residential – Low Transit Access</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">23</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">13,546</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">1.47</td>
      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">1.24 mi</td>
      <td style="padding: 10px; border: 1px solid #ddd;">Lower-density residential areas furthest from BART, likely serving recreational and local trips.</td>
    </tr>
  </tbody>
</table>
<div style="margin-top: 20px; font-size: 13px; line-height: 1.8; color: #444;">
  <h4 style="margin-bottom: 8px;">Variable Definitions</h4>
  <p><strong>Activity</strong> — The total number of residents and jobs within a half-mile buffer of each station, drawn from the 2022 American Community Survey (ACS) and LEHD Origin-Destination Employment Statistics (LODES). This measure captures the overall intensity of land use surrounding a station and is a strong predictor of bikeshare demand (Faghih-Imani et al., 2014; Rixey, 2013).</p>
  <p><strong>Employment-Population Balance</strong> — The ratio of jobs to residents within the station area buffer. Values greater than 1 indicate employment-dominated contexts; values less than 1 indicate residential dominance. This measure distinguishes commercial and mixed-use station areas from purely residential ones (Gehrke & Welch, 2019).</p>
  <p><strong>Distance to Nearest Rail Station</strong> — The straight-line distance in miles from each bikeshare station to the nearest BART station. Proximity to rail has been consistently associated with higher bikeshare ridership, reflecting the role of bikeshare as a first- and last-mile solution to fixed-route transit (Shaheen et al., 2010; El-Assi et al., 2017).</p>
</div>
<div style="margin: 10px 0;">
  <label>X Axis: 
    <select id="xSelect">
      <option>Distance to BART (mi)</option>
      <option>Employment-Population Balance</option>
      <option>Activity</option>
    </select>
  </label>
  &nbsp;&nbsp;
  <label>Y Axis:
    <select id="ySelect">
      <option>Combined Ridership</option>
      <option>Origin Ridership</option>
      <option>Destination Ridership</option>
    </select>
  </label>
</div>
<div id="scatterplot" style="width: 100%; height: 400px;"></div>
<div id="barchart" style="width: 100%; height: 400px;"></div>
<div style="margin: 10px 0px 80px 0px;">
  <label for="barYearSlider">Year</label>
  <div class="slider-container">
    <input type="range" id="barYearSlider" min="2020" max="2025" step="1" value="2025" style="width: 100%;">
    <div class="slider-labels">
      <span>2020</span>
      <span>2021</span>
      <span>2022</span>
      <span>2023</span>
      <span>2024</span>
      <span>2025</span>
    </div>
  </div>
</div>

<img src="/assets/charts/BART Trips.jpg" width="100%" alt="BART Trips">
<h1>Neighborhood Resource Disparity Effects on Bikeshare Ridership</h1>
<iframe src="/assets/charts/tcac_lyft_map.html" width="100%" height="500px" frameborder="0"></iframe>
<iframe src="/assets/charts/ridership_vs_opportunity.html" width="100%" height="500px" frameborder="0"></iframe>
<iframe src="/assets/charts/ridership_by_year_category.html" width="100%" height="500px" frameborder="0"></iframe>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script src="{{ '/assets/js/script.js' | relative_url }}"></script>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

