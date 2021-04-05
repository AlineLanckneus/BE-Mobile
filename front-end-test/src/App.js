import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import React, {useEffect, useState} from "react";
import "./App.css";
import Map from "./Map/index";

const App = () => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://data.stad.gent/api/records/1.0/search/?dataset=real-time-bezettingen-fietsenstallingen-gent&q=&facet=facilityname"
      )
      .then((response) => setRecords(response.data.records))
      .catch((error) => console.log(error.message));
  }, [records.length]);
  return (
    <div>
      <div>
        {records.map((r) => (
          <div>{r.geometry.coordinates}</div>
        ))}
      </div>
      <Map />
    </div>
  );
};

export default App;
