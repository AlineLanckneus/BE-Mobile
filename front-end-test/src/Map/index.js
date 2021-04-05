import mapboxgl from "mapbox-gl";
import React, {useEffect, useRef, useState} from "react";
import {StyledMapContainer, StyledSidebar} from "./styles";
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYWxpbmVsYW5ja25ldXMiLCJhIjoiY2tuMzhoemNkMDVxbDJwcWIxa2M4cnh5bCJ9.anBAvGXMPqYH_hG3kDEq4w";
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [3.72118848923, 51.0539830091],
      },
      properties: {
        title: "Fietsenstalling 1",
        description: "Gent",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [3.72377493158, 51.0540293329],
      },
      properties: {
        title: "Fietsenstalling 2",
        description: "Gent",
      },
    },
  ],
};

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(3.733333);
  const [lat, setLat] = useState(51.049999);
  const [zoom, setZoom] = useState(12);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    // add markers to map
    geojson.features.forEach(function (marker) {
      // create a HTML element for each feature
      var el = document.createElement("div");
      el.className = "marker";

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({offset: 25}) // add popups
            .setHTML(
              "<h3>" + marker.properties.title + "</h3><p>" + marker.properties.description + "</p>"
            )
        )
        .addTo(map);
    });
    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <StyledSidebar>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </StyledSidebar>
      <StyledMapContainer ref={mapContainerRef} />
    </div>
  );
};

export default Map;
