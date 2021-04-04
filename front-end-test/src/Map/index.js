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
        coordinates: [-77.032, 38.913],
      },
      properties: {
        title: "Mapbox",
        description: "Washington, D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776],
      },
      properties: {
        title: "Mapbox",
        description: "San Francisco, California",
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
      new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
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
