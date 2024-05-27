// Initialisation
function initListeners(mymap) {
	console.log("TODO: add more event listeners...");

	document.getElementById("setZrrButton").addEventListener("click", () => {
		setZrr(mymap.getBounds());
	});

	document.getElementById("sendZrrButton").addEventListener("click", () => {
		sendZrr();
	});

	document.getElementById("setTtlButton").addEventListener("click", () => {
		setTtl();
	});
}

// MàJ des inputs du formulaire
function updateLatValue(lat) {
	document.getElementById("lat").value = lat;
}

function updateLonValue(lng) {
	document.getElementById("lon").value = lng;
}

function updateZoomValue(zoom) {
	document.getElementById("zoom").value = zoom;
}

function setZrr(bounds) {
	//console.log("TODO: update input values...");
	// récupérer les 2 points de la ZRR a partir de la map
	//1er point
	let lat1 = bounds._southWest.lat;
	let lon1 = bounds._southWest.lng;
	//2eme point
	let lat2 = bounds._northEast.lat;
	let lon2 = bounds._northEast.lng;

	//mettre les valeurs des points dans les inputs
	document.getElementById("lat1").value = lat1;
	document.getElementById("lon1").value = lon1;
	document.getElementById("lat2").value = lat2;
	document.getElementById("lon2").value = lon2;
}

// Requêtes asynchrones
function sendZrr() {
	//envoyer les valeurs des inputs
	let corps = {
		point1: {
			x: parseFloat(document.getElementById("lat1").value),
			y: parseFloat(document.getElementById("lon1").value)
		},
		point2: {
			x: parseFloat(document.getElementById("lat2").value),
			y: parseFloat(document.getElementById("lon2").value)
		}
	}
	console.log(corps);
	console.log('Token:', localStorage.getItem('token'));
	fetch('http://localhost:3376/admin/zrr', {
		method: 'POST',
		body : JSON.stringify(corps),
		headers: {
			// autorisation
			'Authorization' : 'Bearer ' + localStorage.getItem('token')
		},
		
	})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

function setTtl() {
	console.log("TODO: send fetch request...");
}

export { updateLatValue, updateLonValue, updateZoomValue };
export default initListeners;