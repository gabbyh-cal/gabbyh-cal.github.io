import geopandas as gpd

def main():
    # Load US places dataset (Census TIGER places)
    url = "https://www2.census.gov/geo/tiger/TIGER2023/PLACE/tl_2023_06_place.zip"
    gdf = gpd.read_file(url)

    # Filter for California
    ca = gdf[gdf["STATEFP"] == "06"]

    # Filter for Oakland + Berkeley
    cities = ca[ca["NAME"].isin(["Oakland", "Berkeley"])]

    # Project to web-friendly CRS (important for web maps)
    cities = cities.to_crs(epsg=4326)

    # Create interactive map
    m = cities.explore(
        column="NAME",
        cmap="Set1",
        legend=True,
        tooltip="NAME",
        style_kwds={
            "fillOpacity": 0.4,
            "weight": 2,
        }
    )

    # Save map to repo root
    m.save("map.html")

if __name__ == "__main__":
    main()

