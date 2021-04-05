import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import React, {useEffect, useState} from "react";
import Map from "./Map/index";
const API_URL =
  "https://data.stad.gent/api/records/1.0/search/?dataset=real-time-bezettingen-fietsenstallingen-gent&q=&facet=facilityname";

const App = () => {
  const [records, setRecords] = useState([]);
  const getDataFromAPI = async () => {
    axios
      .get(API_URL)
      .then((response) => setRecords(response.data.records))
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    getDataFromAPI();
    const interval = setInterval(() => {
      getDataFromAPI();
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  return <div>{records && records.length > 0 && <Map records={records} />}</div>;
};

export default App;
