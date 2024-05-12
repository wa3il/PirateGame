// map.js

import { updateLatValue, updateLonValue, updateZoomValue } from './form.js';

// initialisation de la map
const lat = 45.782, lng = 4.8656, zoom = 19;

let mymap = L.map('map', {
    center: [lat, lng],
    zoom: zoom
});

// Initialisation de la map
function initMap() {
	// Création d'un "tile layer" (permet l'affichage sur la carte)
	L.tileLayer('https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1IjoieGFkZXMxMDExNCIsImEiOiJjbGZoZTFvbTYwM29sM3ByMGo3Z3Mya3dhIn0.df9VnZ0zo7sdcqGNbfrAzQ', {
		maxZoom: 21,
		minZoom: 1,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibTFpZjEzIiwiYSI6ImNqczBubmhyajFnMnY0YWx4c2FwMmRtbm4ifQ.O6W7HeTW3UvOVgjCiPrdsA'
	}).addTo(mymap);

	// Ajout d'un marker
	L.marker([45.78207, 4.86559]).addTo(mymap).bindPopup('Entrée du bâtiment<br>Nautibus.').openPopup();

	// Clic sur la carte
	mymap.on('click', e => {
		updatePosition(e.latlng.lat, e.latlng.lng, mymap.getZoom());
	});

	return mymap;
}

// Mettre à jour la carte avec de nouvelles coordonnées
function updatePosition(lat, lng, zoom) {
	mymap.setView([lat, lng], zoom);
	updateLatValue(lat.toFixed(6)); // Met à jour la latitude dans le formulaire
	updateLonValue(lng.toFixed(6)); // Met à jour la longitude dans le formulaire
	updateZoomValue(zoom); // Met à jour le zoom dans le formulaire
}


export { updatePosition };
export default initMap;