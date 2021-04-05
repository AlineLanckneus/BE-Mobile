# Real time bike parking occupation in Ghent
> A simple web application that displays the real time occupation of 2 bike parkings in Ghent.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This web application was built as an exercise. It uses Mapbox GL JS to visualise the map and an API endpoint provided by the city of Ghent. It displays markers for each bike parking and clicking on the marker reveals their real time occupation. This data is refreshed every 60 seconds.

There are react wrappers available for mapbox gl such as react-mapbox-gl and react-map-gl but for simplicity's sake I decided to not use these and just use mapbox gl as described on their website. I might however remake the application using these wrappers as an exercise in the future.

## Technologies
* React.js - version 17.0.2
* Mapbox GL JS - version 2.2.0
* Axios - version 0.21.1

## Setup
To run this project, install it locally using npm:
cd front-end-test/
npm install
npm start
