import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import ReactMapboxGl, {Feature, Layer} from "react-mapbox-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import "./App.css";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxpbmVsYW5ja25ldXMiLCJhIjoiY2tuMzhoemNkMDVxbDJwcWIxa2M4cnh5bCJ9.anBAvGXMPqYH_hG3kDEq4w";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYWxpbmVsYW5ja25ldXMiLCJhIjoiY2tuMzhoemNkMDVxbDJwcWIxa2M4cnh5bCJ9.anBAvGXMPqYH_hG3kDEq4w",
});
const RenderMap = () => {
  return (
    <Map
      style='mapbox://styles/mapbox/streets-v9'
      containerStyle={{
        height: "100vh",
        width: "100vw",
      }}>
      <Layer type='symbol' id='marker' layout={{"icon-image": "marker-15"}}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
    </Map>
  );
};
function App() {
  return (
    <div>
      <RenderMap />
    </div>
  );
}

export default App;
