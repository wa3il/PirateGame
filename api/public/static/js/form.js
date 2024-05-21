// form.js
function initListeners(mymap) {
	document.getElementById("setZrrButton").addEventListener("click", () => {
		setZrr(mymap);
	});

	document.getElementById("sendZrrButton").addEventListener("click", () => {
		sendZrr()
			.then(success => {
				if (success) {
					console.log('ZRR coordinates sent successfully.');
				} else {
					console.error('Error sending ZRR coordinates.');
				}
			});
	});

	document.getElementById("setTtlButton").addEventListener("click", () => {
		setTtl()
			.then(success => {
				if (success) {
					console.log('TTL set successfully.');
				} else {
					console.error('Error setting TTL.');
				}
			});
	});

	// Mettre à jour la carte quand la valeur de lat change
	document.getElementById("lat").addEventListener("change", () => {
		const lat = parseFloat(document.getElementById("lat").value);
		const lng = parseFloat(document.getElementById("lon").value);
		const zoom = parseInt(document.getElementById("zoom").value);
		mymap.setView([lat, lng], zoom);
	});

	// Mettre à jour la carte quand la valeur de lon change
	document.getElementById("lon").addEventListener("change", () => {
		const lat = parseFloat(document.getElementById("lat").value);
		const lng = parseFloat(document.getElementById("lon").value);
		const zoom = parseInt(document.getElementById("zoom").value);
		mymap.setView([lat, lng], zoom);
	});

	// Mettre à jour la carte quand la valeur de zoom change
	document.getElementById("zoom").addEventListener("change", () => {
		const lat = parseFloat(document.getElementById("lat").value);
		const lng = parseFloat(document.getElementById("lon").value);
		const zoom = parseInt(document.getElementById("zoom").value);
		mymap.setView([lat, lng], zoom);
	});
}

function updateLatValue(lat) {
	document.getElementById("lat").value = lat;
}

function updateLonValue(lng) {
	document.getElementById("lon").value = lng;
}

function updateZoomValue(zoom) {
	document.getElementById("zoom").value = zoom;
}

function setZrr(mymap) {
	const bounds = mymap.getBounds();
	const lat1 = bounds.getSouthWest().lat;
	const lon1 = bounds.getSouthWest().lng;
	const lat2 = bounds.getNorthEast().lat;
	const lon2 = bounds.getNorthEast().lng;

	document.getElementById("lat1").value = lat1.toFixed(6);
	document.getElementById("lon1").value = lon1.toFixed(6);
	document.getElementById("lat2").value = lat2.toFixed(6);
	document.getElementById("lon2").value = lon2.toFixed(6);
}

// Requêtes asynchrones
async function sendZrr() {
	const lat1 = parseFloat(document.getElementById("lat1").value);
	const lon1 = parseFloat(document.getElementById("lon1").value);
	const lat2 = parseFloat(document.getElementById("lat2").value);
	const lon2 = parseFloat(document.getElementById("lon2").value);

	const data = {
		lat1: lat1,
		lon1: lon1,
		lat2: lat2,
		lon2: lon2
	};

	try {
		const response = await fetch('http://localhost:3376/api/zrr', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (response.ok) {
			console.log('ZRR coordinates sent successfully.');
			// Clear the form fields after successful submission
			document.getElementById("lat1").value = '';
			document.getElementById("lon1").value = '';
			document.getElementById("lat2").value = '';
			document.getElementById("lon2").value = '';
			return true; // Indicate success
		} else {
			console.error('Error sending ZRR coordinates:', response.statusText);
			return false; // Indicate failure
		}
	} catch (error) {
		console.error('Error sending ZRR coordinates:', error);
		return false; // Indicate failure
	}
}

async function setTtl() {
	const ttl = parseInt(document.getElementById("ttl").value);

	const data = {
		ttl: ttl
	};

	try {
		const response = await fetch('http://localhost:3376/api/resources/ttl', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (response.ok) {
			console.log('TTL set successfully.');
			document.getElementById("ttl").value = '';
			return true; // Indicate success
		} else {
			console.error('Error setting TTL:', response.statusText);
			return false; // Indicate failure
		}
	} catch (error) {
		console.error('Error setting TTL:', error);
		return false; // Indicate failure
	}
}

export { initListeners, updateLatValue, updateLonValue, updateZoomValue };