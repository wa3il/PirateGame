// Initialisation
function initListeners(mymap) {
	console.log("TODO: add more event listeners...");
	console.log(mymap);

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

	//set les ZRR de la map
	console.log(bounds);
}

// Requêtes asynchrones
function sendZrr() {
	//get les valeurs des inputs
	//1er point 
	let x1 = document.getElementById("lat1").value;
	let y1 = document.getElementById("lon1").value;
	//2eme point
	let x2 = document.getElementById("lat2").value;
	let y2 = document.getElementById("lon2").value;

	//envoyer les valeurs des inputs
	let corps = {
		point1: {
			x: x1,
			y: y1
		},
		point2: {
			x: x2,
			y: y2
		}
	}
	console.log(corps);
	console.log('Token:', localStorage.getItem('token'));
	fetch('http://localhost:3376/admin/zrr', {
		method: 'POST',
		body : JSON.stringify(corps),
		headers: {
			// autorisation
			'Authorization' : 'Bearer ' + localStorage.getItem('token'),
			'Content-Type': 'application/json'
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
	//get les valeurs des inputs
	let ttl = document.getElementById("ttl").value;
	console.log(ttl);
	//envoyer les valeurs des inputs
	let corps = {
		ttl: ttl
	}
	console.log(corps);
	console.log('Token:', localStorage.getItem('token'));
	fetch('http://localhost:3376/admin/resources/ttl', {
		method: 'POST',
		body : JSON.stringify(corps),
		headers: {
			// autorisation
			'Authorization' : 'Bearer ' + localStorage.getItem('token'),
			'Content-Type': 'application/json'
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

export { updateLatValue, updateLonValue, updateZoomValue };
export default initListeners;