import mapboxgl from "mapbox-gl";
import {arrayOf, number, shape, string} from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import "./Map.css";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYWxpbmVsYW5ja25ldXMiLCJhIjoiY2tuMzhoemNkMDVxbDJwcWIxa2M4cnh5bCJ9.anBAvGXMPqYH_hG3kDEq4w";
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const Map = ({records}) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(3.733333);
  const [lat, setLat] = useState(51.049999);
  const [zoom, setZoom] = useState(12.6);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    records.forEach(function (marker) {
      var el = document.createElement("div");
      el.className = "marker";

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({offset: 25}).setHTML(
            `
              <h3>Bicycle parking: ${marker.fields.facilityname}</h3>
              <p>Total places: ${marker.fields.totalplaces}</p>
              <p>Free places: ${marker.fields.freeplaces}</p>
              <p>Occupied places: ${marker.fields.occupiedplaces}</p>
            `
          )
        )
        .addTo(map);
    });

    return () => map.remove();
  }, [lat, lng, records, zoom]);

  return (
    <div>
      <div className='sidebar'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};
Map.propTypes = {
  records: arrayOf(
    shape({
      datasetid: string,
      recordid: string,
      fields: shape({
        occupiedplaces: number,
        id: string,
        facilityname: string,
        time: string,
        freeplaces: number,
        locatie: arrayOf(number),
        totalplaces: number,
      }),
      geometry: shape({
        type: string,
        coordinates: arrayOf(number),
      }),
      record_timestamp: string,
    })
  ),
};
export default Map;
