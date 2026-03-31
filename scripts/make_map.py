import geopandas as gpd

def main():
    # Load US places dataset (Census TIGER places)
    url = "https://www2.census.gov/geo/tiger/TIGER2023/PLACE/tl_2023_06_place.zip"
    gdf = gpd.read_file(url)

    cities = gdf[gdf["NAME"].isin(["Oakland", "Berkeley"])]
    cities = cities.to_crs(epsg=4326)
    m = cities.explore(
        column="NAME",
        cmap="Set1",
        legend=True,
        tooltip="NAME",
        tiles="CartoDB positron",
        style_kwds={
        	"fillOpacity": 0.2,   # lighter fill
        	"weight": 1.5,        # thinner borders
        	"color": "#333333"    # softer outline
        }
    )

    m.save("map.html")

if __name__ == "__main__":
    main()

