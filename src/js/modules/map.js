// https://leafletjs.com/index.html

import 'leaflet/dist/leaflet.js';
// import 'leaflet/dist'
const map = document.querySelector('#map');
if(map) {
    
    const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib}),
        map = new L.Map('map', {center: new L.LatLng(51.505, -0.09), zoom: 13}),
        marker = L.marker([51.5, -0.09]).addTo(map),
        drawnItems = L.featureGroup().addTo(map);
        osm.addTo(map);
}